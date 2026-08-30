import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

/**
 * Compose with `children` to replace the stepper icons with your own content, such as text.
 * @order 9
 */
export function TextSteppersExample() {
  return (
    <NumberField defaultValue={1} minValue={0}>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" variant="control">
          decrement
        </Button>
        <Input />
        <Button slot="increment" variant="control">
          increment
        </Button>
      </Group>
      <Text slot="description">Use decrement and increment to change the value.</Text>
    </NumberField>
  );
}
