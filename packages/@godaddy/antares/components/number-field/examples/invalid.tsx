import { Button, FieldError, Group, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Use `isInvalid` with a `FieldError` for validation feedback.
 * @order 3
 */
export function InvalidExample() {
  return (
    <NumberField minValue={0} maxValue={100} isInvalid isRequired>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
      <FieldError>Please enter a value between 0 and 100</FieldError>
    </NumberField>
  );
}
