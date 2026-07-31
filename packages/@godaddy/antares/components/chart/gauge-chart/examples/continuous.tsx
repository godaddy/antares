import { Grid, GaugeChart } from '@godaddy/antares';

/**
 * Multiple continuous gauges showing different fill percentages.
 * @title Continuous Values
 * @order 2
 */
export function ContinuousExample() {
  const values = [0, 25, 50, 75, 100];

  return (
    <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="md" justifyContent="center" alignContent="center">
      {values.map(function renderGauge(v) {
        return <GaugeChart key={v} value={v} label={`${v}%`} subLabel="Progress" aria-label={`Gauge at ${v}%`} />;
      })}
    </Grid>
  );
}
