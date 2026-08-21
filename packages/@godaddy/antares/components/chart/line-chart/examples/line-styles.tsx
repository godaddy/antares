import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `variant` sets each series' line style — 'solid' (default), 'dashed', or
 * 'dotted' — useful for distinguishing actuals from forecasts or targets. The
 * legend swatch mirrors each line's style.
 */
export function LineStylesExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) * scale }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'actual', name: 'Actual', data: toPoints('New York') },
    { id: 'forecast', name: 'Forecast', variant: 'dashed' as const, data: toPoints('New York', 1.08) },
    { id: 'target', name: 'Target', variant: 'dotted' as const, data: toPoints('New York', 0.92) }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      yZero={false}
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Line styles example chart"
      desc="Line chart demonstrating solid, dashed, and dotted line styles via the variant prop"
      {...props}
    />
  );
}
