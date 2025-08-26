/* v8 ignore next */
import React from 'react';
import { Checkbox } from '@bento/checkbox';

export function CheckboxExample(args: React.ComponentProps<typeof Checkbox>) {
  return (
    <Checkbox name="checkbox-example" value="checkbox-value" {...args}>
      Checkbox Label
    </Checkbox>
  );
}
