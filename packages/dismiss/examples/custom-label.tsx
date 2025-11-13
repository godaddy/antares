/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function CustomLabel() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Container as="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </Container>
    );
  }

  return (
    <Container className="dialog" style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <Dismiss onDismiss={() => setIsOpen(false)} ariaLabel="Close dialog" />
      <Text as="h2">Dialog with Custom Label</Text>
      <Text>This dialog uses a custom aria-label for the dismiss button.</Text>
      <Dismiss onDismiss={() => setIsOpen(false)} ariaLabel="Close dialog" />
    </Container>
  );
}

