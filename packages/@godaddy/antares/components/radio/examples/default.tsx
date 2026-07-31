import { Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group with a default selection.
 * @order 1
 */
export function DefaultExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="basic">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
