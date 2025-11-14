import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState, useEffect } from 'react';

export function BasicExample() {
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Portal mounted={mounted}>
      <Container data-testid="basic-portal">
        <Text>Portal content</Text>
      </Container>
    </Portal>
  );
}

