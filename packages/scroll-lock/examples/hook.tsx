import { useScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function HookExample() {
  // Use the hook directly for more control
  useScrollLock({ isDisabled: false });

  return (
    <Container data-testid="hook-content" style={{ padding: '1rem' }}>
      <Text as="h1">Using useScrollLock Hook</Text>
      <Text>This component uses the useScrollLock hook directly.</Text>
      <Text>Background scrolling is prevented while this component is mounted.</Text>

      {/* Create enough content to require scrolling */}
      {Array.from({ length: 50 }, (_, i) => (
        <Text key={i} style={{ marginBottom: '0.5rem' }} as="p">
          This is paragraph {i + 1}. The useScrollLock hook prevents scrolling of this content.
        </Text>
      ))}
    </Container>
  );
}
