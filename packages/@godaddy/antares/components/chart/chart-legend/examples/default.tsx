import { ChartLegend, DonutChart } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Online', value: 60 },
  { id: '2', name: 'In store', value: 40 }
];

/**
 * Place `ChartLegend` inside a chart. It reads the chart's series, so the names and colors always match.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DonutChart data={data} aria-label="Sales by channel">
      <ChartLegend label="Channel" />
    </DonutChart>
  );
}
