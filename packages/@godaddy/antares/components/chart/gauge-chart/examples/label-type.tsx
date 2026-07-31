import { Grid, GaugeChart } from '@godaddy/antares';

/**
 * Control the font size of the primary label using `labelType`. Use `'value'` for numeric or percentage values and `'text'` for short descriptive strings.
 * @order 6
 */
export function LabelTypeExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={72} label="72%" subLabel="Completion" aria-label="Gauge with numeric value label" />
      <GaugeChart value={72} label="Good" labelType="text" subLabel="Completion" aria-label="Gauge with text label" />
    </Grid>
  );
}
