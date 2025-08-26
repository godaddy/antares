/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox } from '@bento/checkbox';

export function CheckboxControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      name="checkbox-controlled-example"
      value="checkbox-controlled-value"
      isSelected={checked}
      onChange={setChecked}
    >
      Controlled Checkbox
    </Checkbox>
  );
}
