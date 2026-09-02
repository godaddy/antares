import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * A required radio group with a payment method selection.
 * @title Required Indicator
 * @order 5
 */
export function RadioRequiredExample() {
  return (
    <RadioGroup isRequired defaultValue="credit">
      <Label>Payment method</Label>
      <Flex direction="column" gap="md">
        <Radio value="credit">Credit Card</Radio>
        <Radio value="paypal">PayPal</Radio>
        <Radio value="bank">Bank Transfer</Radio>
      </Flex>
    </RadioGroup>
  );
}
