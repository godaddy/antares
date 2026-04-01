import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

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
