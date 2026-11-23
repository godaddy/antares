import { createContext, useContext, type Context } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Legend, type LegendProps } from '#components/chart/_internal/legend';
import { composeClassName } from '#utils/render-props.ts';

export interface ChartLegendProps extends Omit<LegendProps, 'as' | 'series' | 'rootRef'> {}

/** Series and layout defaults a chart provides to its composed legend. Not public. */
export interface InternalChartLegendValue extends Pick<LegendProps, 'series' | 'className' | 'orientation'> {}

export const InternalChartLegendContext: Context<InternalChartLegendValue | null> =
  createContext<InternalChartLegendValue | null>(null);

export const ChartLegendContext = createContext<ContextValue<ChartLegendProps, HTMLDivElement>>(null);

/** Displays the current chart's series names and colors. */
export function ChartLegend(props: ChartLegendProps) {
  const [{ className, ...rest }, legendRef] = useContextProps(props, null, ChartLegendContext);
  const chart = useContext(InternalChartLegendContext);
  if (!chart) {
    return null;
  }
  const { series, className: chartClassName, ...chartDefaults } = chart;
  return (
    <Legend
      {...chartDefaults}
      {...rest}
      series={series}
      rootRef={legendRef}
      className={composeClassName(className, chartClassName)}
    />
  );
}
