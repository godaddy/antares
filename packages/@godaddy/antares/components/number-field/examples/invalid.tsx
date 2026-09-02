import { Button, FieldError, Group, Icon, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Use `isInvalid` with a `FieldError` for validation feedback.
 * @order 3
 */
export function NumberFieldInvalidExample() {
  return (
    <NumberField minValue={0} maxValue={100} isInvalid isRequired>
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
      <FieldError>Please enter a value between 0 and 100</FieldError>
    </NumberField>
  );
}
