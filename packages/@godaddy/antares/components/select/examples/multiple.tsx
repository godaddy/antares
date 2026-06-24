import { useState } from 'react';
import { Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

export function SelectMultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select
        label="Coffees you like"
        placeholder="Pick one or more"
        selectionMode="multiple"
        value={value}
        onChange={setValue}
      >
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>
      <Text>
        <strong>Selected:</strong> {value.length === 0 ? '(none)' : value.join(', ')}
      </Text>
    </>
  );
}
