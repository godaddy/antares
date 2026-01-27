import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function NestedExample(args: ContainerProps) {
  return (
    <Container {...args} as="main">
      <Container as="header">Header</Container>
      <Container as="section">Main content</Container>
      <Container as="footer">Footer</Container>
    </Container>
  );
}
