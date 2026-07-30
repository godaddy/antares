import { RangeField } from '@godaddy/antares';

export function RangeFieldLabelsExample() {
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
