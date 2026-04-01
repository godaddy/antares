import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioRequiredExample() {
  return (
    <RadioGroup label="Payment method" isRequired defaultValue="credit">
      <Radio value="credit">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="bank">Bank Transfer</Radio>
    </RadioGroup>
  );
}
