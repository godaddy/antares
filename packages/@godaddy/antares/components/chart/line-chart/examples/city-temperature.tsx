import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return String(value);
}

function formatTemperature(value: number): string {
  return `${value.toFixed(1)}°F`;
}

function formatTooltipTemperature(d: DataPoint): string {
  return `${(d.y as number).toFixed(1)}°F`;
}

export function CityTemperatureExample(props: Partial<LineChartProps>) {
  const cities = ['New York', 'San Francisco', 'Austin'] as const;

  const series = cities.map(function mapCity(city) {
    return {
      id: `city-${city.toLowerCase().replace(/\s+/g, '-')}`,
      name: city,
      data: cityTemperature
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city as keyof typeof d] as string) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    };
  });

  return (
    <LineChart
      series={series}
      xType="time"
      xLabels={true}
      yLabels={true}
      xTickMarks={true}
      yTickMarks={true}
      xBaseline={true}
      yBaseline={true}
      xNice={true}
      yNice={true}
      xTickFormat={formatDate}
      yTickFormat={formatTemperature}
      legendPosition="top"
      tooltipValueFormatter={formatTooltipTemperature}
      height={400}
      aria-label="City temperature comparison chart"
      desc="Line chart showing temperature comparisons across multiple cities over time with complete axis configuration including gridlines, tick marks, baselines, date formatting, and unit formatting"
      {...props}
    />
  );
}
