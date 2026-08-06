import { RangeField } from '@godaddy/antares';

/**
 * Combine an input label, value label, range labels, and helper text when users need additional context.
 * @order 4
 */
export function LabelsExample() {
  return (
    <RangeField
      label="Price limit"
      defaultValue={50}
      formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      valueLabel
      minLabel="$0"
      maxLabel="$100"
      description="Choose the maximum price."
    />
  );
}
