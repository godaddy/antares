import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

export function BasicExample() {
  return (
    <MenuTrigger>
      <Button>Actions</Button>
      <Menu>
        <MenuItem id="new">New File</MenuItem>
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="save-as">Save As...</MenuItem>
        <MenuItem id="close">Close</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
