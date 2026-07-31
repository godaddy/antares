import { NumberField, type NumberFieldProps } from '@godaddy/antares';

/**
 * Minimal usage with label, placeholder, and min/max.
 * @order 1
 */
export function DefaultExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}
