import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function CrosshairOnlyExample(props: Partial<LineChartProps>) {
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
      tooltip={false}
      showCrosshair={true}
      showDataPoints={true}
      height={400}
      aria-label="Crosshair only example chart"
      desc="Line chart demonstrating crosshair without tooltip"
      {...props}
    />
  );
}
