import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

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
        return (
          <GaugeChart key={v} value={v} aria-label={`Gauge at ${v}%`}>
            <GaugeChartCenter>
              <Text slot="value">{v}%</Text>
              <Text slot="description">Progress</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}
