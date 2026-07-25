import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

export function SelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name', 'date']));
  const selectedLabel = columns === 'all' ? 'all' : [...columns].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      {/* Controlled: you own the state. */}
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

      {/* Uncontrolled: seed initial selections with defaultSelectedKeys. */}
      <MenuTrigger>
        <Button variant="primary">Filters</Button>
        <Menu aria-label="Filters">
          <MenuGroup selectionMode="multiple" defaultSelectedKeys={['unread']}>
            <MenuItem id="unread">Unread</MenuItem>
            <MenuItem id="flagged">Flagged</MenuItem>
            <MenuItem id="archived">Archived</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
    </Flex>
  );
}
