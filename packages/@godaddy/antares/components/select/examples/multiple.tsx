import { useState } from 'react';
import { Label, Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

/**
 * Set `selectionMode="multiple"` to allow multiple values. `value` is an array of keys.
 * @order 3
 */
export function MultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select placeholder="Pick one or more" selectionMode="multiple" value={value} onChange={setValue}>
        <Label>Coffees you like</Label>
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
