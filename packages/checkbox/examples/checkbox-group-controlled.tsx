/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';

export function CheckboxGroupControlledExample() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <CheckboxGroup label="Checkbox Group" value={selectedValues} onChange={setSelectedValues}>
      <Checkbox value="option1">Option 1</Checkbox>
      <Checkbox value="option2">Option 2</Checkbox>
      <Checkbox value="option3">Option 3</Checkbox>
    </CheckboxGroup>
  );
}
