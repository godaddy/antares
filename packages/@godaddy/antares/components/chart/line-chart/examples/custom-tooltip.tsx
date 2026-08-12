import { cityTemperature } from '@visx/mock-data';
import { Box, Flex, LineChart, type LineChartProps, type LineChartTooltipRenderProps, Text } from '@godaddy/antares';

/**
 * Renders a tooltip for the single hovered curve. `renderTooltip` receives
 * `hoveredSeriesId` (the series nearest the cursor) so the tooltip can show
 * information specific to that line instead of every series at once.
 */
function renderHoveredTooltip({ hoveredSeriesId, hoveredDatum, series }: LineChartTooltipRenderProps) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered || !hoveredDatum) {
    return null;
  }

  return (
    <Flex direction="column" gap="sm">
      <Flex alignItems="center" gap="sm">
        <Box
          rounding="full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: hovered._resolvedColor
          }}
        />
        <Text>{hovered.name}</Text>
      </Flex>
      <Text>{`${(hoveredDatum.y as number).toFixed(1)}°F`}</Text>
    </Flex>
  );
}

/**
 * `renderTooltip` lets you render a fully custom tooltip and know which curve is
 * hovered. Paired series share a `colorIndex`; hovering either line shows a
 * tooltip specific to that line, wrapped in the default styled popover.
 */
export function CustomTooltipExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({
        x: new Date(d.date),
        y: parseFloat(d[city] as string) * scale
      }))
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
      aria-label="Custom tooltip example chart"
      desc="Line chart with a custom tooltip that shows information specific to the hovered curve"
      renderTooltip={renderHoveredTooltip}
      {...props}
    />
  );
}
