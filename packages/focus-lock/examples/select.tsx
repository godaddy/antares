import { FocusLock } from '@bento/focus-lock';
/* v8 ignore next */
import React, { useState } from 'react';

export function SelectExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const selectOption = function selectOption(option: string) {
    return function handleSelect() {
      setSelected(option);
      setIsOpen(false);
    };
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {selected || 'Select an option...'}
      </button>

      {isOpen && (
        <FocusLock contain restoreFocus autoFocus>
          {/* Single child - popover container receives data-focus-contained attribute */}
          <div className="popover" data-slot="popover" data-testid="select-popover">
            <ul role="listbox">
              <li role="option" tabIndex={0} onClick={selectOption('Apple')}>
                Apple
              </li>
              <li role="option" tabIndex={0} onClick={selectOption('Orange')}>
                Orange
              </li>
              <li role="option" tabIndex={0} onClick={selectOption('Banana')}>
                Banana
              </li>
            </ul>
          </div>
        </FocusLock>
      )}
    </div>
  );
}
