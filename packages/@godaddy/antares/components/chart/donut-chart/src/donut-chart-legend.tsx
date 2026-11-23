import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Legend, type LegendProps } from '#components/chart/_internal/legend';

export interface DonutChartLegendProps extends Omit<LegendProps, 'as' | 'series'> {}

interface DonutChartLegendContextProps extends DonutChartLegendProps {
  series?: LegendProps['series'];
}

export const DonutChartLegendContext =
  /* @__PURE__ */ createContext<ContextValue<DonutChartLegendContextProps, HTMLDivElement>>(null);

/** Displays the current chart's slice names and colors. */
export const DonutChartLegend = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartLegendProps>(
  function DonutChartLegend(props: DonutChartLegendContextProps, ref) {
    const [{ series, ...rest }, legendRef] = useContextProps(props, ref, DonutChartLegendContext);
    return series ? <Legend orientation="vertical" {...rest} series={series} ref={legendRef} /> : null;
  }
);
