import { useState } from 'react';
import { Button, Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

/**
 * Use Removable Chips for user-added filters and tokens. Removing a Chip calls
 * the group callback so the owning collection can update its items.
 * @order 3
 */
export function RemovableChipsExample() {
  const [filters, setFilters] = useState([
    { id: 'austin', name: 'Austin', icon: 'map-pin' as const },
    { id: 'active', name: 'Active' }
  ]);

  return (
    <ChipGroup
      onRemove={function handleRemove(keys) {
        setFilters((current) => current.filter((item) => !keys.has(item.id)));
      }}
    >
      <Label>Applied filters</Label>
      <ChipList items={filters} renderEmptyState={() => 'No filters applied'}>
        {(item) => (
          <Chip id={item.id} textValue={item.name}>
            {'icon' in item && item.icon ? <Icon icon={item.icon} /> : null}
            <Text>{item.name}</Text>
            <Button slot="remove" />
          </Chip>
        )}
      </ChipList>
    </ChipGroup>
  );
}
