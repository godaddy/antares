import { DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

/**
 * You give the chart a `data` array (`id`, `name`, `value`) and a `label` in the middle - this is the everyday setup when you want several categories on one ring and a headline number or title in the hole.
 * @order 1
 */
export function DefaultExample(props: Partial<DonutChartProps>) {
  return <DonutChart data={data} label="100%" aria-label="Donut chart with five categories" {...props} />;
}
