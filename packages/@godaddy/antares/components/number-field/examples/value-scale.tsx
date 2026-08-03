import { NumberField } from '@godaddy/antares';

/**
 * Use `minValue`, `maxValue`, and `step` to set the allowed values. Steps are calculated from the minimum value.
 * @order 6
 */
export function NumberFieldValueScaleExample() {
  return (
    <NumberField
      label="Step value"
      description="Steps are from the minimum: minValue={2}, step={3} gives 2, 5, 8, 11, …"
      placeholder="2"
      minValue={2}
      maxValue={20}
      step={3}
    />
  );
}
