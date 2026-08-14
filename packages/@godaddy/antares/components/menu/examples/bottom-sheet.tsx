import { Button, CloseButton, Content, Drawer, Menu, MenuGroup, MenuItem } from '@godaddy/antares';
import { useState } from 'react';

/**
 * On small screens a menu often reads better as a bottom sheet than an anchored
 * popover. Since `Menu` works standalone, drop it into a bottom `Drawer`.
 */
export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open menu
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable aria-label="Menu">
        <CloseButton />
        <Content inlinePadding="0">
          <Menu aria-label="Account actions" onAction={() => setOpen(false)}>
            <MenuGroup label="Account">
              <MenuItem id="profile">Profile</MenuItem>
              <MenuItem id="settings">Settings</MenuItem>
            </MenuGroup>
            <MenuGroup label="Session">
              <MenuItem id="logout">Log out</MenuItem>
            </MenuGroup>
          </Menu>
        </Content>
      </Drawer>
    </>
  );
}
