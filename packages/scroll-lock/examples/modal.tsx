import { ScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState } from 'react';

export function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Scrollable page content */}
      <Container style={{ padding: '1rem' }}>
        <Text as="h1">Modal with Scroll Lock</Text>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Text>
          Click the button to open a modal. Notice how background scrolling is prevented when the modal is open.
        </Text>

        {/* Create enough content to require scrolling */}
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i} style={{ marginBottom: '0.5rem' }}>
            This is paragraph {i + 1}. This background content cannot be scrolled when the modal is open.
          </Text>
        ))}
      </Container>

      {/* Modal overlay - conditionally rendered */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <Container
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <span style={{ display: 'none' }}>backdrop</span>
          </Container>

          {/* Modal content */}
          <Container
            data-testid="modal-content"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <Text as="h2" style={{ marginTop: 0 }}>
              Modal Dialog
            </Text>
            <Text>Scroll lock is active. Background scrolling is prevented.</Text>
            <Text>This modal content can still be scrolled if it overflows:</Text>

            {/* Scrollable content within modal */}
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} style={{ marginBottom: '0.5rem' }}>
                Modal paragraph {i + 1}. This content can scroll within the modal.
              </Text>
            ))}

            <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem' }}>
              Close Modal
            </button>
          </Container>

          {/* ScrollLock prevents background scrolling */}
          <ScrollLock />
        </>
      )}
    </>
  );
}
