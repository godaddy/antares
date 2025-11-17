import { FocusLock } from '@bento/focus-lock';
/* v8 ignore next */
import React, { useState } from 'react';

export function NestedExample() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOuterOpen(true)}>
        Open Outer Modal
      </button>

      {outerOpen && (
        <div className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Outer modal content */}
            <div className="modal-content" data-testid="outer-modal">
              <h2>Outer Modal</h2>
              <button type="button" onClick={() => setInnerOpen(true)}>
                Open Inner Modal
              </button>
              <button type="button" onClick={() => setOuterOpen(false)}>
                Close
              </button>

              {innerOpen && (
                <div className="modal-backdrop">
                  <FocusLock contain restoreFocus autoFocus>
                    {/* Inner modal content */}
                    <div className="modal-content" data-testid="inner-modal">
                      <h2>Inner Modal</h2>
                      <p>Focus is contained within this inner modal.</p>
                      <button type="button" onClick={() => setInnerOpen(false)}>
                        Close Inner
                      </button>
                    </div>
                  </FocusLock>
                </div>
              )}
            </div>
          </FocusLock>
        </div>
      )}
    </>
  );
}
