import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';

/**
 * Example demonstrating Portal with React ARIA's UNSAFE_PortalProvider.
 *
 * This shows how Portal automatically integrates with react-aria's
 * UNSAFE_PortalProvider to use a custom container for portal content.
 */
export function PortalProviderExample() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <div ref={containerRef} data-testid="portal-container" />
      <UNSAFE_PortalProvider getContainer={() => containerRef.current}>
        <Portal mounted={mounted}>
          <Container data-testid="portal-provider-portal">
            <Text>Portal content using PortalProvider</Text>
            <Text>Container: {containerRef.current ? 'Custom via PortalProvider' : 'Default (document.body)'}</Text>
          </Container>
        </Portal>
      </UNSAFE_PortalProvider>
    </>
  );
}
