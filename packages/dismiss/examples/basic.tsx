/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function Basic() {
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
      <Dismiss onDismiss={() => setIsOpen(false)} />
      <Text as="h2">Dialog Title</Text>
      <Text>This is a dialog with dismiss controls at the start and end.</Text>
      <Container as="button" onClick={() => setIsOpen(false)}>
        Close
      </Container>
      <Dismiss onDismiss={() => setIsOpen(false)} />
    </Container>
  );
}

