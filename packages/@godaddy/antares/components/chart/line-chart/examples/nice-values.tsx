import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `xNice` and `yNice` round the domain out to friendlier numbers (e.g. 0.2 to 1.0), so ticks land on values people expect.
 * @title Nice values
 * @order 13
 */
export function NiceValuesExample(props: Partial<LineChartProps>) {
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
      xLabels={true}
      yLabels={true}
      xNice={true}
      yNice={true}
      height={400}
      aria-label="Nice values example chart"
      desc="Line chart demonstrating nice rounded values"
      {...props}
    />
  );
}
