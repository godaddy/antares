import { type ReactNode, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from 'react-aria-components';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { Group } from '@visx/group';
import type { TooltipData } from '@visx/xychart';
import { cx } from 'cva';
import { Flex } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { Text } from '#components/text';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Tooltip, TooltipContainer } from '#components/chart/_internal/tooltip';
import { useScrollableXYChart } from '#components/chart/_internal/use-scrollable-xy-chart';
import type { ColorBucket, DataPoint, HeatmapCell, InternalSeriesConfig } from '../../types.ts';
import {
  useHeatmap,
  resolveColor,
  defaultXAccessor,
  defaultYAccessor,
  defaultValueAccessor,
  type HeatmapTooltipData
} from './use-heatmap.ts';
import styles from './index.module.css';

export type { ColorBucket };

/**
 * Data passed to a custom {@link HeatmapChartProps.renderTooltip} function.
 * @public
 */
export interface HeatmapTooltipRenderProps<T extends object = HeatmapCell> {
  /** The raw datum at this cell. Tooltips only open for cells that have a value. */
  datum: T | undefined;
  /** The color bucket the cell falls in. */
  bucket: ColorBucket | undefined;
  /** Cell value. */
  value: number | null;
  /** Column category from xAccessor. */
  x: string | Date;
  /** Row category from yAccessor. */
  y: string | Date;
}

/**
 * Props for HeatmapChart.
 * @template T - The data point type. Defaults to HeatmapCell.
 * @public
 */
export interface HeatmapChartProps<T extends object = HeatmapCell> {
  /** Flat array of cells to display. */
  data: T[];

  /** Extract the column category (x) from a datum. Required when T ≠ HeatmapCell. */
  xAccessor?: (d: T) => string | Date;
  /** Extract the row category (y) from a datum. Required when T ≠ HeatmapCell. */
  yAccessor?: (d: T) => string | Date;
  /** Extract the numeric value from a datum. null renders a closed cell. */
  valueAccessor?: (d: T) => number | null;

  /** Explicit ordered list of X categories (columns). Derived from data when omitted. */
  xDomain?: (string | Date)[];
  /** Explicit ordered list of Y categories (rows). Derived from data when omitted. */
  yDomain?: (string | Date)[];

  /** Format X-axis tick labels. */
  xTickFormat?: (v: string | Date) => string;
  /** Format Y-axis tick labels. */
  yTickFormat?: (v: string | Date) => string;
  /** Show X-axis tick labels. @default true */
  xLabels?: boolean;
  /** Show Y-axis tick labels. @default true */
  yLabels?: boolean;

  /**
   * Ordered array of discrete color buckets. Each cell's color is determined by the first bucket
   * where value < bucket.max. The last bucket is used when its max is null, or when the value is
   * above every max. `min` is informational and not used for matching.
   */
  colorBuckets: ColorBucket[];
  /** Show the discrete swatch legend below the chart. @default true */
  colorLegend?: boolean;
  /** Label shown before the legend swatches (e.g. "Visitors"). Omitted when not provided. */
  colorLegendLabel?: string;
  /** Label for null/closed cells in the legend. @default "No data" */
  closedLabel?: string;

  /** Minimum column width in px (the cell plus its `cellPadding` gap) before the chart scrolls horizontally. @default 44 */
  minCellSize?: number;
  /**
   * Minimum row height in px (the cell, not counting the `cellPadding` gap). With no height, the chart
   * is as tall as its rows (rows × (minCellHeight + cellPadding), plus the axis and legend). When the
   * chart is given a height the rows stretch to fill it, and when the rows cannot fit at this height
   * the chart scrolls vertically instead of shrinking them further. Rows are never shorter than the
   * y-axis labels need, so very small values are raised to fit.
   * @default 32
   */
  minCellHeight?: number;
  /**
   * Maximum row height in px (the cell, not counting the `cellPadding` gap). Stops the rows stretching
   * when the chart has more height than it needs, for example one row in a tall chart. The chart then
   * ends after the last row and the axis and legend follow it. Omit to let rows fill the height.
   */
  maxCellHeight?: number;
  /**
   * Where the chart sits when its box is taller than the grid, axis and legend need (for example with
   * `maxCellHeight`, or a single row in a tall chart). `start` keeps it at the top, `end` moves it to
   * the bottom, and `center` splits the leftover space. Has no effect when the rows fill the height.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /** Gap between cells in px. @default 4 */
  cellPadding?: number;
  /** Border radius on each cell. @default 6 */
  cellRounding?: number;

  /** Show tooltip on hover/tap. @default true */
  tooltip?: boolean;
  /** Format the value shown in the built-in tooltip, e.g. to append a unit. */
  tooltipValueFormatter?: (d: T) => string;
  /**
   * Custom tooltip content. Rendered inside the shared chart tooltip container, so it gets the
   * same elevation, rounding and padding as the built-in tooltip. Read extra fields (for example a
   * previous-period value) from `datum`.
   */
  renderTooltip?: (props: HeatmapTooltipRenderProps<T>) => ReactNode;

  /** Outer container width in px (omit = 100%). */
  width?: number;
  /**
   * Total chart height in px, including the axis and legend. Omit to size the chart from its rows
   * (see `minCellHeight`); a parent with its own height is filled instead.
   */
  height?: number;

  /** Accessible label for the SVG element. */
  'aria-label'?: string;
  /** Screen-reader description rendered inside the SVG <desc> element. */
  desc?: string;

  /** Additional CSS class name applied to the root element. */
  className?: string;
}

/** Space between an axis label and its cells in px, the same 8px tick length the bar and line charts use. */
const LABEL_GAP = 8;

/** Maps the `align` prop to the flex alignment of the chart's content. */
const ALIGN_TO_JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end' } as const;

// ─── Legend sub-component ────────────────────────────────────────────────────

interface HeatmapLegendProps {
  buckets: ColorBucket[];
  label?: string;
  closedLabel: string;
}

function HeatmapLegend({ buckets, label, closedLabel }: HeatmapLegendProps) {
  return (
    <Flex
      role="list"
      aria-label={label ?? 'Heatmap legend'}
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      wrap="wrap"
      gap="lg"
      className={styles.legend}
    >
      {label && <Text className={cx(styles.legendLabel, textTreatmentClassName('inherit'))}>{label}</Text>}
      {buckets.map(function renderBucket(b) {
        return (
          <Flex key={b.label} role="listitem" alignItems="center" gap="sm">
            <Box
              rounding="lg"
              className={styles.legendSwatch}
              style={{ backgroundColor: b.color }}
              aria-hidden="true"
            />
            <Text className={textTreatmentClassName('inherit')}>{b.label}</Text>
          </Flex>
        );
      })}
      {/* One list item so the divider can never wrap onto a line by itself. */}
      <Flex role="listitem" alignItems="center" gap="lg">
        <Box className={styles.legendDivider} aria-hidden="true" />
        <Flex alignItems="center" gap="sm">
          <Box rounding="lg" className={cx(styles.legendSwatch, styles.legendSwatchClosed)} aria-hidden="true" />
          <Text className={textTreatmentClassName('inherit')}>{closedLabel}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

// ─── Built-in tooltip ─────────────────────────────────────────────────────────

/** Id of the single synthetic series the shared Tooltip renders for the hovered cell. */
const HOVERED_CELL_SERIES_ID = 'heatmap-cell';

function HeatmapTooltip<T extends object>({
  data,
  tooltipValueFormatter,
  valueAccessor
}: {
  data: HeatmapTooltipData<T>;
  tooltipValueFormatter?: (d: T) => string;
  valueAccessor: (d: T) => number | null;
}) {
  const { datum, x, y, bucket } = data;
  if (!datum) return null;

  // The shared Tooltip renders one row per series. A heatmap has no series, so the hovered cell is
  // presented as a single one: its swatch is the bucket color and its name is the "row · column" label.
  const series = [
    {
      id: HOVERED_CELL_SERIES_ID,
      name: `${String(y)} · ${String(x)}`,
      data: [datum],
      _resolvedColor: bucket?.color
    }
  ];

  return (
    <Tooltip
      // Same structural narrowing the bar chart uses: the payload is a subset of visx's TooltipData.
      tooltipData={{ datumByKey: { [HOVERED_CELL_SERIES_ID]: { datum } } } as unknown as TooltipData<DataPoint>}
      showArrow={true}
      formatValue={
        (tooltipValueFormatter ??
          function format(d: T) {
            return String(valueAccessor(d) ?? '');
          }) as (datum: DataPoint) => string
      }
      series={series as unknown as InternalSeriesConfig[]}
    />
  );
}

// ─── Axis tick label props ────────────────────────────────────────────────────

/** Font, size and color come from the stylesheet; only anchoring and the hover emphasis are set here. */
function getTickLabelProps(isHovered: boolean, textAnchor: 'start' | 'middle' | 'end') {
  return {
    textAnchor,
    dy: '0.35em',
    className: isHovered ? styles.tickLabelHovered : undefined
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Heatmap chart for two-dimensional categorical data.
 *
 * Displays a grid of colored cells where each cell's fill is determined by a discrete set of
 * threshold color buckets. Cells with no value render as dashed-border empty rectangles. Hovering
 * or focusing a cell shows its tooltip and highlights the matching row and column axis labels.
 * Titles and descriptions are intentionally not part of the chart; render them alongside it.
 *
 * @template T - The data point type. Defaults to HeatmapCell.
 * @param props - {@link HeatmapChartProps}
 */
export function HeatmapChart<T extends object = HeatmapCell>(props: HeatmapChartProps<T>) {
  const {
    data,
    xAccessor = defaultXAccessor as unknown as (d: T) => string | Date,
    yAccessor = defaultYAccessor as unknown as (d: T) => string | Date,
    valueAccessor = defaultValueAccessor as unknown as (d: T) => number | null,
    xDomain,
    yDomain,
    xTickFormat,
    yTickFormat,
    xLabels = true,
    yLabels = true,
    colorBuckets,
    colorLegend = true,
    colorLegendLabel,
    closedLabel = 'No data',
    minCellSize = 44,
    minCellHeight = 32,
    maxCellHeight = Number.POSITIVE_INFINITY,
    align = 'start',
    cellPadding = 4,
    cellRounding = 6,
    tooltip = true,
    tooltipValueFormatter,
    renderTooltip: renderTooltipContent,
    width,
    height,
    'aria-label': ariaLabel,
    desc,
    className
  } = props;

  const { direction } = useLocale();
  const rtl = direction === 'rtl';
  const descId = useId();

  const {
    parentRef,
    chartWidth,
    chartHeight,
    minHeight: minChartHeight,
    margin,
    scrollLeft,
    scrollTop,
    xAxisRef,
    yAxisRef
  } = useScrollableXYChart();

  const {
    svgRef,
    xValues,
    yValues,
    xByKey,
    yByKey,
    datumIndex,
    xScale,
    yScale,
    svgWidth,
    svgHeight,
    naturalHeight,
    maxHeight,
    effectiveInnerWidth,
    effectiveInnerHeight,
    hoveredX,
    hoveredY,
    handleCellEnter,
    handleCellLeave,
    tooltip: { tooltipData, tooltipLeft, tooltipTop, tooltipOpen }
  } = useHeatmap({
    data,
    xAccessor,
    yAccessor,
    valueAccessor,
    xDomain,
    yDomain,
    colorBuckets,
    minCellSize,
    minCellHeight,
    maxCellHeight,
    cellPadding,
    minChartHeight,
    chartWidth,
    chartHeight,
    margin
  });

  // Tooltip node
  let tooltipNode: ReactNode = null;
  if (tooltip && tooltipOpen && tooltipData) {
    let content: ReactNode;
    if (renderTooltipContent) {
      content = renderTooltipContent({
        datum: tooltipData.datum,
        bucket: tooltipData.bucket,
        value: tooltipData.value,
        x: tooltipData.x,
        y: tooltipData.y
      });
    } else {
      content = (
        <HeatmapTooltip
          data={tooltipData}
          tooltipValueFormatter={tooltipValueFormatter}
          valueAccessor={valueAccessor}
        />
      );
    }
    if (content !== null && content !== undefined && typeof content !== 'boolean') {
      // The built-in tooltip is already a container (with arrow); custom content gets a plain one.
      tooltipNode = renderTooltipContent ? <TooltipContainer>{content}</TooltipContainer> : content;
    }
  }

  // The height of the scrolling area as it is actually shown. The shared hook's `chartHeight` is raised to
  // a minimum that can exceed this, which would put the sticky x-axis below the visible area, so the axis
  // is anchored to the measured height instead. Before the first measurement the SVG height is used.
  const [visibleHeight, setVisibleHeight] = useState(0);
  useEffect(
    function observeVisibleHeight() {
      const el = parentRef.current;
      if (!el) return;
      const update = () => setVisibleHeight(el.clientHeight);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(el);
      return function stopObserving() {
        observer.disconnect();
      };
    },
    [parentRef]
  );
  const viewHeight = visibleHeight > 0 ? Math.min(visibleHeight, svgHeight) : svgHeight;

  // Band scales key on strings, so recover the original category (e.g. a Date) before formatting.
  function formatXTick(v: unknown) {
    const original = xByKey.get(String(v)) ?? String(v);
    return xTickFormat ? xTickFormat(original) : String(original);
  }
  function formatYTick(v: unknown) {
    const original = yByKey.get(String(v)) ?? String(v);
    return yTickFormat ? yTickFormat(original) : String(original);
  }

  // Tick marks are hidden through CSS (transparent stroke via `tickClassName`), not `hideTicks`: with
  // zero-length ticks visx would otherwise paint a dot beside each label in its default stroke.
  // `hideTicks` is deliberately not used because it removes the tick elements the scrollable chart
  // hook measures to size the margins, which clips the x-axis labels.
  // The tick length is the space between the labels and the cells: visx moves each label out by it and
  // the hook sizes the margins from the axis box, which includes the tick. The cells are already inset
  // by half of `cellPadding`, so that inset is taken off the 8px gap, which keeps the distance between a
  // label and its cells at 8px whatever `cellPadding` is.
  const tickLength = Math.max(LABEL_GAP - cellPadding / 2, 0);
  const tickProps = { tickLength, hideAxisLine: true, tickClassName: styles.tickMark } as const;

  return (
    <Flex
      direction="column"
      dir={direction}
      className={cx(styles.chart, className)}
      style={{
        ['--chart-width' as string]: width !== undefined ? `${width}px` : undefined,
        ['--chart-height' as string]: height !== undefined ? `${height}px` : undefined
      }}
    >
      <Flex direction="column" flex={1} justifyContent={ALIGN_TO_JUSTIFY[align]} className={styles.wrapper}>
        <Box
          ref={parentRef}
          dir={direction}
          className={styles.area}
          style={{
            ['--heatmap-natural-height' as string]: `${naturalHeight}px`,
            ['--heatmap-max-height' as string]: Number.isFinite(maxHeight) ? `${maxHeight}px` : 'none'
          }}
        >
          {chartWidth > 0 && yValues.length > 0 && (
            <svg
              ref={svgRef}
              width={svgWidth}
              height={svgHeight}
              aria-label={ariaLabel}
              role="img"
              {...(desc ? { 'aria-describedby': descId } : {})}
            >
              {desc && <desc id={descId}>{desc}</desc>}

              <Group top={margin.top} left={margin.left}>
                {/* Cells */}
                {xValues.map(function renderColumn(xVal, xi) {
                  return yValues.map(function renderCell(yVal, yi) {
                    const xKey = String(xVal);
                    const yKey = String(yVal);
                    const datum = datumIndex.get(xKey)?.get(yKey);
                    const value = datum ? valueAccessor(datum) : null;
                    const color = resolveColor(value, colorBuckets);
                    const closed = color === null;

                    // Band scales are unpadded; the gap between cells is `cellPadding` px, split across both sides.
                    const cellX = (xScale(xKey) ?? 0) + cellPadding / 2;
                    const cellY = (yScale(yKey) ?? 0) + cellPadding / 2;
                    const cellW = Math.max(xScale.bandwidth() - cellPadding, 0);
                    const cellH = Math.max(yScale.bandwidth() - cellPadding, 0);

                    const highlighted = !closed && (String(hoveredX) === xKey || String(hoveredY) === yKey);

                    function showCell() {
                      const svgEl = svgRef.current;
                      if (!svgEl) return;
                      const rect = svgEl.getBoundingClientRect();
                      handleCellEnter(
                        datum,
                        xVal,
                        yVal,
                        rect.left + margin.left + cellX + cellW / 2,
                        rect.top + margin.top + cellY
                      );
                    }

                    return (
                      <rect
                        // Index-based: category labels can contain '-' (e.g. "2024-01"), which would collide.
                        key={`cell-${xi}-${yi}`}
                        x={cellX}
                        y={cellY}
                        width={cellW}
                        height={cellH}
                        rx={cellRounding}
                        fill={closed ? 'none' : (color ?? 'none')}
                        className={cx(styles.cell, closed && styles.cellClosed, highlighted && styles.cellHighlighted)}
                        tabIndex={closed ? -1 : 0}
                        role={closed ? 'presentation' : 'img'}
                        aria-label={
                          !closed
                            ? `${String(yVal)}, ${String(xVal)}: ${value !== null ? String(value) : ''}`
                            : undefined
                        }
                        onPointerEnter={!closed ? showCell : undefined}
                        onPointerLeave={!closed ? handleCellLeave : undefined}
                        onFocus={!closed ? showCell : undefined}
                        onBlur={!closed ? handleCellLeave : undefined}
                      />
                    );
                  });
                })}

                {/* X-axis (bottom) */}
                {xLabels && (
                  <AxisBottom
                    {...tickProps}
                    axisClassName={styles.axisX}
                    innerRef={xAxisRef}
                    top={effectiveInnerHeight}
                    scale={xScale}
                    tickFormat={formatXTick}
                    tickLabelProps={function getXTickProps(v) {
                      return getTickLabelProps(String(v) === String(hoveredX), 'middle');
                    }}
                  />
                )}

                {/* Y-axis */}
                {yLabels && !rtl && (
                  <AxisLeft
                    {...tickProps}
                    axisClassName={styles.axisY}
                    innerRef={yAxisRef}
                    scale={yScale}
                    tickFormat={formatYTick}
                    tickLabelProps={function getYTickProps(v) {
                      return getTickLabelProps(String(v) === String(hoveredY), 'end');
                    }}
                  />
                )}

                {yLabels && rtl && (
                  <AxisRight
                    {...tickProps}
                    axisClassName={styles.axisY}
                    innerRef={yAxisRef}
                    left={effectiveInnerWidth}
                    scale={yScale}
                    tickFormat={formatYTick}
                    tickLabelProps={function getYTickPropsRtl(v) {
                      return getTickLabelProps(String(v) === String(hoveredY), 'start');
                    }}
                  />
                )}
              </Group>

              {/* Sticky Y-axis background (LTR) */}
              {yLabels && !rtl && (
                <>
                  <rect x={scrollLeft} y={0} width={margin.left} height={svgHeight} className={styles.axisBackground} />
                  <g transform={`translate(${margin.left + scrollLeft}, ${margin.top})`}>
                    <AxisLeft
                      {...tickProps}
                      axisClassName={styles.axisY}
                      scale={yScale}
                      tickFormat={formatYTick}
                      tickLabelProps={function getYStickyProps(v) {
                        return getTickLabelProps(String(v) === String(hoveredY), 'end');
                      }}
                    />
                  </g>
                </>
              )}

              {/* Sticky Y-axis background (RTL) */}
              {yLabels && rtl && (
                <>
                  <rect
                    x={svgWidth - margin.right + scrollLeft}
                    y={0}
                    width={margin.right}
                    height={svgHeight}
                    className={styles.axisBackground}
                  />
                  <g transform={`translate(${svgWidth - margin.right + scrollLeft}, ${margin.top})`}>
                    <AxisRight
                      {...tickProps}
                      axisClassName={styles.axisY}
                      scale={yScale}
                      tickFormat={formatYTick}
                      tickLabelProps={function getYStickyRtlProps(v) {
                        return getTickLabelProps(String(v) === String(hoveredY), 'start');
                      }}
                    />
                  </g>
                </>
              )}

              {/* Sticky X-axis background */}
              {xLabels && (
                <>
                  <rect
                    x={0}
                    y={scrollTop + viewHeight - margin.bottom}
                    width={svgWidth}
                    height={margin.bottom}
                    className={styles.axisBackground}
                  />
                  <g transform={`translate(${margin.left}, ${scrollTop + viewHeight - margin.bottom})`}>
                    <AxisBottom
                      {...tickProps}
                      axisClassName={styles.axisX}
                      scale={xScale}
                      tickFormat={formatXTick}
                      tickLabelProps={function getXStickyProps(v) {
                        return getTickLabelProps(String(v) === String(hoveredX), 'middle');
                      }}
                    />
                  </g>
                </>
              )}
            </svg>
          )}
        </Box>

        {colorLegend && <HeatmapLegend buckets={colorBuckets} label={colorLegendLabel} closedLabel={closedLabel} />}
      </Flex>

      {tooltipNode != null &&
        typeof tooltipTop === 'number' &&
        typeof tooltipLeft === 'number' &&
        createPortal(
          <div className={styles.tooltipContainer} style={{ top: tooltipTop, left: tooltipLeft }}>
            {tooltipNode}
          </div>,
          document.body
        )}
    </Flex>
  );
}
