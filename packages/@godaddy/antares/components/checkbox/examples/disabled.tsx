import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Individual checkboxes within a group can be disabled while others remain interactive.
 * @title Disabled States
 * @order 6
 */
export function CheckboxGroupDisabledExample() {
  const [selected, setSelected] = useState<string[]>(['purple', 'red']);

  return (
    <CheckboxGroup
      label="Favorite colors"
      value={selected}
      onChange={setSelected}
      errorMessage="At least one color must be selected"
      description="Choose your favorite color"
      isDisabled
    >
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
      <Checkbox value="purple">Purple</Checkbox>
    </CheckboxGroup>
  );
}
