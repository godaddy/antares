import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

export function SingleSelectionExample() {
  const [sort, setSort] = useState<Selection>(new Set(['recent']));
  const selectedLabel = sort === 'all' ? 'all' : [...sort].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      <MenuTrigger>
        <Button variant="primary">Sort by</Button>
        <Menu aria-label="Sort by">
          <MenuGroup selectionMode="single" selectedKeys={sort} onSelectionChange={setSort}>
            <MenuItem id="recent">Most recent</MenuItem>
            <MenuItem id="name">Name</MenuItem>
            <MenuItem id="size">Size</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
      <Text>Selected: {selectedLabel || '-'}</Text>
    </Flex>
  );
}
