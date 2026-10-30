import { Button, Menu, Popover, MenuItem, MenuTrigger } from '@godaddy/antares';

/**
 * Plain actions. Nothing is selected.
 * @title Default
 * @order 1
 */
export function DefaultExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Actions</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Actions">
          <MenuItem id="new">New file</MenuItem>
          <MenuItem id="open">Open…</MenuItem>
          <MenuItem id="save">Save</MenuItem>
          <MenuItem id="save-as">Save as…</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
