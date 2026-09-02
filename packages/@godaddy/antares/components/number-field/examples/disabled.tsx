import { Button, Group, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent input.
 * @order 4
 */
export function DisabledExample() {
  return (
    <NumberField defaultValue={42} minValue={0} maxValue={100} isDisabled>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
    </NumberField>
  );
}
