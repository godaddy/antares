import { createContext, forwardRef, useContext } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Legend, type LegendProps } from '#components/chart/_internal/legend';
import { composeClassName } from '#utils/render-props.ts';
import { DonutChartSeriesContext } from './donut-chart-context.ts';
import styles from './index.module.css';

export interface DonutChartLegendProps extends Omit<LegendProps, 'as' | 'series'> {}

export const DonutChartLegendContext =
  /* @__PURE__ */ createContext<ContextValue<DonutChartLegendProps, HTMLDivElement>>(null);

/** Displays the current chart's slice names and colors. */
export const DonutChartLegend = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartLegendProps>(
  function DonutChartLegend(props, ref) {
    const [{ className, ...rest }, legendRef] = useContextProps(props, ref, DonutChartLegendContext);
    const series = useContext(DonutChartSeriesContext);
    return series ? (
      <Legend
        orientation="vertical"
        {...rest}
        series={series}
        ref={legendRef}
        className={composeClassName(className, styles.legend)}
      />
    ) : null;
  }
);
