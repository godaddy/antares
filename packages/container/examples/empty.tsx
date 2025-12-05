import { Container, type ContainerProps } from '@bento/container';
/* v8 ignore next */
import React from 'react';

export function EmptyExample(args: ContainerProps) {
  return (
    <Container {...args}>
      {/* Backdrop overlay - no children needed */}
      <Container
        {...args}
        data-testid="backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Spacer element */}
      <Container data-testid="spacer" style={{ height: '20px' }} />

      {/* Decorative divider */}
      <Container
        data-testid="divider"
        as="hr"
        style={{
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '1rem 0'
        }}
      />
    </Container>
  );
}
