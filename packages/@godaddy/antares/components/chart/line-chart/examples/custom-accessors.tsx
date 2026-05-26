import { type DateValue, cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function CustomAccessorsExample(props: Partial<LineChartProps<DateValue>>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ date: new Date(d.date), value: parseFloat(d['New York']) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      xAccessor={(d) => d.date}
      yAccessor={(d) => d.value}
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Custom accessors example chart"
      desc="Line chart demonstrating custom data types with accessors"
      {...props}
    />
  );
}
