import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `colorIndex` pins each series to a palette color. Any series can use any index,
 * independently — here two pairs each share an index so an actual line and its
 * dashed forecast read as the same color, distinguished only by line style.
 */
export function ColorIndexExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) * scale }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'ny', name: 'New York', colorIndex: 0, data: toPoints('New York') },
    {
      id: 'ny-forecast',
      name: 'New York (forecast)',
      colorIndex: 0,
      variant: 'dashed' as const,
      data: toPoints('New York', 1.08)
    },
    { id: 'sf', name: 'San Francisco', colorIndex: 1, data: toPoints('San Francisco') },
    {
      id: 'sf-forecast',
      name: 'San Francisco (forecast)',
      colorIndex: 1,
      variant: 'dashed' as const,
      data: toPoints('San Francisco', 1.08)
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      yZero={false}
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Color index example chart"
      desc="Line chart where paired series share a palette color via colorIndex, distinguished by solid and dashed line styles"
      {...props}
    />
  );
}
