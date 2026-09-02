import { useState } from 'react';
import { Label, Select, SelectControl, SelectItem, SelectOptions, Text, type SelectKey } from '@godaddy/antares';

/**
 * Use `value` and `onChange` for controlled state.
 * @order 2
 */
export function ControlledExample() {
  const [value, setValue] = useState<SelectKey | null>('latte');

  return (
    <>
      <Select placeholder="Pick a drink" value={value} onChange={setValue}>
        <Label>Coffee</Label>
        <SelectControl />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
          <SelectItem id="americano">Americano</SelectItem>
          <SelectItem id="mocha">Mocha</SelectItem>
        </SelectOptions>
      </Select>
      <Text>
        <strong>Value:</strong> {String(value ?? '(none)')}
      </Text>
    </>
  );
}
