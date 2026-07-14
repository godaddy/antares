import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldDisabledExample() {
  return (
    <TelephoneField
      label="Phone number"
      defaultCountry="us"
      countryLabel="Country code"
      defaultValue="555-555-5555"
      isDisabled
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
    </TelephoneField>
  );
}
