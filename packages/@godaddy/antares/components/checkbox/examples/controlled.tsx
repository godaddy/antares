import { useState } from 'react';
import { Checkbox, CheckboxGroup, Label, Text } from '@godaddy/antares';

/**
 * Manage checkbox group state programmatically with controlled component pattern.
 * @title Controlled
 * @order 4
 */
export function ControlledExample() {
  const [selected, setSelected] = useState<string[]>(['baseball', 'tennis']);

  return (
    <CheckboxGroup value={selected} onChange={setSelected}>
      <Label>Favorite sports</Label>
      <Checkbox value="basketball">Basketball</Checkbox>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
      <Text slot="description">Select your favorite sports</Text>
    </CheckboxGroup>
  );
}
