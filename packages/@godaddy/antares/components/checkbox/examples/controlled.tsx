import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Manage checkbox group state programmatically with controlled component pattern.
 * @title Controlled
 * @order 4
 */
export function CheckboxGroupControlledExample() {
  const [selected, setSelected] = useState<string[]>(['baseball', 'tennis']);

  return (
    <CheckboxGroup
      label="Favorite sports"
      description="Select your favorite sports"
      value={selected}
      onChange={setSelected}
    >
      <Checkbox value="basketball">Basketball</Checkbox>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
    </CheckboxGroup>
  );
}
