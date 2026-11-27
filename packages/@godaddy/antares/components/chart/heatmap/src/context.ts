import { createContext, useContext } from 'react';
import type { useScrollableXYChart } from '#components/chart/_internal/use-scrollable-xy-chart';
import type { ColorBucket, HeatmapCell } from '../../types.ts';
import type { useHeatmap } from './use-heatmap.ts';

/**
 * Everything the heatmap parts (`HeatmapPlot`, `HeatmapLegend`, `HeatmapTooltip`) share: the resolved
 * data index and scales, the color mapping, the hover state and the display options.
 * @internal
 */
export interface HeatmapContextValue<T extends object = HeatmapCell> {
  /** Scales, data index, hover and tooltip state. */
  heatmap: ReturnType<typeof useHeatmap<T>>;
  /** Scrollable chart layout: measured size, margins and scroll offsets. */
  layout: ReturnType<typeof useScrollableXYChart>;
  /** True when the locale reads right to left. */
  rtl: boolean;
  /** Text direction of the locale. */
  direction: 'ltr' | 'rtl';
  valueAccessor: (d: T) => number | null;
  colorBuckets: ColorBucket[];
  /** Legend label from the chart's `colorLegendLabel` prop. */
  colorLegendLabel?: string;
  /** Closed-cell label from the chart's `closedLabel` prop. */
  closedLabel: string;
  xLabels: boolean;
  yLabels: boolean;
  xTickFormat?: (v: string | Date) => string;
  yTickFormat?: (v: string | Date) => string;
  cellPadding: number;
  cellRounding: number;
  /** Whether tooltips are enabled at all. */
  tooltip: boolean;
  tooltipValueFormatter?: (d: T) => string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  desc?: string;
}

/** @internal */
export const HeatmapContext = createContext<HeatmapContextValue<object> | null>(null);

/**
 * Reads the shared heatmap state. Throws when used outside a `HeatmapChart`.
 * @internal
 */
export function useHeatmapContext<T extends object = HeatmapCell>(part: string): HeatmapContextValue<T> {
  const value = useContext(HeatmapContext);
  if (!value) {
    throw new Error(`${part} must be rendered inside a HeatmapChart.`);
  }
  return value as unknown as HeatmapContextValue<T>;
}
