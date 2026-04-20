import { LineChart, type LineChartProps } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

export interface PlaygroundExampleProps
  extends Omit<
    LineChartProps,
    'series' | 'xAccessor' | 'yAccessor' | 'xTickFormat' | 'yTickFormat' | 'tooltipValueFormatter'
  > {
  /** Number of series to render (1 hides the legend by default). */
  numSeries?: 1 | 2 | 3;
}

const CITIES = ['New York', 'San Francisco', 'Austin'] as const;

export function PlaygroundExample({
  numSeries = 2,
  xTitle = 'Date',
  yTitle = 'Temperature (°F)',
  xType = 'time',
  height = 600,
  ...rest
}: PlaygroundExampleProps) {
  const series = CITIES.slice(0, numSeries).map(function mapCity(city) {
    return {
      id: `city-${city.toLowerCase().replace(/\s+/g, '-')}`,
      name: city,
      data: cityTemperature
        .map(function mapRow(row) {
          return {
            x: new Date(row.date),
            y: parseFloat(row[city as keyof typeof row] as string)
          };
        })
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    };
  });

  return <LineChart series={series} xTitle={xTitle} yTitle={yTitle} xType={xType} height={height} {...rest} />;
}
