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

export function Drawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Drawer</Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <ScrollLock />
            <Container
              slot="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}
              onClick={() => setOpen(false)}
            />
            <FocusLock contain restoreFocus autoFocus>
              <Container
                slot="content"
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '90%',
                  maxWidth: '400px',
                  padding: '2rem',
                  background: 'white',
                  boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                  overflowY: 'auto'
                }}
              >
                <Dismiss onDismiss={() => setOpen(false)} />
                <Text as="h2" style={{ marginTop: 0 }}>
                  Side Drawer
                </Text>
                <Text>This is a drawer that slides in from the right side of the screen.</Text>
                <Text>It uses the same overlay primitives as a modal but with different positioning.</Text>
                <Container style={{ marginTop: '2rem' }}>
                  <Text as="h3">Menu Items</Text>
                  <Container as="ul" style={{ listStyle: 'none', padding: 0 }}>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 1
                    </Text>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 2
                    </Text>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 3
                    </Text>
                  </Container>
                </Container>
                <Container style={{ marginTop: '2rem' }}>
                  <Button onPress={() => setOpen(false)}>Close Drawer</Button>
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
