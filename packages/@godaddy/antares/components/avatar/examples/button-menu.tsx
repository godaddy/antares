import { Avatar, AvatarButton, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

/**
 * Use AvatarButton inside MenuTrigger for an account or profile menu. The open treatment is applied automatically.
 * @title Account menu
 * @order 8
 */
export function ButtonMenuExample() {
  return (
    <MenuTrigger>
      <AvatarButton aria-label="Account menu">
        <Avatar>
          <Text>UT</Text>
        </Avatar>
      </AvatarButton>
      <Menu>
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="settings">Settings</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
