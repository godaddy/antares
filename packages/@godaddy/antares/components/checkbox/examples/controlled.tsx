import { useState } from 'react';
import { Checkbox, CheckboxGroup, Flex, Label, Text } from '@godaddy/antares';

/**
 * Manage checkbox group state programmatically with controlled component pattern.
 * @title Controlled
 * @order 4
 */
export function CheckboxGroupControlledExample() {
  const [selected, setSelected] = useState<string[]>(['baseball', 'tennis']);

  return (
    <CheckboxGroup value={selected} onChange={setSelected}>
      <Label>Favorite sports</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="basketball">Basketball</Checkbox>
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="tennis">Tennis</Checkbox>
      </Flex>
      <Text slot="description">Select your favorite sports</Text>
    </CheckboxGroup>
  );
}
