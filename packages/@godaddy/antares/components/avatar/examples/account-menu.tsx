import { Avatar, Menu, MenuItem, MenuTrigger, Pressable, Text } from '@godaddy/antares';

/**
 * Wrap an Avatar in a Pressable inside MenuTrigger for an account or profile menu.
 * @title Account Menu
 * @order 8
 */
export function AccountMenuExample() {
  return (
    <MenuTrigger>
      <Pressable aria-label="Account menu">
        <Avatar role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
      <Menu>
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="settings">Settings</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
