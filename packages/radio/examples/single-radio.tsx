import { Radio, RadioGroup } from '@bento/radio';
/* v8 ignore next */
import React, { type ComponentProps } from 'react';

export function SingleRadioExample(props: {
  groupProps?: Partial<ComponentProps<typeof RadioGroup>>;
  radioProps?: Partial<ComponentProps<typeof Radio>>;
}) {
  return (
    // Radios are always required to be in a group
    <RadioGroup label="Favorite fruit (single radio)" name="fruit" {...props.groupProps}>
      <Radio value="apple" {...props.radioProps}>
        Apple
      </Radio>
    </RadioGroup>
  );
}
