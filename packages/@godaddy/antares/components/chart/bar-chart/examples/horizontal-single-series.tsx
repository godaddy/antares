import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets, type Exoplanets } from '@visx/mock-data';

const largestExoplanets = [...allExoplanets.filter((d) => d.distance && d.distance > 0)]
  .sort((a, b) => b.radius - a.radius)
  .slice(0, 30);

const series = [{ id: 'radius', name: 'Radius', data: largestExoplanets }];

export function BarChartHorizontalSingleSeriesExample(props: any) {
  return (
    <BarChart
      series={series}
      orientation="horizontal"
      xAccessor={(d: Exoplanets) => d.radius}
      yAccessor={(d: Exoplanets) => d.name}
      xAxisTitle="Radius (Rj)"
      yAxisTitle="Exoplanet"
      {...props}
    />
  );
}
