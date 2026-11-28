import { ChartLegend, DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Online', value: 60 },
  { id: '2', name: 'In store', value: 40 }
];

/**
 * Place `ChartLegend` inside a `DonutChart`. It reads the chart's slices, so the names and colors always match.
 * @order 1
 */
export function DefaultExample({ data: slices = data }: Partial<Pick<DonutChartProps, 'data'>>) {
  return (
    <DonutChart data={slices} aria-label="Sales by channel">
      <ChartLegend label="Channel" />
    </DonutChart>
  );
}
