import { GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';

/** @ignore */
export function OverlappingDescriptionsExample({ count }: { count: 0 | 1 | 2 }) {
  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      <GaugeChart value={72} aria-label="Site health" aria-describedby="external-description">
        <GaugeChartCenter>
          {count > 0 && <Text slot="description">Current score.</Text>}
          {count > 1 && <Text slot="description">Previous score.</Text>}
        </GaugeChartCenter>
      </GaugeChart>
    </>
  );
}
