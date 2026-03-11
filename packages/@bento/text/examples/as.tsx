import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
