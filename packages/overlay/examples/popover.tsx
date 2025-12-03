/* v8 ignore next */
import React, { useState, useEffect } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

function getPosition(el: HTMLElement | null) {
  if (!el) return { top: 0, left: 0 };
  return { top: el.offsetTop + el.offsetHeight + 8, left: el.offsetLeft };
}

export function Popover() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);
  const { top, left } = getPosition(trigger);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Container style={{ position: 'relative' }}>
      <Button ref={setTrigger} onPress={() => setOpen(!open)}>
        Open Popover
      </Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <FocusLock contain restoreFocus autoFocus>
              <Container
                slot="content"
                style={{
                  position: 'absolute',
                  top,
                  left,
                  padding: '1rem',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  minWidth: '200px'
                }}
              >
                <Text as="div" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Popover Content
                </Text>
                <Text>
                  This is a non-modal popover. It doesn't use ScrollLock or a backdrop since it's meant to be
                  lightweight and non-blocking.
                </Text>
                <Container style={{ marginTop: '1rem' }}>
                  <Button onPress={() => setOpen(false)}>Close</Button>
                </Container>
              </Container>
            </FocusLock>
          </Portal>
        )}
      </Overlay>
    </Container>
  );
}
