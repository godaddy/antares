import { NumberField, type NumberFieldProps } from '@godaddy/antares';

/**
 * Minimal usage with label, placeholder, and min/max.
 * @title Basic
 * @order 1
 */
export function NumberFieldBasicExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}
