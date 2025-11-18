/* v8 ignore next */
import React, { useEffect, useState } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function UncontrolledWithTrigger() {
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Overlay defaultOpen={false}>
      {({ open }) => (
        <>
          <Button slot="trigger">Toggle Overlay</Button>
          {open && (
            <Portal mounted={mounted}>
              <ScrollLock />
              <FocusLock contain restoreFocus autoFocus>
                <Container
                  slot="backdrop"
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999
                  }}
                />
                <Container
                  slot="content"
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '500px',
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000
                  }}
                >
                  <Dismiss slot="dismiss-start" />
                  <Text as="h2" style={{ marginTop: 0 }}>
                    Uncontrolled Overlay
                  </Text>
                  <Text>
                    This overlay manages its own state internally. The trigger button uses the trigger slot to receive
                    toggle handlers from the Overlay component.
                  </Text>
                  <Text>Click the backdrop or use ESC to close.</Text>
                  <Dismiss slot="dismiss-end" />
                </Container>
              </FocusLock>
            </Portal>
          )}
        </>
      )}
    </Overlay>
  );
}
