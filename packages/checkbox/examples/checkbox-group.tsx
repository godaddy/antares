/* v8 ignore next */
import React from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';

export function CheckboxGroupExample(args: React.ComponentProps<typeof CheckboxGroup>) {
  return (
    <CheckboxGroup label="Checkbox Group" name="checkbox-group-example" {...args}>
      <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
      <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
    </CheckboxGroup>
  );
}
