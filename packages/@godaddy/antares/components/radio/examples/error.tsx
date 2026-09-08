import { FieldError, Group, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * An invalid required group displaying an error message.
 * @title Error State
 * @order 7
 */
export function ErrorExample() {
  return (
    <RadioGroup isRequired isInvalid>
      <Label>Select shipping method</Label>
      <Group>
        <Radio value="standard">Standard Shipping</Radio>
        <Radio value="express">Express Shipping</Radio>
        <Radio value="overnight">Overnight Shipping</Radio>
      </Group>
      <FieldError>Please select a shipping method</FieldError>
    </RadioGroup>
  );
}
