import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode
} from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { TooltipTrigger as RACTooltipTrigger } from 'react-aria-components';
import { chartColorForIndex } from '#components/chart/_internal/use-chart-color';
import { useNormalizedSeries } from '#components/chart/_internal/use-normalized-series';
import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import { Grid, type GridProps } from '#components/layout/grid';
import { Text } from '#components/text';
import { Tooltip } from '#components/tooltip';
import { composeClassName } from '#utils/render-props.ts';
import type { Optional, SeriesConfig } from '../../types.ts';
import { chartSegmentGapPadAngle } from '../../utils.ts';
import { DonutChartSeriesContext } from './donut-chart-context.ts';
import styles from './index.module.css';
import { textTreatmentClassName } from '#components/_internal/typography';

/**
 * One slice of donut chart data after normalization (stable `id`, `name`, numeric `value`).
 * Callers may omit `id` on input; `useNormalizedSeries` assigns stable ids like line/bar series.
 */
interface DonutSliceDatum extends Pick<SeriesConfig, 'id' | 'name'> {
  /** Numeric value; must be non-negative. Zero or negative slices are omitted from the ring. */
  value: number;
}

interface ColoredSlice extends DonutSliceDatum {
  _resolvedColor: string;
}

/** Tiny factor so react-aria tooltip placement stays stable when anchor coords are integer pixels. */
const TOOLTIP_PLACEMENT_STABILITY_EPSILON = 1e-6;

/** Reused for every tooltip slice row; avoids allocating Intl.NumberFormat per cell per render. */
const slicePercentFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  maximumFractionDigits: 1,
  minimumFractionDigits: 0
});

/** Formats `value / total` as a localized percent string for tooltip slice rows. */
function formatSlicePercent(value: number, total: number): string {
  return slicePercentFormatter.format(value / total);
}

/**
 * Radial thickness of the donut ring as a percentage of the measured width.
 */
const DONUT_RING_THICKNESS_CQI_PERCENT = 6.9;

/**
 * Donut chart component props.
 */
export interface DonutChartProps extends Omit<GridProps<'div'>, 'as' | 'areas' | 'columns' | 'rows'> {
  /** Slice definitions (`name`, `value`; `id` optional, auto-assigned like line/bar chart series). */
  data: Optional<DonutSliceDatum, 'id'>[];

  /** Optional center and legend regions, in either order. */
  children?: ReactNode;

  /** Places a composed legend below the chart or at its inline end. @default 'bottom' */
  legendPlacement?: 'bottom' | 'end';

  /** Accessible name for the ring. */
  'aria-label'?: string;

  /**
   * Share of total at or below which a slice is “small”; hovering a small slice shows that contiguous group of
   * small neighbors on the ring (nearest run, wrapping at the first/last slice).
   * @default 0.05
   */
  smallSliceThreshold?: number;

  /** Formats slice values in the tooltip. @default String(value) */
  formatValue?: (value: number) => string;
}

/**
 * Shows parts of a whole as a ring. Compose the center and legend as needed.
 *
 * @param props - {@link DonutChartProps}
 */
export const DonutChart = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartProps>(function DonutChart(props, ref) {
  const {
    data,
    children,
    legendPlacement = 'bottom',
    smallSliceThreshold = 0.05,
    formatValue: formatValueProp,
    'aria-label': ariaLabel,
    className,
    ...gridProps
  } = props;
  const normalizedData = useNormalizedSeries(data);
  const coloredData = useMemo(
    function assignSliceColors(): ColoredSlice[] {
      return normalizedData.map(function assignColor(slice, index) {
        return { ...slice, _resolvedColor: chartColorForIndex(index) };
      });
    },
    [normalizedData]
  );

  const chartWrapRef = useRef<HTMLDivElement>(null);
  const tooltipAnchorRef = useRef<HTMLDivElement>(null);
  const [chartSizePx, setChartSizePx] = useState(0);
  const [tooltipSlices, setTooltipSlices] = useState<ColoredSlice[]>([]);
  const [tooltipAnchorOffset, setTooltipAnchorOffset] = useState({ left: 0, top: 0 });

  /** Measure the chart wrapper so the square SVG uses the correct side length. */
  useEffect(function measureChartWrap() {
    const node = chartWrapRef.current;
    if (!node) {
      return undefined;
    }
    function syncChartSquareSize() {
      const el = chartWrapRef.current;

      setChartSizePx(Math.max(el?.offsetWidth ?? 0, 1));
    }
    syncChartSquareSize();
    const observer = new ResizeObserver(syncChartSquareSize);
    observer.observe(node);
    return function disconnectChartWrapResize() {
      observer.disconnect();
    };
  }, []);

  /** Filter out slices with zero or negative values. */
  const pieData = useMemo(
    function filterPositive() {
      return coloredData.filter(function positive(d) {
        return d.value > 0;
      });
    },
    [coloredData]
  );

  /** Sum the values of the slices. */
  const total = useMemo(
    function sumValues() {
      return pieData.reduce(function add(sum, d) {
        return sum + d.value;
      }, 0);
    },
    [pieData]
  );

  /** Determine if a slice is small. Small slices are at or below the `smallSliceThreshold` share of total. */
  const isSmallSlice = useCallback(
    function checkIsSmallSlice(d: DonutSliceDatum): boolean {
      return d.value / total <= smallSliceThreshold;
    },
    [total, smallSliceThreshold]
  );

  /**
   * Slice data for the tooltip when hovering: one “small slice” group is a
   * maximal contiguous run of small slices on the ring (0 … n−1 wraps). Non-small hover → only that slice.
   */
  const getTooltipSlicesForRingIndex = useCallback(
    function getTooltipSlicesForRingIndex(ringIndex: number): ColoredSlice[] {
      const n = pieData.length;

      // Hovered slice is not small — no grouping with neighbors.
      if (!isSmallSlice(pieData[ringIndex])) {
        return [pieData[ringIndex]];
      }

      // All slices are small — the whole ring is one group (no non-small slice to stop the walk).
      if (pieData.every(isSmallSlice)) {
        return pieData;
      }

      // Extend counterclockwise (previous index on the ring) until we hit a non-small slice.
      let runStartIndex = ringIndex;
      for (let step = 0; step < n; step++) {
        const prev = (runStartIndex - 1 + n) % n;
        if (!isSmallSlice(pieData[prev])) {
          break;
        }
        runStartIndex = prev;
      }

      // Extend clockwise until we hit a non-small slice.
      let runEndIndex = ringIndex;
      for (let step = 0; step < n; step++) {
        const next = (runEndIndex + 1) % n;
        if (!isSmallSlice(pieData[next])) {
          break;
        }
        runEndIndex = next;
      }

      // Walk along the ring from run start to run end, wrapping at n − 1 → 0 if the run crosses the seam.
      const slices: ColoredSlice[] = [];
      for (let i = runStartIndex; ; i = (i + 1) % n) {
        slices.push(pieData[i]);
        if (i === runEndIndex) {
          break;
        }
      }
      return slices;
    },
    [pieData, isSmallSlice]
  );

  const formatSliceValue = useCallback(
    function formatSliceValue(v: number): string {
      return formatValueProp != null ? formatValueProp(v) : String(v);
    },
    [formatValueProp]
  );

  const clearTooltipSlices = useCallback(function clearTooltipSlices() {
    setTooltipSlices([]);
  }, []);

  const updateTooltipSlicesForHoveredDatum = useCallback(
    function updateTooltipSlicesForHoveredDatum(hovered: DonutSliceDatum) {
      const ringIndex = pieData.findIndex(function findHovered(d) {
        return d.id === hovered.id;
      });
      setTooltipSlices(getTooltipSlicesForRingIndex(ringIndex));
    },
    [getTooltipSlicesForRingIndex, pieData]
  );

  const updateTooltipAnchorFromPointer = useCallback(function updateTooltipAnchorFromPointer(event: PointerEvent) {
    const chartWrap = chartWrapRef.current;
    if (!chartWrap) {
      return;
    }
    const rect = chartWrap.getBoundingClientRect();
    setTooltipAnchorOffset({
      left: event.clientX - rect.left,
      top: event.clientY - rect.top
    });
  }, []);

  const handleSlicePointerEnter = useCallback(
    function handleSlicePointerEnter(e: PointerEvent, datum: DonutSliceDatum) {
      updateTooltipSlicesForHoveredDatum(datum);
      updateTooltipAnchorFromPointer(e);
    },
    [updateTooltipSlicesForHoveredDatum, updateTooltipAnchorFromPointer]
  );

  const getPieSliceValue = useCallback(function getPieSliceValue(d: DonutSliceDatum) {
    return d.value;
  }, []);

  const tooltipOpen = tooltipSlices.length > 0;
  const tooltipPlacementEpsilon = tooltipOpen
    ? (tooltipAnchorOffset.left + tooltipAnchorOffset.top) * TOOLTIP_PLACEMENT_STABILITY_EPSILON
    : 0;
  const center = chartSizePx / 2;
  const outerRadius = chartSizePx > 0 ? chartSizePx / 2 : 0;
  const ringThicknessPx = (chartSizePx * DONUT_RING_THICKNESS_CQI_PERCENT) / 100;
  const innerRadius = Math.max(0, outerRadius - ringThicknessPx);
  const padAngle = chartSegmentGapPadAngle(outerRadius);

  return (
    <Grid
      gap="lg"
      {...gridProps}
      ref={ref}
      className={composeClassName(className, styles.root, legendPlacement === 'end' && styles.legendAtEnd)}
    >
      <RACTooltipTrigger isOpen={tooltipOpen}>
        <Box ref={chartWrapRef} className={styles.chartWrap}>
          <Box
            ref={tooltipAnchorRef}
            aria-hidden
            className={styles.anchor}
            style={{
              left: tooltipAnchorOffset.left,
              top: tooltipAnchorOffset.top
            }}
          />
          {chartSizePx > 0 && pieData.length > 0 && (
            <svg
              width={chartSizePx}
              height={chartSizePx}
              className={styles.chart}
              role="img"
              onPointerLeave={clearTooltipSlices}
              aria-label={ariaLabel}
            >
              <Pie<ColoredSlice>
                data={pieData}
                pieValue={getPieSliceValue}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                padAngle={padAngle}
              >
                {function renderArcs(pie) {
                  return (
                    <Group left={center} top={center}>
                      {pie.arcs.map(function mapArc(arc) {
                        const d = pie.path(arc);
                        if (!d) {
                          return null;
                        }
                        return (
                          <path
                            key={arc.data.id}
                            d={d}
                            fill={arc.data._resolvedColor}
                            vectorEffect="non-scaling-stroke"
                            onPointerEnter={function handleSlicePointerEnterOnArc(e) {
                              handleSlicePointerEnter(e, arc.data);
                            }}
                            onPointerMove={updateTooltipAnchorFromPointer}
                            onPointerLeave={clearTooltipSlices}
                          />
                        );
                      })}
                    </Group>
                  );
                }}
              </Pie>
            </svg>
          )}
        </Box>
        <Tooltip triggerRef={tooltipAnchorRef} offset={tooltipPlacementEpsilon} className={styles.tooltip}>
          <Flex role="list" aria-label="Tooltip data" direction="column" gap="md">
            {tooltipSlices.map(function renderTooltipSlice(slice) {
              return (
                <Flex
                  key={slice.id}
                  role="listitem"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="md"
                  className={styles.item}
                >
                  <Flex alignItems="center" gap="md">
                    <Box className={styles.swatch} rounding="full" style={{ backgroundColor: slice._resolvedColor }} />
                    <Text className={textTreatmentClassName('inherit')}>{slice.name}</Text>
                  </Flex>
                  <Flex direction="row" alignItems="center" gap="md" justifyContent="end">
                    <Text className={textTreatmentClassName('inherit')} align="end">
                      {formatSlicePercent(slice.value, total)}
                    </Text>
                    <Text className={textTreatmentClassName('inherit')} align="end">
                      {formatSliceValue(slice.value)}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Tooltip>
      </RACTooltipTrigger>
      <DonutChartSeriesContext.Provider value={coloredData}>{children}</DonutChartSeriesContext.Provider>
    </Grid>
  );
});
