import {
  Box,
  type DataPoint,
  Flex,
  LineChart,
  type LineChartProps,
  type LineChartTooltipRenderProps,
  type LineSeriesConfig,
  Text
} from '@godaddy/antares';

const CURRENT_YEAR = 2026;
const POINTS = 12;

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
const formatMoney = (v: number) => `$${v.toFixed(2)}`;

/**
 * Series shape extended with custom tooltipMetadata. The type of tooltipMetadata is inferred
 * from this type in the tooltip render function so no cast is needed at the call site.
 */
interface ChannelSeries extends LineSeriesConfig {
  /** Which period this line represents; used to pair current vs previous. */
  tooltipMetadata: { period: 'current' | 'previous' };
}

/**
 * Period-over-period tooltip. Each channel is a pair sharing a `colorIndex`: a solid
 * "current period" line and its dashed "previous period" partner. Hovering either line
 * shows the channel name, both dated values, and the percent change vs the previous period —
 * mirroring a typical analytics comparison card, built entirely from the `renderTooltip` prop.
 */
function renderPeriodTooltip({
  hoveredSeriesId,
  datumByKey,
  series
}: LineChartTooltipRenderProps<DataPoint, LineSeriesConfig<DataPoint, { period: 'current' | 'previous' }>>) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered) {
    return null;
  }

  // Pair by colorIndex, then split by the custom `period` key (typed, no cast needed).
  const pair = series.filter((oneSeries) => oneSeries.colorIndex === hovered.colorIndex);
  const current = pair.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'current');
  const previous = pair.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'previous');
  if (!current || !previous) {
    return null;
  }

  const currentDatum = datumByKey[current.id];
  const previousDatum = datumByKey[previous.id];
  if (!currentDatum || !previousDatum) {
    return null;
  }

  const currentValue = currentDatum.y as number;
  const previousValue = previousDatum.y as number;
  const currentDate = currentDatum.x as Date;
  // Both series plot on current-period dates so they overlay; the previous row is labelled one year back.
  const previousDate = new Date(currentDate);
  previousDate.setFullYear(currentDate.getFullYear() - 1);

  const change = previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;
  const isUp = change >= 0;
  const color = current._resolvedColor;

  return (
    <Flex direction="column" gap="lg" style={{ minWidth: 260 }}>
      <Text style={{ fontSize: 18 }}>{current.name}</Text>

      <Flex direction="column" gap="sm">
        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: color }} />
            <Text>{formatDate(currentDate)}</Text>
          </Flex>
          <Text>{formatMoney(currentValue)}</Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box
              rounding="full"
              style={{
                width: 12,
                height: 12,
                border: `2px solid ${color}`,
                boxSizing: 'border-box'
              }}
            />
            <Text>{formatDate(previousDate)}</Text>
          </Flex>
          <Text>{formatMoney(previousValue)}</Text>
        </Flex>
      </Flex>

      <Flex alignItems="center" gap="sm">
        <Text style={{ color: isUp ? '#2f9e44' : '#e03131' }}>{isUp ? '↑' : '↓'}</Text>
        <Text style={{ fontWeight: 'bolder' }}>{`${Math.abs(change).toFixed(2)}%`}</Text>
        <Text style={{ color: '#868e96' }}>compared to previous period</Text>
      </Flex>
    </Flex>
  );
}

/** Builds a deterministic weekly series in the hundreds-of-dollars range. */
function buildSeries(base: number, amplitude: number, phase: number) {
  return Array.from({ length: POINTS }, (_, i) => ({
    x: new Date(CURRENT_YEAR, 0, 2 + i * 7),
    y: base + amplitude * Math.sin(i * 0.6 + phase)
  }));
}

/**
 * `renderTooltip` example styled as a period-over-period comparison card. Paired series
 * (solid current period + dashed previous period) share a `colorIndex`; hovering either
 * line shows both dated values and the percent change, wrapped in the default popover.
 */
export function CustomTooltipPeriodComparisonExample(props: Partial<LineChartProps<DataPoint, ChannelSeries>>) {
  const series: ChannelSeries[] = [
    {
      id: 'online',
      name: 'Online Store',
      colorIndex: 0,
      tooltipMetadata: { period: 'current' },
      data: buildSeries(680, 90, 0)
    },
    {
      id: 'online-prev',
      name: 'Online Store (previous)',
      colorIndex: 0,
      tooltipMetadata: { period: 'previous' },
      variant: 'dashed',
      data: buildSeries(700, 80, 1.2)
    },
    {
      id: 'retail',
      name: 'Retail',
      colorIndex: 1,
      tooltipMetadata: { period: 'current' },
      data: buildSeries(430, 70, 0.5)
    },
    {
      id: 'retail-prev',
      name: 'Retail (previous)',
      colorIndex: 1,
      tooltipMetadata: { period: 'previous' },
      variant: 'dashed',
      data: buildSeries(410, 60, 1.8)
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
      aria-label="Period-over-period comparison tooltip example chart"
      desc="Line chart whose tooltip compares the hovered channel's current and previous period values"
      renderTooltip={renderPeriodTooltip}
      {...props}
    />
  );
}
