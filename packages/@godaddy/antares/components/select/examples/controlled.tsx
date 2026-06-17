import { useState } from 'react';
import { Select, SelectItem, Text, type Key } from '@godaddy/antares';

export function SelectControlledExample() {
  const [value, setValue] = useState<Key | null>('latte');

  return (
    <>
      <Select label="Coffee" placeholder="Pick a drink" value={value} onChange={setValue}>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>
      <Text>
        <strong>Value:</strong> {String(value ?? '(none)')}
      </Text>
    </>
  );
}
