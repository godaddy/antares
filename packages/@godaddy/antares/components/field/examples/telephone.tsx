import { Field, FieldDescription, FieldGroup, FieldInput, FieldLabel, FieldSelect, SelectItem } from '@godaddy/antares';

/**
 * A telephone number input paired with a country-code select.
 * @title Telephone field
 * @order 5
 */
export function TelephoneFieldExample() {
  return (
    <Field autoComplete="tel-national" inputMode="tel" type="tel">
      <FieldLabel>Phone number</FieldLabel>
      <FieldGroup>
        <FieldSelect aria-label="Country code" defaultValue="us">
          <SelectItem id="us">US +1</SelectItem>
          <SelectItem id="mx">MX +52</SelectItem>
          <SelectItem id="gb">GB +44</SelectItem>
        </FieldSelect>
        <FieldInput placeholder="555-555-5555" />
      </FieldGroup>
      <FieldDescription>We'll only call about your order.</FieldDescription>
    </Field>
  );
}
