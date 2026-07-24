import { RangeField } from '@godaddy/antares';

export function RangeFieldRangeExample() {
  return (
    <RangeField
      aria-label="Price range"
      defaultValue={[25, 75]}
      thumbLabels={['Minimum price', 'Maximum price']}
      minValue={0}
      maxValue={100}
      step={25}
      markers
    />
  );
}
