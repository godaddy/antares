import { GaugeChart, GaugeChartCenter, GaugeChartRange, Grid, Text } from '@godaddy/antares';

/** @ignore */
export function RegionOrderExample() {
  return (
    <Grid columns="repeat(2, 200px)" gap="lg">
      <GaugeChart value={72} aria-label="Range first">
        <GaugeChartRange>
          <Text slot="max">High</Text>
          <Text slot="min">Low</Text>
        </GaugeChartRange>
        <GaugeChartCenter>
          <Text slot="description">Score</Text>
          <Text slot="value">72%</Text>
        </GaugeChartCenter>
      </GaugeChart>
      <GaugeChart value={72} aria-label="Center first">
        <GaugeChartCenter>
          <Text slot="value">72%</Text>
          <Text slot="description">Score</Text>
        </GaugeChartCenter>
        <GaugeChartRange>
          <Text slot="min">Low</Text>
          <Text slot="max">High</Text>
        </GaugeChartRange>
      </GaugeChart>
    </Grid>
  );
}
