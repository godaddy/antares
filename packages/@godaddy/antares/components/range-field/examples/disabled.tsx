import { RangeField } from '@godaddy/antares';

export function RangeFieldDisabledExample() {
  return (
    <RangeField
      aria-label="Volume"
      label="Volume"
      description="This is a description"
      minLabel="Low"
      maxLabel="High"
      defaultValue={50}
      isDisabled
    />
  );
}
