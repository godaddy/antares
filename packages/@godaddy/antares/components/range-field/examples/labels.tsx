import { RangeField } from '@godaddy/antares';

export function RangeFieldLabelsExample() {
  return (
    <RangeField
      label="Price range"
      defaultValue={[25, 75]}
      thumbLabels={['Minimum price', 'Maximum price']}
      valueLabel
      minLabel="Low"
      maxLabel="High"
      description="Choose the minimum and maximum price."
    />
  );
}
