import { NumberField } from '@godaddy/antares';

/**
 * Use `isInvalid` with `errorMessage` for validation feedback.
 * @order 3
 */
export function NumberFieldInvalidExample() {
  return (
    <NumberField
      label="Quantity"
      minValue={0}
      maxValue={100}
      errorMessage="Please enter a value between 0 and 100"
      isInvalid
      isRequired
    />
  );
}
