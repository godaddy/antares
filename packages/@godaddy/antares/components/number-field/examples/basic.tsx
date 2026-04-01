import { NumberField, type NumberFieldProps } from '@godaddy/antares';

export function NumberFieldBasicExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}
