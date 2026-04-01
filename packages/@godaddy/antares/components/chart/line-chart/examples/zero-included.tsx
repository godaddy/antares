import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

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
      height={400}
      aria-label="Zero included example chart"
      desc="Line chart demonstrating zero included in domain"
      {...props}
    />
  );
}
