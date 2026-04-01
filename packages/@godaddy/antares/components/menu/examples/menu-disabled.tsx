import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <MenuTrigger>
      <Button>Actions</Button>
      <Menu>
        <MenuItem id="enabled">Enabled</MenuItem>
        <MenuItem id="disabled" isDisabled>
          Disabled
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
