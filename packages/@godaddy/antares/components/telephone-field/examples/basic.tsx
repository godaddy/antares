import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldBasicExample() {
  return (
    <TelephoneField
      label="Phone number"
      placeholder="555-555-5555"
      defaultCountry="us"
      countryLabel="Country code"
      description="We'll only call about your order."
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
      <SelectItem id="gb">GB +44</SelectItem>
    </TelephoneField>
  );
}
