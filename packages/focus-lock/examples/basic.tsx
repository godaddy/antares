import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-button">
        Open Modal
      </Button>

      {isOpen && (
        <Container className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Single child receives data-focus-contained attribute */}
            <Container as="dialog" className="modal-content" data-testid="basic-modal">
              <Heading level={2}>Modal Title</Heading>
              <Text>Modal content with contained focus.</Text>
              <Button onClick={() => setIsOpen(false)} data-testid="close-button">
                Close
              </Button>
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
