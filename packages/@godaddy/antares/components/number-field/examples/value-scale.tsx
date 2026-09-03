import { Label, NumberField, Text } from '@godaddy/antares';

/**
 * Use `minValue`, `maxValue`, and `step` to set the allowed values. Steps are calculated from the minimum value.
 * @order 6
 */
export function ValueScaleExample() {
  return (
    <NumberField minValue={2} maxValue={20} step={3}>
      <Label>Step value</Label>
      <Text slot="description">
        Steps are from the minimum: minValue={'{2}'}, step={'{3}'} gives 2, 5, 8, 11, …
      </Text>
    </NumberField>
  );
}
