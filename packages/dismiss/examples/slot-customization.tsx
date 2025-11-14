/* v8 ignore next */
import React, { useState } from 'react';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Text } from '@bento/text';

export function SlotCustomization() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Container as="button" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Container>
      )}
      {isOpen && (
        <Container className="dialog" style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <Dismiss
            onDismiss={() => setIsOpen(false)}
            slots={{
              hidden: {
                className: 'custom-visually-hidden'
              }
            }}
          />
          <Text as="h2">Dialog with Slot Customization</Text>
          <Text>This dialog customizes the VisuallyHidden wrapper using slots.</Text>
          <Dismiss
            onDismiss={() => setIsOpen(false)}
            slots={{
              hidden: {
                className: 'custom-visually-hidden'
              }
            }}
          />
        </Container>
      )}
    </>
  );
}
