import { NumberField } from '@godaddy/antares';

/**
 * Use `hideStepper` to show only the input without +/- buttons.
 * @order 5
 */
export function NumberFieldHideStepperExample() {
  return (
    <NumberField
      label="Quantity"
      description="Enter a value between 0 and 100."
      placeholder="0"
      minValue={0}
      maxValue={100}
      hideStepper
    />
  );
}
