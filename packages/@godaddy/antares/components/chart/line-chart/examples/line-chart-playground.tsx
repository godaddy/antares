import { LineChart, type LineChartProps } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';
import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';

export interface PlaygroundExampleProps
  extends Omit<
    LineChartProps,
    'series' | 'xAccessor' | 'yAccessor' | 'xTickFormat' | 'yTickFormat' | 'tooltipValueFormatter'
  > {
  /** Number of series to render (1 hides the legend by default). */
  numSeries?: 1 | 2 | 3;
  /** Render in right-to-left layout by wrapping the chart in {@link RTLProvider}. */
  rtl?: boolean;
}

const CITIES = ['New York', 'San Francisco', 'Austin'] as const;

export function PlaygroundExample({
  numSeries = 2,
  xTitle = 'Date',
  yTitle = 'Temperature (°F)',
  xType = 'time',
  height = 600,
  rtl = false,
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

  const chart = <LineChart series={series} xTitle={xTitle} yTitle={yTitle} xType={xType} height={height} {...rest} />;

  return rtl ? <RTLProvider>{chart}</RTLProvider> : chart;
}
