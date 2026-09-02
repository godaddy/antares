import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

/**
 * A controlled radio group using `value` and `onChange`.
 * @order 2
 */
export function RadioControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <Label>Select your plan</Label>
        <Flex direction="column" gap="md">
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Flex>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}
