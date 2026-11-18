import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = [
  'Mon, Oct 19',
  'Tues, Oct 20',
  'Wed, Oct 21',
  'Thurs, Oct 22',
  'Fri, Oct 23',
  'Sat, Oct 24',
  'Sun, Oct 25'
];
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '1–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: 200, color: '#0e7078', label: '150–200' },
  { min: 200, max: null, color: '#063b43', label: '200+' }
];

function buildData(days: string[]) {
  return days.flatMap(function mapDay(day, dayIndex) {
    return HOURS.map(function mapHour(hour, hourIndex) {
      return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 240 };
    });
  });
}

/**
 * `maxCellHeight` stops rows stretching when the chart has more height than it needs. Here a single row
 * in a 420px chart stays 48px tall instead of filling the space, and the axis and legend follow it.
 * `align` decides where the chart sits in the leftover space; the default `start` keeps it at the top.
 * @title Maximum cell height
 * @order 5
 */
export function MaxCellHeightExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS.slice(0, 1))}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      height={420}
      maxCellHeight={48}
      aria-label="Single-row heatmap with a maximum cell height"
      {...props}
    />
  );
}
