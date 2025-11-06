/* v8 ignore next */
import React, { useState } from 'react';
import { Select } from '@bento/select';
import { ListBoxItem } from '@bento/listbox';

/**
 * Example component demonstrating controlled Select usage.
 *
 * @returns {JSX.Element} The rendered controlled Select.
 * @public
 */
export function SelectControlledExample() {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

  return (
    <div>
      <Select
        aria-label="Choose a fruit"
        placeholder="Select a fruit"
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(key as string)}
      >
        <ListBoxItem id="apple" textValue="Apple">
          Apple
        </ListBoxItem>
        <ListBoxItem id="banana" textValue="Banana">
          Banana
        </ListBoxItem>
        <ListBoxItem id="orange" textValue="Orange">
          Orange
        </ListBoxItem>
      </Select>
      <p>Selected: {selectedKey || 'None'}</p>
    </div>
  );
}
