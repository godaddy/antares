import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}
