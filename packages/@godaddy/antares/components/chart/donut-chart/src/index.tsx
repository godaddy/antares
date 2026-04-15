import type { Optional, SeriesConfig } from '../../types.ts';
import { chartSegmentGapPadAngle } from '../../utils.ts';
import { chartColorForIndex } from '#components/chart/use-chart-color';
import { useNormalizedSeries } from '#components/chart/use-normalized-series';
import { Legend } from '#components/chart/legend';
import { Flex, FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import {
  Tooltip as RACTooltip,
  TooltipTrigger as RACTooltipTrigger,
  OverlayArrow as RACOverlayArrow
} from 'react-aria-components';
import { Text } from '#components/text';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { useCallback, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import styles from './index.module.css';

/**
 * One slice of donut chart data after normalization (stable `id`, `name`, numeric `value`).
 * Callers may omit `id` on input; `useNormalizedSeries` assigns stable ids like line/bar series.
 */
export interface DonutSliceDatum extends Pick<SeriesConfig, 'id' | 'name'> {
  /** Numeric value; must be non-negative. Zero or negative slices are omitted from the ring. */
  value: number;
}

/** Slice shown in the hover tooltip (includes ring `index` for swatch color). */
interface TooltipSliceDatum extends DonutSliceDatum {
  index: number;
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
 * Radial thickness of the donut ring as a share of the container inline size — same as `6.9cqi` on `.chartWrap`
 * (`container-type: inline-size`; measured width matches `cqi` for the square chart).
 */
const DONUT_RING_THICKNESS_CQI_PERCENT = 6.9;

/**
 * Donut chart component props.
 */
export interface DonutChartProps extends FlexProps<'div'> {
  /** Slice definitions (`name`, `value`; `id` optional, auto-assigned like line/bar chart series). */
  data: Optional<DonutSliceDatum, 'id'>[];

  /** Primary label in the donut hole. */
  label: string;

  /** Secondary label below the primary label. */
  subLabel?: string;

  /** Where to render the legend relative to the chart. Leave unset for no legend. */
  legend?: 'bottom' | 'right';

  /** Passed to Legend as `label` when legend is shown. */
  legendLabel?: string;

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
 * Donut chart with optional legend, segment gaps, and hover tooltip (aligned with Line/Bar chart tooltips).
 *
 * @param props - {@link DonutChartProps}
 */
export function DonutChart(props: DonutChartProps) {
  const {
    data,
    label,
    subLabel,
    legend: legendPlacement,
    legendLabel,
    smallSliceThreshold = 0.05,
    formatValue: formatValueProp,
    'aria-label': ariaLabel,
    ...flexProps
  } = props;
  const normalizedData = useNormalizedSeries(data);

  const chartWrapRef = useRef<HTMLDivElement>(null);
  const tooltipAnchorRef = useRef<HTMLDivElement>(null);
  const [chartSizePx, setChartSizePx] = useState(0);
  const [tooltipSlices, setTooltipSlices] = useState<TooltipSliceDatum[]>([]);
  const [tooltipAnchorOffset, setTooltipAnchorOffset] = useState({ left: 0, top: 0 });

  /** Measure the chart wrapper so the square SVG uses the correct side length. */
  useLayoutEffect(function measureChartWrap() {
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
      return normalizedData.filter(function positive(d) {
        return d.value > 0;
      });
    },
    [normalizedData]
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
   * Slice data (with ring `index`) for the tooltip when hovering: one “small slice” group is a
   * maximal contiguous run of small slices on the ring (0 … n−1 wraps). Non-small hover → only that slice.
   */
  const getTooltipSlicesForRingIndex = useCallback(
    function getTooltipSlicesForRingIndex(ringIndex: number): TooltipSliceDatum[] {
      const n = pieData.length;

      // Hovered slice is not small — no grouping with neighbors.
      if (!isSmallSlice(pieData[ringIndex])) {
        return [{ ...pieData[ringIndex], index: ringIndex }];
      }

      // All slices are small — the whole ring is one group (no non-small slice to stop the walk).
      if (pieData.every(isSmallSlice)) {
        return pieData.map(function mapIndex(_, i) {
          return { ...pieData[i], index: i };
        });
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
      const slices: TooltipSliceDatum[] = [];
      for (let i = runStartIndex; ; i = (i + 1) % n) {
        slices.push({ ...pieData[i], index: i });
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
    <Flex
      alignItems={legendPlacement === 'right' ? 'center' : 'stretch'}
      direction={legendPlacement === 'right' ? 'row' : 'column'}
      gap={legendPlacement != null ? 'lg' : undefined}
      {...flexProps}
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
              <Pie<DonutSliceDatum>
                data={pieData}
                pieValue={getPieSliceValue}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                padAngle={padAngle}
              >
                {function renderArcs(pie) {
                  return (
                    <Group className={styles.arcs} left={center} top={center}>
                      {pie.arcs.map(function mapArc(arc, sliceIndex) {
                        const d = pie.path(arc);
                        if (!d) {
                          return null;
                        }
                        return (
                          <path
                            key={arc.data.id}
                            d={d}
                            fill={chartColorForIndex(sliceIndex)}
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
          <Flex className={styles.content} alignItems="center" justifyContent="center" direction="column">
            <Text className={styles.label}>{label}</Text>
            {subLabel && <Text className={styles.subLabel}>{subLabel}</Text>}
          </Flex>
        </Box>
        <Flex
          as={RACTooltip}
          triggerRef={tooltipAnchorRef}
          placement="top"
          offset={tooltipPlacementEpsilon}
          className={styles.tooltip}
          padding="md"
          rounding="md"
        >
          <Flex role="list" aria-label="Tooltip data" direction="column" gap="md">
            {tooltipSlices.map(function renderTooltipSlice(slice) {
              return (
                <Flex
                  key={slice.id}
                  role="listitem"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="xl"
                  className={styles.item}
                >
                  <Flex alignItems="center" gap="md" style={{ minWidth: 0 }}>
                    <Box
                      className={styles.swatch}
                      rounding="full"
                      style={{ backgroundColor: chartColorForIndex(slice.index) }}
                    />
                    <Text>{slice.name}</Text>
                  </Flex>
                  <Flex direction="row" alignItems="center" gap="md" justifyContent="end">
                    <Text align="end">{formatSlicePercent(slice.value, total)}</Text>
                    <Text align="end">{formatSliceValue(slice.value)}</Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <RACOverlayArrow aria-hidden="true" className={styles.arrow} />
        </Flex>
      </RACTooltipTrigger>
      {legendPlacement && (
        <Legend
          series={normalizedData}
          label={legendLabel}
          orientation="vertical"
          flexShrink={legendPlacement === 'right' ? 0 : undefined}
        />
      )}
    </Flex>
  );
}
