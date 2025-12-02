import { Radio, RadioGroup } from '@bento/radio';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function UncontrolledExample() {
  return (
    <RadioGroup onChange={(value: string) => console.log('selected', value)}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange" isDisabled>
        Orange
      </Radio>
    </RadioGroup>
  );
}
