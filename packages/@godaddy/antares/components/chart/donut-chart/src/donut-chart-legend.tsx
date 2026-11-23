import { createContext, forwardRef, useContext } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Legend, type LegendProps } from '#components/chart/_internal/legend';

export interface DonutChartLegendProps extends Omit<LegendProps, 'as' | 'series'> {}

export const DonutChartLegendContext =
  /* @__PURE__ */ createContext<ContextValue<DonutChartLegendProps, HTMLDivElement>>(null);

export const DonutChartLegendSeriesContext = /* @__PURE__ */ createContext<LegendProps['series'] | null>(null);

/** Displays the current chart's slice names and colors. */
export const DonutChartLegend = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartLegendProps>(
  function DonutChartLegend(props, ref) {
    const [rest, legendRef] = useContextProps(props, ref, DonutChartLegendContext);
    const series = useContext(DonutChartLegendSeriesContext);
    return series ? <Legend orientation="vertical" {...rest} series={series} ref={legendRef} /> : null;
  }
);
