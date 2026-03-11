/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';

export function CheckboxGroupControlledExample() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <CheckboxGroup value={selectedValues} onChange={setSelectedValues}>
      <Text slot="label">Checkbox Group</Text>
      <Checkbox value="option1">Option 1</Checkbox>
      <Checkbox value="option2">Option 2</Checkbox>
      <Checkbox value="option3">Option 3</Checkbox>
    </CheckboxGroup>
  );
}
