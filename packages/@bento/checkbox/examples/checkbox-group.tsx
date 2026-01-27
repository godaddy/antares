/* v8 ignore next */
import React from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';
import { FieldError } from '@bento/field-error';

export function CheckboxGroupExample(args: React.ComponentProps<typeof CheckboxGroup>) {
  return (
    <CheckboxGroup name="checkbox-group-example" {...args}>
      <Text slot="label">Checkbox Group</Text>
      <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
      <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
      <Text slot="description">Select your options</Text>
      <FieldError slot="error">This is an error message</FieldError>
    </CheckboxGroup>
  );
}
