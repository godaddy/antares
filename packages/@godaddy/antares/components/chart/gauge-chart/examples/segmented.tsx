import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

const gauges = [
  { segments: 5, value: 0, description: 'Empty' },
  { segments: 5, value: 2, description: 'Partial' },
  { segments: 5, value: 5, description: 'Full' },
  { segments: 3, value: 1, description: 'Three segments' }
];

/**
 * Segmented gauges divide the arc into discrete sections (1–5). The `value` prop selects how many segments are filled.
 * @order 3
 */
export function SegmentedExample() {
  return (
    <Grid columns="repeat(2, 200px)" gap="md" justifyContent="center">
      {gauges.map(function renderGauge({ segments, value, description }) {
        return (
          <GaugeChart
            key={`${value}/${segments}`}
            segments={segments}
            value={value}
            valueLabel={`${value} of ${segments}`}
            aria-label={`Gauge with ${value} of ${segments} filled`}
          >
            <GaugeChartCenter>
              <Text slot="value">
                {value}/{segments}
              </Text>
              <Text slot="description">{description}</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}
