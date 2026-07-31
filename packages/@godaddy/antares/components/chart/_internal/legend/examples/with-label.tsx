import { Legend, type LegendProps } from '../src/index.tsx';

/**
 * Legend with a visible label that is also used as the accessible label.
 * @title With label
 * @order 3
 */
export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}
