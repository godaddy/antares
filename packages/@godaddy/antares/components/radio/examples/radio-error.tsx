import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioErrorExample() {
  return (
    <RadioGroup label="Select shipping method" isRequired isInvalid errorMessage="Please select a shipping method">
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
      <Radio value="overnight">Overnight Shipping</Radio>
    </RadioGroup>
  );
}
