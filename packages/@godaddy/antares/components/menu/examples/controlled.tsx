import { Button, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';
import { useState } from 'react';

/**
 * `MenuTrigger` exposes its open state via `isOpen`/`onOpenChange`,
 * which can be used to drive the rotation of a chevron icon.
 * @order 2
 */
export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="primary">
        <Text>Options</Text>
        <Icon icon="chevron-down" flip={isOpen ? 'vertical' : undefined} />
      </Button>
      <Menu aria-label="Options">
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="delete">Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
