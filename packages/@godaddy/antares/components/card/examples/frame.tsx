import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardSelectionIndicator, Text } from '@godaddy/antares';

/**
 * Cards portaled into an iframe document keep body activation.
 * @ignore
 */
export function FrameExample() {
  const [frameBody, setFrameBody] = useState<HTMLElement | null>(null);
  const [presses, setPresses] = useState(0);

  function attachFrame(frame: HTMLIFrameElement | null) {
    setFrameBody(frame?.contentDocument?.body ?? null);
  }

  return (
    <>
      <iframe ref={attachFrame} title="Card frame" width={400} height={300} />
      {frameBody &&
        createPortal(
          <>
            <Card aria-label="Framed action" onPress={() => setPresses((count) => count + 1)}>
              <Text>Framed action copy</Text>
            </Card>
            <Card selection="checkbox" aria-label="Framed selection">
              <Text>Framed selection copy</Text>
              <CardSelectionIndicator />
            </Card>
          </>,
          frameBody
        )}
      <Text>Framed activations: {presses}</Text>
    </>
  );
}
