import { Legend, type LegendProps } from '../src/index.tsx';

/**
 * Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name.
 * @order 2
 */
export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}
