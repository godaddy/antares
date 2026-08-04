import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `xBaseline` and `yBaseline` control the main axis lines themselves. Dropping them gives a lighter, more editorial chart.
 * @order 7
 */
export function BaselinesExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      xLabels={false}
      yLabels={false}
      xBaseline={true}
      yBaseline={true}
      height={400}
      aria-label="Baselines example chart"
      desc="Line chart demonstrating axis baselines only"
      {...props}
    />
  );
}
