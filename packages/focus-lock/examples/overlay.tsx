import { FocusLock } from '@bento/focus-lock';
/* v8 ignore next */
import React, { useState } from 'react';

export function OverlayExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocusEnter = () => console.log('Focus entered overlay');
  const handleFocusLeave = () => console.log('Focus left overlay');

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Overlay
      </button>

      {isOpen && (
        <div className="overlay-root">
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
            <div
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
            <div
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
              <h2>Overlay with Render Props</h2>
              <p>This overlay demonstrates multiple children with render props for dynamic styling.</p>
              <p>Focus is trapped within this overlay. Both backdrop and content receive data attributes.</p>
              <button type="button">First Button</button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </FocusLock>
        </div>
      )}
    </>
  );
}
