import { GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';

/**
 * A continuous gauge with a value in the center.
 * @order 1
 */
export function DefaultExample() {
  return (
    <GaugeChart value={50} aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }}>
      <GaugeChartCenter>
        <Text slot="value">50%</Text>
      </GaugeChartCenter>
    </GaugeChart>
  );
}
