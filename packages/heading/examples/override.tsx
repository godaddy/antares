import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function HeadingOverrideExample(args: HeadingProps) {
  return (
    <HeadingProvider>
      <Heading>Level 1</Heading>
      <HeadingProvider>
        <Heading>Level 2</Heading>
        <Heading level={1}>Level 1 (overridden)</Heading>
      </HeadingProvider>
    </HeadingProvider>
  );
}
