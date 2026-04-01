import { Menu, MenuItem, SubmenuTrigger } from '@godaddy/antares';
import { Button, MenuTrigger } from '@godaddy/antares';

export function MenuTriggerOneChild() {
  return (
    <MenuTrigger>
      <Button>Invalid</Button>
    </MenuTrigger>
  );
}

export function SubmenuTriggerOneChild() {
  return (
    <Menu>
      {/* @ts-expect-error intentional: testing single-child error */}
      <SubmenuTrigger>
        <MenuItem id="invalid">Invalid Submenu</MenuItem>
      </SubmenuTrigger>
    </Menu>
  );
}
