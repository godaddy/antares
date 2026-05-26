import { ChartColorProvider, useChartColor } from '../src/index.tsx';

function SeriesBar() {
  const color = useChartColor();
  return (
    <li data-color={color} style={{ backgroundColor: color }}>
      <code>{color}</code>
    </li>
  );
}

export function SingleSeriesExample() {
  const series = [{ value: 100 }];

  return (
    <ChartColorProvider>
      <ul>
        {series.map((_, i) => (
          <SeriesBar key={i} />
        ))}
      </ul>
    </ChartColorProvider>
  );
}
