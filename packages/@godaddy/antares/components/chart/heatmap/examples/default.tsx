import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];

const SEED_VALUES: Record<string, number> = {
  'Monday-6am': 12,
  'Monday-8am': 180,
  'Monday-10am': 340,
  'Monday-12pm': 290,
  'Monday-2pm': 310,
  'Monday-4pm': 270,
  'Monday-6pm': 220,
  'Monday-8pm': 90,
  'Monday-10pm': 30,
  'Tuesday-6am': 18,
  'Tuesday-8am': 200,
  'Tuesday-10am': 380,
  'Tuesday-12pm': 310,
  'Tuesday-2pm': 360,
  'Tuesday-4pm': 290,
  'Tuesday-6pm': 240,
  'Tuesday-8pm': 100,
  'Tuesday-10pm': 35,
  'Wednesday-6am': 22,
  'Wednesday-8am': 190,
  'Wednesday-10am': 370,
  'Wednesday-12pm': 320,
  'Wednesday-2pm': 350,
  'Wednesday-4pm': 300,
  'Wednesday-6pm': 230,
  'Wednesday-8pm': 80,
  'Wednesday-10pm': 28,
  'Thursday-6am': 15,
  'Thursday-8am': 210,
  'Thursday-10am': 400,
  'Thursday-12pm': 350,
  'Thursday-2pm': 380,
  'Thursday-4pm': 310,
  'Thursday-6pm': 250,
  'Thursday-8pm': 120,
  'Thursday-10pm': 40,
  'Friday-6am': 20,
  'Friday-8am': 230,
  'Friday-10am': 420,
  'Friday-12pm': 370,
  'Friday-2pm': 410,
  'Friday-4pm': 330,
  'Friday-6pm': 300,
  'Friday-8pm': 160,
  'Friday-10pm': 60,
  'Saturday-6am': 5,
  'Saturday-8am': 80,
  'Saturday-10am': 200,
  'Saturday-12pm': 260,
  'Saturday-2pm': 280,
  'Saturday-4pm': 240,
  'Saturday-6pm': 220,
  'Saturday-8pm': 180,
  'Saturday-10pm': 90,
  'Sunday-6am': 4,
  'Sunday-8am': 60,
  'Sunday-10am': 150,
  'Sunday-12pm': 210,
  'Sunday-2pm': 230,
  'Sunday-4pm': 200,
  'Sunday-6pm': 180,
  'Sunday-8pm': 140,
  'Sunday-10pm': 70
};

const data = DAYS.flatMap((day) =>
  HOURS.map((hour) => ({
    x: hour,
    y: day,
    value: SEED_VALUES[`${day}-${hour}`] ?? null
  }))
);

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 50, color: '#dbeafe', label: '0–50' },
  { min: 50, max: 150, color: '#93c5fd', label: '50–150' },
  { min: 150, max: 300, color: '#3b82f6', label: '150–300' },
  { min: 300, max: 400, color: '#1d4ed8', label: '300–400' },
  { min: 400, max: null, color: '#1e3a8a', label: '400+' }
];

/**
 * Displays a metric by row and column category. Null values render as dashed-border "No data" cells.
 * @order 1
 */
export function DefaultExample(props: any) {
  return (
    <HeatmapChart
      data={data}
      colorBuckets={COLOR_BUCKETS}
      colorLegendLabel="Visitors"
      aria-label="Heatmap of visitor counts by day and hour"
      {...props}
    />
  );
}
