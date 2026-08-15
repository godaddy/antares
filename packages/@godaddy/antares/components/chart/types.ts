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
  /** Unique id for the series (e.g. stable across re-renders for keys and refs). */
  id: string;
  /** Display name for the series (e.g. in legends, tooltips, axes). */
  name: string;
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
 */
export interface LineSeriesConfig<
  T extends object = DataPoint,
  U extends Record<string, unknown> = Record<string, unknown>
> extends SeriesConfig<T> {
  // colorIndex instead of color so consumer still has to use
  // antares theme colors
  colorIndex?: number;
  variant?: LineSeriesVariant;
  tooltipMetadata?: U;
}

export interface InternalSeriesConfig<
  T extends object = DataPoint,
  U extends Record<string, unknown> | undefined = Record<string, unknown>
> extends SeriesConfig<T> {
  _resolvedColor?: string;
  variant?: LineSeriesVariant;
  colorIndex?: number;
  tooltipMetadata?: U;
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
