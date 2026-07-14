import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSelect, FieldInput, SelectItem } from '@godaddy/antares';

/**
 * Composite field: an amount input and a currency {@link FieldSelect} sharing one
 * bordered box. The select carries its own provider and `aria-label`; the input fills the
 * leading edge and the select sits at the end. The shared `FieldGroup` rounds the outer
 * corners by DOM order.
 */
export function FieldSelectCompositeExample() {
  return (
    <Field>
      <FieldLabel id="price-label">Price</FieldLabel>
      <FieldGroup aria-labelledby="price-label">
        <FieldInput aria-label="Amount" placeholder="12,231.67" />
        <FieldSelect aria-label="Currency" defaultValue="usd">
          <SelectItem id="usd">USD</SelectItem>
          <SelectItem id="eur">EUR</SelectItem>
          <SelectItem id="gbp">GBP</SelectItem>
          <SelectItem id="brl">BRL</SelectItem>
        </FieldSelect>
      </FieldGroup>
      <FieldDescription>Enter an amount</FieldDescription>
    </Field>
  );
}
