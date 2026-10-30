import { Button, CloseButton, Content, Drawer, Header, Heading, Menu, MenuGroup, MenuItem } from '@godaddy/antares';
import { useState } from 'react';

/**
 * On a small screen the same menu can live in a bottom drawer instead of a popover.
 * @title Bottom Sheet
 * @order 7
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
            <MenuGroup>
              <Header>
                <Heading>Account</Heading>
              </Header>
              <MenuItem id="profile">Profile</MenuItem>
              <MenuItem id="settings">Settings</MenuItem>
            </MenuGroup>
            <MenuGroup>
              <Header>
                <Heading>Session</Heading>
              </Header>
              <MenuItem id="logout">Log out</MenuItem>
            </MenuGroup>
          </Menu>
        </Content>
      </Drawer>
    </>
  );
}
