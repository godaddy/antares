import { Legend, type LegendProps } from '../src/index.tsx';

/**
 * Basic legend with a single series showing the default styling and layout.
 * @order 1
 */
export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}
