import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * A required radio group with a payment method selection.
 * @title Required Indicator
 * @order 5
 */
export function RequiredExample() {
  return (
    <RadioGroup isRequired defaultValue="credit">
      <Label>Payment method</Label>
      <Group>
        <Radio value="credit">Credit Card</Radio>
        <Radio value="paypal">PayPal</Radio>
        <Radio value="bank">Bank Transfer</Radio>
      </Group>
    </RadioGroup>
  );
}
