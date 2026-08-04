import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `xTickMarks` and `yTickMarks` draw the short lines at each tick value, which helps tie a label to its exact position on the axis.
 * @order 6
 */
export function TicksExample(props: Partial<LineChartProps>) {
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
      xTickMarks={true}
      yTickMarks={true}
      height={400}
      aria-label="Ticks example chart"
      desc="Line chart demonstrating tick marks only"
      {...props}
    />
  );
}
