import { useState } from 'react';
import { ListBox, ListBoxItem, Text, type Key } from '@godaddy/antares';

export function ListBoxMultipleExample() {
  const [selectedKeys, setSelectedKeys] = useState<'all' | Set<Key>>(new Set(['latte', 'mocha']));

  return (
    <>
      <ListBox
        aria-label="Coffees you like"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys === 'all' ? 'all' : new Set(keys))}
      >
        <ListBoxItem id="espresso">Espresso</ListBoxItem>
        <ListBoxItem id="latte">Latte</ListBoxItem>
        <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
        <ListBoxItem id="americano">Americano</ListBoxItem>
        <ListBoxItem id="mocha">Mocha</ListBoxItem>
      </ListBox>
      <Text>
        <strong>Selected:</strong>{' '}
        {selectedKeys === 'all' ? '(all)' : selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}
      </Text>
    </>
  );
}
