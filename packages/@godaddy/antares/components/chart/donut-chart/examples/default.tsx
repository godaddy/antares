import { DonutChart, DonutChartCenter, type DonutChartProps, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

/**
 * Give the chart a `data` array with a `name` and `value` for each slice and an optional `id`. Use `DonutChartCenter` to place a headline number or title in the ring.
 * @order 1
 */
export function DefaultExample({
  children = (
    <DonutChartCenter>
      <Text slot="value">100%</Text>
    </DonutChartCenter>
  ),
  ...props
}: Partial<DonutChartProps>) {
  return (
    <DonutChart data={data} aria-label="Donut chart with five categories" {...props}>
      {children}
    </DonutChart>
  );
}
