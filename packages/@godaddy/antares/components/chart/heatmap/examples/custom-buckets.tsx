import { HeatmapChart, type ColorBucket } from '@godaddy/antares';

const PRODUCTS = ['Widget A', 'Widget B', 'Widget C', 'Widget D'];
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

const RAW: Record<string, number | null> = {
  'Widget A-North': 92,
  'Widget A-South': 74,
  'Widget A-East': 88,
  'Widget A-West': 61,
  'Widget A-Central': 95,
  'Widget B-North': 45,
  'Widget B-South': 38,
  'Widget B-East': 51,
  'Widget B-West': null,
  'Widget B-Central': 42,
  'Widget C-North': 78,
  'Widget C-South': 85,
  'Widget C-East': 66,
  'Widget C-West': 79,
  'Widget C-Central': 82,
  'Widget D-North': null,
  'Widget D-South': 55,
  'Widget D-East': 62,
  'Widget D-West': 48,
  'Widget D-Central': null
};

const data = PRODUCTS.flatMap((product) =>
  REGIONS.map((region) => ({
    x: region,
    y: product,
    value: RAW[`${product}-${region}`] ?? null
  }))
);

const SCORE_BUCKETS: ColorBucket[] = [
  { min: 0, max: 40, color: '#fca5a5', label: '< 40' },
  { min: 40, max: 60, color: '#fcd34d', label: '40–60' },
  { min: 60, max: 80, color: '#86efac', label: '60–80' },
  { min: 80, max: null, color: '#16a34a', label: '80+' }
];

/**
 * Custom color buckets for a satisfaction-score theme: red for low scores, yellow for medium,
 * greens for high. Null cells represent regions where data was unavailable.
 * @order 8
 */
export function CustomBucketsExample(props: any) {
  return (
    <HeatmapChart
      data={data}
      colorBuckets={SCORE_BUCKETS}
      colorLegendLabel="Score"
      closedLabel="N/A"
      tooltipValueFormatter={(d: { x: string; y: string; value: number | null }) =>
        d.value !== null ? `${d.value}/100` : ''
      }
      aria-label="Heatmap of customer satisfaction scores"
      {...props}
    />
  );
}
