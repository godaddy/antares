import { Radio, RadioGroup } from '@bento/radio';
/* v8 ignore next */
import React, { useState } from 'react';

export function ControlledExample() {
  const [value, setValue] = useState<string>();

  return (
    <RadioGroup label="Favorite fruit" value={value} onChange={setValue}>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange">Orange</Radio>
    </RadioGroup>
  );
}
