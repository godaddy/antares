import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function OverlayExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocusEnter = () => console.log('Focus entered overlay');
  const handleFocusLeave = () => console.log('Focus left overlay');

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-overlay-button">
        Open Overlay
      </Button>

      {isOpen && (
        <Container className="overlay-root">
          <FocusLock
            contain
            restoreFocus
            autoFocus
            className={function renderClassName({ hasFocus, isContained }) {
              return `focus-lock contained-${isContained} focused-${hasFocus}`;
            }}
            style={function renderStyle({ hasFocus }) {
              return {
                content: `hasFocus: ${hasFocus}`,
                transition: 'opacity 0.2s'
              };
            }}
            onFocusEnter={handleFocusEnter}
            onFocusLeave={handleFocusLeave}
          >
            {/* Backdrop - receives data-focus-contained attribute */}
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
            />
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
              <Heading level={2}>Overlay with Render Props</Heading>
              <Text>This overlay demonstrates multiple children with render props for dynamic styling.</Text>
              <Text>Focus is trapped within this overlay. Both backdrop and content receive data attributes.</Text>
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
