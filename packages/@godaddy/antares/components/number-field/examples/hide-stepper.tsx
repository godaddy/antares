import { NumberField } from '@godaddy/antares';

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
