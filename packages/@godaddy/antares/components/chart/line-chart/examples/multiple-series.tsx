import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function MultipleSeriesExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Product A',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-2',
      name: 'Product B',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['San Francisco']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-3',
      name: 'Product C',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['Austin']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-4',
      name: 'Product D',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) * 1.1 }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      yZero={false}
      height={400}
      aria-label="Multiple series example chart"
      desc="Line chart demonstrating multiple series comparison"
      {...props}
    />
  );
}
