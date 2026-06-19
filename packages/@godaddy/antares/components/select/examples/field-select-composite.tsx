import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from '#components/field';
import { FieldSelect, SelectItem } from '../src';

/**
 * Composite field: an amount input and a currency {@link FieldSelect} sharing one
 * bordered box. The select carries its own provider and `aria-label`; the input fills
 * (`edge="start"`) and the select sits at the end (`edge="end"`).
 */
export function FieldSelectCompositeExample() {
  return (
    <Field>
      <FieldLabel id="price-label">Price</FieldLabel>
      <FieldGroup aria-labelledby="price-label">
        <Input edge="start" aria-label="Amount" placeholder="0.00" />
        <FieldSelect edge="end" aria-label="Currency" defaultSelectedKey="usd">
          <SelectItem id="usd">USD</SelectItem>
          <SelectItem id="eur">EUR</SelectItem>
          <SelectItem id="gbp">GBP</SelectItem>
        </FieldSelect>
      </FieldGroup>
      <FieldDescription>Enter an amount</FieldDescription>
    </Field>
  );
}
