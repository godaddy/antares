import { useState } from 'react';
import { ListBox, ListBoxItem, Text, type ListBoxKey } from '@godaddy/antares';

export function ListBoxControlledExample() {
  const [selectedKeys, setSelectedKeys] = useState<Set<ListBoxKey>>(new Set(['latte']));

  return (
    <>
      <ListBox
        aria-label="Coffee"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys === 'all' ? new Set() : new Set(keys))}
      >
        <ListBoxItem id="espresso">Espresso</ListBoxItem>
        <ListBoxItem id="latte">Latte</ListBoxItem>
        <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
        <ListBoxItem id="americano">Americano</ListBoxItem>
        <ListBoxItem id="mocha">Mocha</ListBoxItem>
      </ListBox>
      <Text>
        <strong>Value:</strong> {selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}
      </Text>
    </>
  );
}
