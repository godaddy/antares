import {
  Box,
  Flex,
  HeatmapChart,
  type HeatmapChartProps,
  type HeatmapTooltipRenderProps,
  type ColorBucket,
  Text
} from '@godaddy/antares';

interface VisitorDatum {
  day: string;
  hour: string;
  visitors: number | null;
  prevVisitors: number | null;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm'];

const BASE: Record<string, [number, number]> = {
  'Monday-8am': [180, 155],
  'Monday-10am': [340, 300],
  'Monday-12pm': [290, 280],
  'Monday-2pm': [310, 270],
  'Monday-4pm': [270, 290],
  'Monday-6pm': [220, 200],
  'Tuesday-8am': [200, 170],
  'Tuesday-10am': [380, 340],
  'Tuesday-12pm': [310, 295],
  'Tuesday-2pm': [360, 320],
  'Tuesday-4pm': [290, 310],
  'Tuesday-6pm': [240, 215],
  'Wednesday-8am': [190, 160],
  'Wednesday-10am': [370, 330],
  'Wednesday-12pm': [320, 305],
  'Wednesday-2pm': [350, 310],
  'Wednesday-4pm': [300, 280],
  'Wednesday-6pm': [230, 210],
  'Thursday-8am': [210, 185],
  'Thursday-10am': [400, 360],
  'Thursday-12pm': [350, 330],
  'Thursday-2pm': [380, 350],
  'Thursday-4pm': [310, 295],
  'Thursday-6pm': [250, 230],
  'Friday-8am': [230, 200],
  'Friday-10am': [420, 380],
  'Friday-12pm': [370, 345],
  'Friday-2pm': [410, 380],
  'Friday-4pm': [330, 300],
  'Friday-6pm': [300, 265]
};

const data: VisitorDatum[] = DAYS.flatMap(function mapDay(day) {
  return HOURS.map(function mapHour(hour) {
    const vals = BASE[`${day}-${hour}`];
    return {
      day,
      hour,
      visitors: vals ? vals[0] : null,
      prevVisitors: vals ? vals[1] : null
    };
  });
});

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 100, color: '#dcfce7', label: '0–100' },
  { min: 100, max: 200, color: '#86efac', label: '100–200' },
  { min: 200, max: 300, color: '#22c55e', label: '200–300' },
  { min: 300, max: 400, color: '#15803d', label: '300–400' },
  { min: 400, max: null, color: '#14532d', label: '400+' }
];

/**
 * Period-over-period tooltip built from `renderTooltip`. The previous period's value rides along on
 * each datum, so the tooltip can show both values and the percent change for the hovered cell.
 */
function renderComparisonTooltip({ datum, bucket, x, y }: HeatmapTooltipRenderProps<VisitorDatum>) {
  if (!datum || datum.visitors === null || datum.prevVisitors === null) {
    return null;
  }

  const change = datum.prevVisitors === 0 ? 0 : ((datum.visitors - datum.prevVisitors) / datum.prevVisitors) * 100;
  const isUp = change >= 0;

  return (
    <Flex direction="column" gap="lg" style={{ minWidth: 260 }}>
      <Flex justifyContent="space-between" alignItems="center" gap="2xl">
        <Flex alignItems="center" gap="md">
          <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: bucket?.color }} />
          <Text>{`${String(y)} · ${String(x)}`}</Text>
        </Flex>
        <Text>{datum.visitors.toLocaleString()}</Text>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" gap="2xl">
        <Flex alignItems="center" gap="md">
          <Box
            rounding="full"
            style={{
              width: 12,
              height: 12,
              border: `2px solid ${bucket?.color}`,
              boxSizing: 'border-box'
            }}
          />
          <Text>Previous period</Text>
        </Flex>
        <Text>{datum.prevVisitors.toLocaleString()}</Text>
      </Flex>

      <Flex alignItems="center" gap="sm">
        <Text style={{ color: isUp ? '#2f9e44' : '#e03131' }}>{isUp ? '↑' : '↓'}</Text>
        <Text style={{ fontWeight: 'bolder' }}>{`${Math.abs(change).toFixed(0)}%`}</Text>
        <Text style={{ color: '#868e96' }}>compared to previous period</Text>
      </Flex>
    </Flex>
  );
}

/**
 * A `renderTooltip` example styled as a period-over-period comparison card. The previous value is
 * carried on the datum and read back in the tooltip, so the chart itself needs no comparison props.
 * @title Custom tooltip
 * @order 7
 */
export function CustomTooltipPeriodComparisonExample(props: Partial<HeatmapChartProps<VisitorDatum>>) {
  return (
    <HeatmapChart<VisitorDatum>
      data={data}
      xAccessor={(d) => d.hour}
      yAccessor={(d) => d.day}
      valueAccessor={(d) => d.visitors}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Visitors"
      renderTooltip={renderComparisonTooltip}
      aria-label="Heatmap comparing current and previous period visitor counts"
      {...props}
    />
  );
}
