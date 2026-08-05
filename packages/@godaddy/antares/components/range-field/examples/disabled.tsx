import { RangeField } from '@godaddy/antares';

/**
 * Use `isDisabled` when the value is visible but unavailable for interaction.
 * @order 3
 */
export function DisabledExample() {
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
