import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

/**
 * A `MenuGroup` with `selectionMode="single"` lets one item be selected at a time.
 * Drive it with `selectedKeys` + `onSelectionChange` or seed it uncontrolled with
 * `defaultSelectedKeys`. Keys correspond to each `MenuItem`'s `id`.
 */
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
