import { useState } from 'react';
import { Label, NumberField, Text } from '@godaddy/antares';

/**
 * Use `value` and `onChange` for controlled state.
 * @order 2
 */
export function ControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField minValue={0} maxValue={100} value={value} onChange={setValue}>
        <Label>Quantity</Label>
      </NumberField>
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}
