/* v8 ignore next */
import React, { useState } from 'react';
import { RadioGroup, Radio } from '@bento/radio';
import { Text } from '@bento/text';
import { FieldError } from '@bento/field-error';

export function ErrorHandlingExample() {
  const [value, setValue] = useState<string>();
  return (
    <RadioGroup value={value} onChange={setValue} isInvalid={value === 'banana'}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange">Orange</Radio>
      <FieldError slot="error">Error! banana selected</FieldError>
    </RadioGroup>
  );
}

export function ErrorHandlingExampleWithState() {
  const [value, setValue] = useState<string>();
  return (
    <RadioGroup value={value} onChange={setValue} isInvalid={value === 'banana' || value === 'orange'}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange">Orange</Radio>
      <FieldError slot="error">
        {/* @ts-ignore: Passing a function as a children is allowed but lacking type safety */}
        {function FieldError(args: any) {
          return args.slots.isInvalid && `Invalid fruit: ${value}`;
        }}
      </FieldError>
    </RadioGroup>
  );
}
