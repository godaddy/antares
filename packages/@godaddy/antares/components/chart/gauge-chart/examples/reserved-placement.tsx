import { GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';

/** @ignore */
export function ReservedPlacementExample() {
  return (
    <GaugeChart value={50} aria-label="Reserved placement">
      {/* @ts-expect-error - The chart owns how the center region aligns its items. */}
      <GaugeChartCenter justifyItems="start">
        <Text slot="value">50%</Text>
      </GaugeChartCenter>
    </GaugeChart>
  );
}
