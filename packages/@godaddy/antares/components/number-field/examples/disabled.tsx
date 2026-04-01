import { NumberField } from '@godaddy/antares';

export function NumberFieldDisabledExample() {
  return <NumberField label="Quantity" defaultValue={42} minValue={0} maxValue={100} isDisabled />;
}
