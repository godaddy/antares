import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardGroup, CardSelectionIndicator, Text } from '@godaddy/antares';

/**
 * A CardGroup portaled into an iframe document keeps selection and row actions.
 * @ignore
 */
export function FrameExample() {
  const [frameBody, setFrameBody] = useState<HTMLElement | null>(null);
  const [actions, setActions] = useState(0);

  function attachFrame(frame: HTMLIFrameElement | null) {
    setFrameBody(frame?.contentDocument?.body ?? null);
  }

  return (
    <>
      <iframe ref={attachFrame} title="Card frame" width={400} height={300} />
      {frameBody &&
        createPortal(
          <>
            <CardGroup aria-label="Framed actions">
              <Card id="action" textValue="Framed action" onAction={() => setActions((count) => count + 1)}>
                <Text>Framed action copy</Text>
              </Card>
            </CardGroup>
            <CardGroup aria-label="Framed selection" selectionMode="multiple">
              <Card id="selection" textValue="Framed selection">
                <Text>Framed selection copy</Text>
                <CardSelectionIndicator />
              </Card>
            </CardGroup>
          </>,
          frameBody
        )}
      <Text>Framed activations: {actions}</Text>
    </>
  );
}
