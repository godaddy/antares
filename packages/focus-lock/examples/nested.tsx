import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function NestedExample() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOuterOpen(true)} data-testid="open-outer-button">
        Open Outer Modal
      </Button>

      {outerOpen && (
        <Container className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Outer modal content */}
            <Container as="dialog" className="modal-content" data-testid="outer-modal">
              <Heading level={2}>Outer Modal</Heading>
              <Button onClick={() => setInnerOpen(true)} data-testid="open-inner-button">
                Open Inner Modal
              </Button>
              <Button onClick={() => setOuterOpen(false)} data-testid="close-outer-button">
                Close
              </Button>

              {innerOpen && (
                <Container className="modal-backdrop">
                  <FocusLock contain restoreFocus autoFocus>
                    {/* Inner modal content */}
                    <Container as="dialog" className="modal-content" data-testid="inner-modal">
                      <Heading level={2}>Inner Modal</Heading>
                      <Text>Focus is contained within this inner modal.</Text>
                      <Button onClick={() => setInnerOpen(false)} data-testid="close-inner-button">
                        Close Inner
                      </Button>
                    </Container>
                  </FocusLock>
                </Container>
              )}
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
