import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

export function LinksExample() {
  return (
    <MenuTrigger>
      <Button>Navigation</Button>
      <Menu>
        <MenuItem id="dashboard" href="/dashboard">
          Dashboard
        </MenuItem>
        <MenuItem id="settings" href="/settings">
          Settings
        </MenuItem>
        <MenuItem id="external" href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
