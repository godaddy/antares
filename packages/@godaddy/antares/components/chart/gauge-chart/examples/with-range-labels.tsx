import { Grid, GaugeChart } from '@godaddy/antares';

export function WithRangeLabelsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart
        value={65}
        label="65%"
        subLabel="CPU Usage"
        rangeLabel={{ min: 0, max: 100 }}
        aria-label="CPU usage gauge"
      />
      <GaugeChart
        value={3}
        segments={5}
        label="3/5"
        subLabel="Risk Level"
        rangeLabel={{ min: 'Low', max: 'High' }}
        variant="warning"
        aria-label="Risk level gauge"
      />
    </Grid>
  );
}
