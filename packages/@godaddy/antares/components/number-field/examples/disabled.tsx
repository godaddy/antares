import { Button, Group, Icon, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent input.
 * @order 4
 */
export function NumberFieldDisabledExample() {
  return (
    <NumberField defaultValue={42} minValue={0} maxValue={100} isDisabled>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" variant="control">
          <Icon icon="minus" />
        </Button>
        <Input />
        <Button slot="increment" variant="control">
          <Icon icon="plus" />
        </Button>
      </Group>
    </NumberField>
  );
}
