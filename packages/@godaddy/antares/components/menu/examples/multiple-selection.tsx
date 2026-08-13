import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

/**
 * A `MenuGroup` with `selectionMode="multiple"` renders its items as checkboxes.
 * Drive the checked items with `selectedKeys` + `onSelectionChange` or
 * seed them uncontrolled with `defaultSelectedKeys`. Keys correspond to each
 * `MenuItem`'s `id`.
 */
export function MultipleSelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name', 'date']));
  const selectedLabel = columns === 'all' ? 'all' : [...columns].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      <MenuTrigger>
        <Button variant="primary">Columns</Button>
        <Menu aria-label="Columns">
          <MenuGroup selectionMode="multiple" selectedKeys={columns} onSelectionChange={setColumns}>
            <MenuItem id="name">Name</MenuItem>
            <MenuItem id="date">Date modified</MenuItem>
            <MenuItem id="size">Size</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
      <Text>Selected: {selectedLabel || '-'}</Text>
    </Flex>
  );
}
