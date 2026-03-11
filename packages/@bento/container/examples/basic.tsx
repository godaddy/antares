import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function BasicExample(args: ContainerProps) {
  return <Container {...args}>Hello from Container</Container>;
}
