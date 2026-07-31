import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `xZero` and `yZero` stretch the domain to include zero. Worth doing when the absolute size of the values matters, not just their movement.
 * @title Zero included
 * @order 14
 */
export function ZeroIncludedExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: appleStock.slice(0, 40).map((d, i) => ({ x: i, y: d.close }))
    }
  ];

  return (
    <LineChart
      series={series}
      xType="linear"
      xLabels={true}
      yLabels={true}
      xZero={true}
      yZero={true}
      height={500}
      aria-label="Zero included example chart"
      desc="Line chart demonstrating zero included in domain"
      {...props}
    />
  );
}
