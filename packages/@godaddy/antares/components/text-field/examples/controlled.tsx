import { useState } from 'react';
import { Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Use `value` and `onChange` for controlled state.
 * @order 2
 */
export function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <>
      <TextField value={value} onChange={setValue}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}
