import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldInvalidExample() {
  return (
    <TelephoneField
      label="Phone number"
      defaultCountry="us"
      countryLabel="Country code"
      defaultValue="555"
      isInvalid
      isRequired
      errorMessage="Enter a valid phone number."
      description="We'll only call about your order."
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
    </TelephoneField>
  );
}
