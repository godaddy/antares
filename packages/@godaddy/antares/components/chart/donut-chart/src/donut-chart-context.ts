import { createContext, type Context } from 'react';

/** Layout class the chart gives its composed center. Not public. */
export const DonutChartCenterLayoutContext: Context<string | undefined> = createContext<string | undefined>(undefined);
