import { GaugeChart, GaugeChartCenter, GaugeChartRange, Grid, Text } from '@godaddy/antares';
import type { Ref } from 'react';

interface WithRangeLabelsExampleProps {
  /** Ref to the risk gauge's center. */
  centerRef?: Ref<HTMLDivElement>;

  /** Ref to the risk gauge's range. */
  rangeRef?: Ref<HTMLDivElement>;

  /** Whether to show the labels inside each range. */
  showRangeLabels?: boolean;
}

/**
 * Add `GaugeChartRange` to label the ends of the arc. The labels describe the scale; they do not change it.
 * @order 4
 */
export function WithRangeLabelsExample({ centerRef, rangeRef, showRangeLabels = true }: WithRangeLabelsExampleProps) {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={65} aria-label="CPU usage gauge">
        <GaugeChartCenter>
          <Text slot="value">65%</Text>
          <Text slot="description">CPU Usage</Text>
        </GaugeChartCenter>
        <GaugeChartRange>
          {showRangeLabels && (
            <>
              <Text slot="min">0</Text>
              <Text slot="max">100</Text>
            </>
          )}
        </GaugeChartRange>
      </GaugeChart>
      <GaugeChart value={3} segments={5} valueLabel="3 of 5" variant="warning" aria-label="Risk level gauge">
        <GaugeChartCenter ref={centerRef}>
          <Text slot="value">3/5</Text>
          <Text slot="description">Risk Level</Text>
        </GaugeChartCenter>
        <GaugeChartRange ref={rangeRef}>
          {showRangeLabels && (
            <>
              <Text slot="min">Low</Text>
              <Text slot="max">High</Text>
            </>
          )}
        </GaugeChartRange>
      </GaugeChart>
    </Grid>
  );
}
