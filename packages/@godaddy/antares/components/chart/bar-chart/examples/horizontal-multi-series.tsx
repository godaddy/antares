import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets } from '@visx/mock-data';

interface ExoplanetSurveyPoint {
  name: string;
  value: number;
}

// Take 90 real exoplanets and use the first 15 names as the shared category axis.
// Each series maps a different group of 15 planets' radius onto those same category names,
// demonstrating multi-series grouped bars with real exoplanet data.
const trueExoplanets = allExoplanets.filter((d) => d.distance && d.distance > 0).slice(0, 60);
const categoryNames = trueExoplanets.slice(0, 15).map((d) => d.name);

function toSurveyData(planets: typeof trueExoplanets): ExoplanetSurveyPoint[] {
  return planets.slice(0, 15).map((d, i) => ({ name: categoryNames[i], value: d.radius }));
}

const series = [
  { id: 'survey-a', name: 'Survey A', data: toSurveyData(trueExoplanets.slice(0, 15)) },
  { id: 'survey-b', name: 'Survey B', data: toSurveyData(trueExoplanets.slice(15, 30)) },
  { id: 'survey-c', name: 'Survey C', data: toSurveyData(trueExoplanets.slice(30, 45)) },
  { id: 'survey-d', name: 'Survey D', data: toSurveyData(trueExoplanets.slice(45, 60)) }
];

export function BarChartHorizontalMultiSeriesExample(props: any) {
  return (
    <BarChart
      series={series}
      orientation="horizontal"
      xAccessor={(d: ExoplanetSurveyPoint) => d.value}
      yAccessor={(d: ExoplanetSurveyPoint) => d.name}
      xAxisTitle="Radius (Rj)"
      yAxisTitle="Exoplanet"
      {...props}
    />
  );
}
