import { RangeField } from '@godaddy/antares';

/**
 * Use the default presentation for one adjustable value on a continuous track.
 * @order 1
 */
export function RangeFieldDefaultExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} />;
}
