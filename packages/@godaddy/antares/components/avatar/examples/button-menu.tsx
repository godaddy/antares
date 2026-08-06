import { Avatar, Box, Button, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

/**
 * Wrap an Avatar in a ghost Button inside MenuTrigger for an account or profile menu.
 * @title Account menu
 * @order 8
 */
export function ButtonMenuExample() {
  return (
    <MenuTrigger>
      <Box as={Button} variant="ghost" aria-label="Account menu" rounding="full">
        <Avatar>
          <Text>UT</Text>
        </Avatar>
      </Box>
      <Menu>
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="settings">Settings</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
