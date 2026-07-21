import { useState } from 'react';
import { SelectItem, Text, TelephoneField, type SelectKey } from '@godaddy/antares';

export function TelephoneFieldControlledExample() {
  const [country, setCountry] = useState<SelectKey | null>('us');
  const [value, setValue] = useState('');

  return (
    <>
      <TelephoneField
        label="Phone number"
        placeholder="555-555-5555"
        countryLabel="Country code"
        country={country}
        onCountryChange={setCountry}
        value={value}
        onChange={setValue}
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
        <SelectItem id="gb">GB +44</SelectItem>
      </TelephoneField>
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}
