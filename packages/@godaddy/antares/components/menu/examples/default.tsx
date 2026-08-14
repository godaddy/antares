import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

/**
 * A trigger with plain action items.
 * @order 1
 */
export function DefaultExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Actions</Button>
      <Menu aria-label="Actions">
        <MenuItem id="new">New file</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="save-as">Save as…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
