import { Group, Input, Label, NumberField, Text } from '@godaddy/antares';

/**
 * Compose without stepper `Button`s for a plain numeric input.
 * @order 5
 */
export function NumberFieldHideStepperExample() {
  return (
    <NumberField minValue={0} maxValue={100}>
      <Label>Quantity</Label>
      <Group>
        <Input placeholder="0" />
      </Group>
      <Text slot="description">Enter a value between 0 and 100.</Text>
    </NumberField>
  );
}
