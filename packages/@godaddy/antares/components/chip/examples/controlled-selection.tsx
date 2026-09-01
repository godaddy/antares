import { useState } from 'react';
import { Chip, ChipGroup, ChipList, Label, Text } from '@godaddy/antares';

const options = [
  { id: 'austin', name: 'Austin' },
  { id: 'active', name: 'Active' },
  { id: 'featured', name: 'Featured' }
];

/**
 * Use `selectedKeys` and `onSelectionChange` when another part of the page
 * needs to own the selected filter state.
 * @order 4
 */
export function ControlledSelectionExample() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['austin']));

  return (
    <>
      <ChipGroup
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={function handleSelectionChange(keys) {
          setSelectedKeys(
            keys === 'all' ? new Set(options.map((option) => option.id)) : new Set([...keys].map(String))
          );
        }}
      >
        <Label>Filters</Label>
        <ChipList>
          {options.map((option) => (
            <Chip key={option.id} id={option.id}>
              {option.name}
            </Chip>
          ))}
        </ChipList>
      </ChipGroup>
      <Text>Selected: {selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}</Text>
    </>
  );
}
