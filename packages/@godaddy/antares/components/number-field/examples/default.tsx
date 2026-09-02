import { Button, Group, Icon, Input, Label, NumberField, type NumberFieldProps } from '@godaddy/antares';

/**
 * Minimal usage with a `Label`, min/max, and stepper `Button`s.
 * @order 1
 */
export function DefaultExample({ defaultValue = 0 }: Pick<NumberFieldProps, 'defaultValue'> = {}) {
  return (
    <NumberField defaultValue={defaultValue} minValue={0} maxValue={100}>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" variant="control">
          <Icon icon="minus" />
        </Button>
        <Input placeholder="0" />
        <Button slot="increment" variant="control">
          <Icon icon="plus" />
        </Button>
      </Group>
    </NumberField>
  );
}
