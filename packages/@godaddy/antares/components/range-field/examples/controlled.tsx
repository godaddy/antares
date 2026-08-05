import { Flex, RangeField } from '@godaddy/antares';
import { useState } from 'react';

/**
 * Use `onChange` for immediate updates and `onChangeEnd` for work that should run after interaction finishes.
 * @order 2
 */
export function ControlledExample() {
  const [value, setValue] = useState(50);
  const [committedValue, setCommittedValue] = useState(50);

  return (
    <Flex direction="column" gap="sm">
      <RangeField<number>
        aria-label="Volume"
        value={value}
        onChange={setValue}
        onChangeEnd={setCommittedValue}
        step={10}
      />
      <p>Current value: {value}</p>
      <p>Committed value: {committedValue}</p>
    </Flex>
  );
}
