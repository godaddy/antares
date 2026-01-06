/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Popover() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  function setTriggerRef(el: any) {
    triggerRef.current = el;
  }

  return (
    <Container style={{ position: 'relative' }}>
      <Button ref={setTriggerRef} onPress={() => setOpen(!open)}>
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
                  top: (triggerRef.current?.offsetTop ?? 0) + (triggerRef.current?.offsetHeight ?? 0) + 8,
                  left: triggerRef.current?.offsetLeft ?? 0,
                  padding: '1rem',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  minWidth: '200px'
                }}
              >
                <Text as="div">
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Popover Content</strong>
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
