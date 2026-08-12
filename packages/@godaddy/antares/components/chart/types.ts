/**
 * Default data point shape for chart series.
 *
 * Represents a single (x, y) pair. Used as the default type parameter for
 * {@link SeriesConfig}. Supports numeric, string, or Date values; use null for
 * y when a point is missing (e.g. gaps in line charts).
 */
export interface DataPoint {
  /** X value (category, timestamp, or numeric). */
  x: number | string | Date;
  /** Y value, or null for missing data. */
  y: number | string | Date | null;
}

/**
 * Config for one data series.
 *
 * Used by chart components to define series (e.g. line, bar, legend).
 * Use a custom T when your data points have a different shape than {@link DataPoint}.
 *
 * @typeParam T - Item type for data points. Defaults to {@link DataPoint}.
 */
export interface SeriesConfig<T extends object = DataPoint> {
  /** Line style for this series. @default 'solid' */
  variant?: LineSeriesVariant;
  /** Unique id for the series (e.g. stable across re-renders for keys and refs). */
  id: string;
  /** Display name for the series (e.g. in legends, tooltips, axes). */
  name: string;
  /** *For internal use only* The color of the series to be displayed on the chart - can
   * be resolved/assigned through different mechanisms, but is not meant to be assigned
   * directly by the package consumer and should not be exposed at the top level*/
  _resolvedColor?: string;
  /** Data points for this series. */
  data: T[];
}

/**
 * Line style for a line-chart series.
 *
 * Maps to an SVG stroke dash pattern: 'solid' draws a continuous stroke,
 * 'dashed' a long-dash pattern, and 'dotted' a round-dot pattern.
 */
export type LineSeriesVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Config for one line-chart series.
 *
 * Extends {@link SeriesConfig} with an optional {@link LineSeriesVariant} so
 * individual lines can render solid, dashed, or dotted. Line-specific — bar and
 * donut charts continue to use {@link SeriesConfig}.
 *
 * @typeParam T - Item type for data points. Defaults to {@link DataPoint}.
 */
export interface LineSeriesConfig<T extends object = DataPoint> extends Omit<SeriesConfig<T>, '_resolvedColor'> {
  /**
   * Index into the chart's data-visualization palette (0-based; wraps modulo the
   * palette length). Assign the same index to multiple series to give them the
   * same color — e.g. a solid and a dashed line that belong together. Any series
   * may use any index independently; there is no grouping or ordering requirement.
   * When omitted, the series uses its position in `series` (the default behavior).
   */
  colorIndex?: number;
}

/**
 * Accessors for X and Y from a data point.
 *
 * Used by chart components when the data shape differs from {@link DataPoint};
 * provide xAccessor and yAccessor to map your type T to x/y values.
 *
 * @typeParam T - Item type for data points.
 */
export interface Accessors<T> {
  xAccessor: (datum: T) => number | string | Date;
  yAccessor: (datum: T) => number | string | Date | null;
}

/**
 * Accessors optional when T is DataPoint, required otherwise.
 * Used by chart components to type x/y accessor props.
 */
export type AccessorRequirement<T> = T extends DataPoint ? Partial<Accessors<T>> : Accessors<T>;

/** Makes keys K optional on type T. */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * X-axis label orientation: auto (rotate when narrow), always horizontal, or always vertical.
 * Used by chart container layout and line chart props.
 */
export type XLabelsOrientation = 'auto' | 'horizontal' | 'vertical';

/** Legend position for chart legend placement (top or bottom). */
export type LegendPosition = 'top' | 'bottom';
