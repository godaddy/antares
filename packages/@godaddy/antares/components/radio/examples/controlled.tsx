import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

/**
 * A controlled radio group using `value` and `onChange`.
 * @order 2
 */
export function ControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <Label>Select your plan</Label>
        <Group>
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Group>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}
