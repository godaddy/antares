import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function OverlayExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-overlay-button">
        Open Overlay
      </Button>

      {isOpen && (
        <Container className="overlay-root">
          {/* Backdrop - outside FocusLock so it renders */}
          <Container
            className="backdrop"
            data-slot="backdrop"
            onClick={() => setIsOpen(false)}
            data-testid="overlay-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              cursor: 'pointer',
              zIndex: 1000
            }}
          >
            {/* Non-empty content so Container renders */}
            <span style={{ display: 'none' }}>backdrop</span>
          </Container>
          <FocusLock contain restoreFocus autoFocus>
            {/* Content - receives data-focus-contained attribute */}
            <Container
              as="dialog"
              className="content"
              data-slot="content"
              data-testid="overlay-content"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                zIndex: 1001,
                minWidth: '300px'
              }}
            >
              <Heading level={2}>Overlay with Multiple Children</Heading>
              <Text>This overlay demonstrates how FocusLock works with a backdrop and content.</Text>
              <Text>Focus is trapped within the dialog content.</Text>
              <Button>First Button</Button>
              <Button onClick={() => setIsOpen(false)} data-testid="close-overlay-button">
                Close
              </Button>
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
