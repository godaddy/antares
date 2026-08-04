import { Grid, GaugeChart } from '@godaddy/antares';

/**
 * Color variants convey meaning at a glance — use `success`, `warning`, or `critical` alongside descriptive text.
 * @order 5
 */
export function VariantsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={50} label="50%" subLabel="Default" variant="default" aria-label="Default variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Success" variant="success" aria-label="Success variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Warning" variant="warning" aria-label="Warning variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Critical" variant="critical" aria-label="Critical variant gauge" />
    </Grid>
  );
}
