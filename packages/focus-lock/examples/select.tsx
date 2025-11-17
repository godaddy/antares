import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Container } from '@bento/container';
import { ListBox, ListBoxItem } from '@bento/listbox';
/* v8 ignore next */
import React, { useState } from 'react';

export function SelectExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelectionChange = function handleSelectionChange(keys: 'all' | Set<React.Key>) {
    if (keys !== 'all' && keys.size > 0) {
      const selectedKey = Array.from(keys)[0] as string;
      setSelected(selectedKey);
      setIsOpen(false);
    }
  };


  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>{selected || 'Select an option...'}</Button>

      {isOpen && (
        <FocusLock contain restoreFocus autoFocus>
          {/* Single child - popover container receives data-focus-contained attribute */}
          <Container as="aside" className="popover" data-slot="popover" data-testid="select-popover">
            <ListBox
              aria-label="Fruit selection"
              selectionMode="single"
              selectedKeys={selected ? new Set([selected]) : new Set()}
              onSelectionChange={handleSelectionChange}
            >
              <ListBoxItem id="apple">Apple</ListBoxItem>
              <ListBoxItem id="orange">Orange</ListBoxItem>
              <ListBoxItem id="banana">Banana</ListBoxItem>
            </ListBox>
          </Container>
        </FocusLock>
      )}
    </Container>
  );
}
