import { RangeField } from '@godaddy/antares';

/**
 * Minimal usage with a single value and min/max bounds.
 * @order 1
 */
export function DefaultExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} />;
}
