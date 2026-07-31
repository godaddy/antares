import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * Pass `width` and `height` to size the chart explicitly instead of letting it fill its container.
 * @title Fixed size
 * @order 20
 */
export function FixedSizeExample(props: Partial<LineChartProps>) {
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
      width={800}
      height={400}
      aria-label="Fixed size example chart"
      desc="Line chart demonstrating fixed width/height"
      {...props}
    />
  );
}
