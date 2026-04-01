import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}
