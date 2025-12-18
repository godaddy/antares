import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';

export function CustomContainerExample() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <div id="custom-portal-container" ref={containerRef} />
      <Portal container={containerRef.current || undefined} mounted={mounted}>
        <Container data-testid="custom-content">
          <Text>Custom container content</Text>
        </Container>
      </Portal>
    </>
  );
}
