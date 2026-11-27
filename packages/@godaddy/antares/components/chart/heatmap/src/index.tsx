import { type ReactNode, useMemo } from 'react';
import { useLocale } from 'react-aria-components';
import { cx } from 'cva';
import { Flex } from '#components/layout/flex';
import { useScrollableXYChart } from '#components/chart/_internal/use-scrollable-xy-chart';
import type { ColorBucket, HeatmapCell } from '../../types.ts';
import { HeatmapContext, type HeatmapContextValue } from './context.ts';
import { HeatmapLegend } from './heatmap-legend.tsx';
import { HeatmapPlot } from './heatmap-plot.tsx';
import { HeatmapTooltip, type HeatmapTooltipRenderProps } from './heatmap-tooltip.tsx';
import { useHeatmap, defaultXAccessor, defaultYAccessor, defaultValueAccessor } from './use-heatmap.ts';
import styles from './index.module.css';

export type { ColorBucket, HeatmapTooltipRenderProps };
export { HeatmapPlot, type HeatmapPlotProps } from './heatmap-plot.tsx';
export { HeatmapLegend, type HeatmapLegendProps } from './heatmap-legend.tsx';
export { HeatmapTooltip, type HeatmapTooltipProps } from './heatmap-tooltip.tsx';

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
  /**
   * Show the discrete swatch legend below the chart. Only applies to the default composition: when you
   * pass `children`, place a `HeatmapLegend` yourself.
   * @default true
   */
  colorLegend?: boolean;
  /** Label shown before the legend swatches (e.g. "Visitors"). Omitted when not provided. */
  colorLegendLabel?: string;
  /** Label for null/closed cells in the legend. @default "No data" */
  closedLabel?: string;

  /**
   * Minimum column width in px (the cell plus its `cellPadding` gap) before the chart scrolls
   * horizontally. A cell is never narrower than 40px, the minimum tap target, so values below
   * `40 + cellPadding` are raised to it.
   * @default 44
   */
  minCellSize?: number;
  /**
   * Minimum row height in px (the cell, not counting the `cellPadding` gap). With no height, the chart
   * is as tall as its rows (rows × (minCellHeight + cellPadding), plus the axis and legend). When the
   * chart is given a height the rows stretch to fill it, and when the rows cannot fit at this height
   * the chart scrolls vertically instead of shrinking them further. Rows are never shorter than the
   * y-axis labels need, so very small values are raised to fit. A cell is never shorter than 40px, the
   * minimum tap target, so smaller values are raised to 40.
   * @default 40
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

  /** Show tooltip on hover/tap. Turns off every `HeatmapTooltip`, including ones you place yourself. @default true */
  tooltip?: boolean;
  /** Format the value shown in the built-in tooltip, e.g. to append a unit. */
  tooltipValueFormatter?: (d: T) => string;
  /**
   * Custom tooltip content. Rendered inside the shared chart tooltip container, so it gets the
   * same elevation, rounding and padding as the built-in tooltip. Read extra fields (for example a
   * previous-period value) from `datum`. Only applies to the default composition: when you pass
   * `children`, give `HeatmapTooltip` a render function instead.
   */
  renderTooltip?: (props: HeatmapTooltipRenderProps<T>) => ReactNode;

  /** Outer container width in px (omit = 100%). */
  width?: number;
  /**
   * Total chart height in px, including the axis and legend. Omit to size the chart from its rows
   * (see `minCellHeight`); a parent with its own height is filled instead.
   */
  height?: number;

  /**
   * Content of the chart. Omit it for the default composition, `HeatmapPlot` followed by `HeatmapLegend`
   * (when `colorLegend` is on) and `HeatmapTooltip`. Pass children to arrange those parts yourself, for
   * example a title above the plot and the legend in a footer. Children replace the default entirely, so
   * include `HeatmapPlot`, and `HeatmapTooltip` if you want tooltips.
   */
  children?: ReactNode;

  /** Accessible label for the SVG element. */
  'aria-label'?: string;
  /** Id of the element that labels the SVG, such as a visible heading. */
  'aria-labelledby'?: string;
  /** Screen-reader description rendered inside the SVG <desc> element. */
  desc?: string;

  /** Additional CSS class name applied to the root element. */
  className?: string;
}

/** Smallest cell width and height in px: the minimum tap target size. */
const MIN_CELL_TAP_SIZE = 40;

/** Maps the `align` prop to the flex alignment of the chart's content. */
const ALIGN_TO_JUSTIFY = { start: 'flex-start', center: 'center', end: 'flex-end' } as const;

/**
 * Heatmap chart for two-dimensional categorical data.
 *
 * Displays a grid of colored cells where each cell's fill is determined by a discrete set of
 * threshold color buckets. Cells with no value render as dashed-border empty rectangles. Hovering
 * or focusing a cell shows its tooltip and highlights the matching row and column axis labels.
 *
 * By default it renders the plot, the legend and the tooltip. Pass children to compose
 * `HeatmapPlot`, `HeatmapLegend` and `HeatmapTooltip` with your own content instead.
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
    minCellSize: requestedMinCellSize = 44,
    minCellHeight: requestedMinCellHeight = 40,
    maxCellHeight = Number.POSITIVE_INFINITY,
    align = 'start',
    cellPadding = 4,
    cellRounding = 6,
    tooltip = true,
    tooltipValueFormatter,
    renderTooltip,
    width,
    height,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    desc,
    className
  } = props;

  const { direction } = useLocale();
  const rtl = direction === 'rtl';

  // A cell is a tap target, so it is never smaller than 40px either way. The column size includes the gap
  // between cells, the row height does not.
  const minCellSize = Math.max(requestedMinCellSize, MIN_CELL_TAP_SIZE + cellPadding);
  const minCellHeight = Math.max(requestedMinCellHeight, MIN_CELL_TAP_SIZE);

  const layout = useScrollableXYChart();
  const { chartWidth, chartHeight, minHeight: minChartHeight, margin } = layout;

  const heatmap = useHeatmap({
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
    margin,
    rtl
  });

  const context: HeatmapContextValue<T> = {
    heatmap,
    layout,
    rtl,
    direction,
    valueAccessor,
    colorBuckets,
    colorLegendLabel,
    closedLabel,
    xLabels,
    yLabels,
    xTickFormat,
    yTickFormat,
    cellPadding,
    cellRounding,
    tooltip,
    tooltipValueFormatter,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    desc
  };

  const content = useMemo(
    function resolveContent() {
      if (children !== undefined) return children;
      return (
        <>
          <HeatmapPlot />
          {colorLegend && <HeatmapLegend />}
          <HeatmapTooltip<T>>{renderTooltip}</HeatmapTooltip>
        </>
      );
    },
    [children, colorLegend, renderTooltip]
  );

  return (
    <HeatmapContext.Provider value={context as unknown as HeatmapContextValue<object>}>
      <Flex
        direction="column"
        dir={direction}
        justifyContent={ALIGN_TO_JUSTIFY[align]}
        className={cx(styles.chart, className)}
        style={{
          ['--chart-width' as string]: width !== undefined ? `${width}px` : undefined,
          ['--chart-height' as string]: height !== undefined ? `${height}px` : undefined
        }}
      >
        {content}
      </Flex>
    </HeatmapContext.Provider>
  );
}
