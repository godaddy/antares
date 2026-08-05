import { RangeField } from '@godaddy/antares';

/**
 * Use `markers` to expose a manageable set of discrete steps for a single value.
 * @order 6
 */
export function MarkersExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} step={10} markers />;
}
