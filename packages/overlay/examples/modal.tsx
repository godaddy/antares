/* v8 ignore next */
import React, { useState, useEffect } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Modal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Modal</Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <ScrollLock />
            <Container
              id="backdrop"
              slot="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}
            />
            <FocusLock contain restoreFocus autoFocus>
              <Container
                id="content"
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
                <Dismiss onDismiss={() => setOpen(false)} />
                <Text as="h2" style={{ marginTop: 0 }}>
                  Modal Dialog
                </Text>
                <Text>
                  This is a complete modal dialog with backdrop, focus lock, scroll lock, and dismiss buttons for screen
                  readers.
                </Text>
                <Text>Background scrolling is prevented, and focus is trapped within the modal.</Text>
                <Container style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button onPress={() => setOpen(false)}>Close</Button>
                  <Button onPress={() => alert('Action performed')}>Confirm</Button>
                </Container>
                <Dismiss onDismiss={() => setOpen(false)} />
              </Container>
            </FocusLock>
          </Portal>
        )}
      </Overlay>
    </>
  );
}
