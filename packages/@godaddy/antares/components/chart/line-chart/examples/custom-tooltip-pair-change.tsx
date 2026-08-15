import { cityTemperature } from '@visx/mock-data';
import { Box, Flex, LineChart, type LineChartProps, type LineChartTooltipRenderProps, Text } from '@godaddy/antares';

/**
 * Two pairs of lines, each a solid "actual" curve plus its dashed "forecast" partner
 * (the two share a `colorIndex`). Hovering any line resolves the pair it belongs to and
 * shows both values plus the percent change of the forecast relative to the actual —
 * demonstrating that `renderTooltip` can combine multiple series, not just the hovered one.
 */
function renderPairChangeTooltip({ hoveredSeriesId, datumByKey, series }: LineChartTooltipRenderProps) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered) {
    return null;
  }

  // Both lines in a pair share a color; split them into the solid actual and dashed forecast.
  const pair = series.filter((oneSeries) => oneSeries.colorIndex === hovered.colorIndex);
  const actual = pair.find((oneSeries) => oneSeries.variant !== 'dashed');
  const forecast = pair.find((oneSeries) => oneSeries.variant === 'dashed');
  if (!actual || !forecast) {
    return null;
  }

  const actualY = datumByKey[actual.id]?.y as number | undefined;
  const forecastY = datumByKey[forecast.id]?.y as number | undefined;
  if (actualY == null || forecastY == null) {
    return null;
  }

  const change = ((forecastY - actualY) / actualY) * 100;
  const sign = change >= 0 ? '+' : '';

  return (
    <Flex direction="column" gap="sm">
      <Flex alignItems="center" gap="sm">
        <Box
          rounding="full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: actual._resolvedColor
          }}
        />
        <Text>{actual.name}</Text>
      </Flex>
      <Text>{`Actual: ${actualY.toFixed(1)}°F`}</Text>
      <Text>{`Forecast: ${forecastY.toFixed(1)}°F`}</Text>
      <Text>{`Forecast vs actual: ${sign}${change.toFixed(1)}%`}</Text>
    </Flex>
  );
}

/**
 * `renderTooltip` example combining a pair of series. Each pair shares a `colorIndex`
 * (solid actual + dashed forecast); hovering either line shows the percent change of
 * the forecast against the actual for that pair, wrapped in the default styled popover.
 */
export function CustomTooltipPairChangeExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number]) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  // Forecast wobbles deterministically above and below the actual (±~15%) so the
  // percent change varies per point and goes negative where the forecast undershoots.
  const toForecast = (city: keyof (typeof cityTemperature)[number], phase = 0) =>
    rows
      .map((d, i) => ({
        x: new Date(d.date),
        y: parseFloat(d[city] as string) * (1 + 0.15 * Math.sin(i + phase))
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'ny', name: 'New York', colorIndex: 0, data: toPoints('New York') },
    {
      id: 'ny-forecast',
      name: 'New York (forecast)',
      colorIndex: 0,
      variant: 'dashed' as const,
      data: toForecast('New York')
    },
    {
      id: 'sf',
      name: 'San Francisco',
      colorIndex: 1,
      data: toPoints('San Francisco')
    },
    {
      id: 'sf-forecast',
      name: 'San Francisco (forecast)',
      colorIndex: 1,
      variant: 'dashed' as const,
      data: toForecast('San Francisco', 2)
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
      aria-label="Pair percent-change tooltip example chart"
      desc="Line chart whose tooltip shows the forecast-vs-actual percent change for the hovered pair"
      renderTooltip={renderPairChangeTooltip}
      {...props}
    />
  );
}
