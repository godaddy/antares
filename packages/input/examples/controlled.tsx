/* v8 ignore next */
import React, { useState } from 'react';
import { Input } from '@bento/input';

export function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={function ChangeEvent(e) {
        setValue(e.target.value);
      }}
      type="text"
      step={1}
    />
  );
}
