import { useState } from 'react';
import { Checkbox, CheckboxGroup, FieldError, Label, Text } from '@godaddy/antares';

/**
 * Individual checkboxes within a group can be disabled while others remain interactive.
 * @title Disabled States
 * @order 6
 */
export function DisabledExample() {
  const [selected, setSelected] = useState<string[]>(['purple', 'red']);

  return (
    <CheckboxGroup value={selected} onChange={setSelected} isDisabled>
      <Label>Favorite colors</Label>
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
      <Checkbox value="purple">Purple</Checkbox>
      <Text slot="description">Choose your favorite color</Text>
      <FieldError>At least one color must be selected</FieldError>
    </CheckboxGroup>
  );
}
