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
 * When the `height` is too small for every row at `minCellHeight`, rows stop shrinking at that size and
 * the chart scrolls vertically. The axis labels stay pinned while the rows scroll under them.
 * @title Scrolling
 * @order 4
 */
export function ScrollingExample(props: any) {
  return (
    <HeatmapChart
      data={buildData(DAYS)}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Avg. Transactions"
      height={220}
      aria-label="Heatmap that scrolls because the height is too small for every row"
      {...props}
    />
  );
}
