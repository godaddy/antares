import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
