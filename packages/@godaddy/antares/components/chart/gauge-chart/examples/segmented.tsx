import { Grid, GaugeChart } from '@godaddy/antares';

export function SegmentedExample() {
  return (
    <Grid columns="repeat(2, 200px)" rowGap="lg" justifyContent="center">
      <GaugeChart segments={5} value={0} label="0/5" subLabel="Empty" aria-label="Gauge with 0 of 5 filled" />
      <GaugeChart segments={5} value={2} label="2/5" subLabel="Partial" aria-label="Gauge with 2 of 5 filled" />
      <GaugeChart segments={5} value={5} label="5/5" subLabel="Full" aria-label="Gauge with 5 of 5 filled" />
      <GaugeChart segments={3} value={1} label="1/3" subLabel="Three segments" aria-label="Gauge with 1 of 3 filled" />
    </Grid>
  );
}
