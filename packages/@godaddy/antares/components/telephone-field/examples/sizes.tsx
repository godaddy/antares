import { Flex, SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TelephoneField
        label="Phone number (md)"
        defaultCountry="us"
        countryLabel="Country code"
        placeholder="555-555-5555"
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
      </TelephoneField>
      <TelephoneField
        label="Phone number (sm)"
        defaultCountry="us"
        countryLabel="Country code"
        placeholder="555-555-5555"
        size="sm"
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
      </TelephoneField>
    </Flex>
  );
}
