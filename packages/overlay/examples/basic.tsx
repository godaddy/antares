/* v8 ignore next */
import React, { useState } from 'react';
import { Overlay } from '@bento/overlay';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Overlay</Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Container
            slot="content"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '2rem',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              zIndex: 1000
            }}
          >
            <Text as="h2">Basic Overlay</Text>
            <Text>This is a simple overlay example using only the content slot.</Text>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </Container>
        )}
      </Overlay>
    </>
  );
}

