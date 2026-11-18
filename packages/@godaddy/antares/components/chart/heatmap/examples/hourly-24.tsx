import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, function hourLabel(_, hour) {
  return `${String(hour).padStart(2, '0')}:00`;
});

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#d8efef', label: '0–50' },
  { min: 50, max: 100, color: '#94d7da', label: '50–100' },
  { min: 100, max: 150, color: '#15a4ab', label: '100–150' },
  { min: 150, max: null, color: '#0e7078', label: '150+' }
];

const DATA = DAYS.flatMap(function mapDay(day, dayIndex) {
  return HOURS.map(function mapHour(hour, hourIndex) {
    return { x: hour, y: day, value: (dayIndex * 37 + hourIndex * 29) % 190 };
  });
});

/**
 * Every column keeps its label, however many there are. A 24-hour grid is wider than most containers,
 * so it scrolls horizontally while the row labels stay pinned.
 * @title Many columns
 * @order 8
 */
export function Hourly24Example(props: any) {
  return (
    <HeatmapChart
      data={DATA}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Visitors"
      aria-label="Visitors by hour of day"
      {...props}
    />
  );
}
