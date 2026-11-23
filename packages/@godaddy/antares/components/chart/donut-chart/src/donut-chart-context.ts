import { createContext, type Context } from 'react';
import type { LegendProps } from '#components/chart/_internal/legend';

export const DonutChartSeriesContext: Context<LegendProps['series'] | null> = /* @__PURE__ */ createContext<
  LegendProps['series'] | null
>(null);
