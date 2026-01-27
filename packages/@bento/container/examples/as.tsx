import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: ContainerProps) {
  return (
    <Container {...args} as="article">
      This is an article element
    </Container>
  );
}
