import { Radio, RadioGroup } from '@godaddy/antares';

/**
 * An invalid required group displaying an error message.
 * @title Error State
 * @order 7
 */
export function RadioErrorExample() {
  return (
    <RadioGroup label="Select shipping method" isRequired isInvalid errorMessage="Please select a shipping method">
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
      <Radio value="overnight">Overnight Shipping</Radio>
    </RadioGroup>
  );
}
