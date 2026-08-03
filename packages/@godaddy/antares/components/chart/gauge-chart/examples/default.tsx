import { GaugeChart } from '@godaddy/antares';

/**
 * A continuous gauge with a single label.
 * @order 1
 */
export function DefaultExample() {
  return <GaugeChart value={50} label="50%" aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }} />;
}
