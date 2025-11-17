import { FocusLock } from '@bento/focus-lock';
/* v8 ignore next */
import React, { useState } from 'react';

export function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Single child receives data-focus-contained attribute */}
            <div className="modal-content" data-testid="basic-modal">
              <h2>Modal Title</h2>
              <p>Modal content with contained focus.</p>
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

