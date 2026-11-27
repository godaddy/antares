import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

/**
 * `labelType` sets the size of the center value. Use `'value'` for numbers or percentages and `'text'` for short words.
 * @order 6
 */
export function LabelTypeExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={72} aria-label="Gauge with numeric value label">
        <GaugeChartCenter>
          <Text slot="value">72%</Text>
          <Text slot="description">Completion</Text>
        </GaugeChartCenter>
      </GaugeChart>
      <GaugeChart value={72} labelType="text" valueLabel="Good, 72%" aria-label="Gauge with text label">
        <GaugeChartCenter>
          <Text slot="value">Good</Text>
          <Text slot="description">Completion</Text>
        </GaugeChartCenter>
      </GaugeChart>
    </Grid>
  );
}
