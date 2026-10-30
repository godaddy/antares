import {
  Avatar,
  Detail,
  Flex,
  Icon,
  Image,
  Menu,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover,
  Pressable,
  Switch,
  Text
} from '@godaddy/antares';

/**
 * An avatar opens an account menu. The popover leads with the account details (photo, name, email, settings), then the account actions (profile, settings, logout).
 * @title Account menu
 * @order 6
 */
export function AccountMenuExample() {
  return (
    <MenuTrigger>
      <Pressable aria-label="Account">
        <Avatar size="lg" role="button">
          <Text>JD</Text>
        </Avatar>
      </Pressable>
      <Popover aria-label="Account">
        <Flex direction="row" alignItems="stretch" gap="md" padding="md">
          <Avatar
            shape="square"
            style={{ alignSelf: 'stretch', inlineSize: 'auto', blockSize: '100%', aspectRatio: '1' }}
          >
            <Image src="https://placehold.co/128x128" alt="" />
          </Avatar>
          <Flex direction="column" gap="xs">
            <Text size="md">John Doe</Text>
            <Detail>john@example.com</Detail>
            <Switch size="sm">Dark theme</Switch>
          </Flex>
        </Flex>
        <Menu aria-label="Account">
          <MenuItem id="profile" textValue="Profile">
            <Avatar size="sm">
              <Text>JD</Text>
            </Avatar>
            <Text slot="label">Profile</Text>
          </MenuItem>
          <MenuItem id="my-account" textValue="My account">
            <Avatar size="sm">
              <Text>JD</Text>
            </Avatar>
            <Text slot="label">My account</Text>
          </MenuItem>
          <Separator />
          <MenuItem id="add" textValue="Add another account">
            <Icon icon="user-add" />
            <Text slot="label">Add another account</Text>
          </MenuItem>
          <MenuItem id="settings" textValue="Settings">
            <Icon icon="settings" />
            <Text slot="label">Settings</Text>
          </MenuItem>
          <MenuItem id="logout" textValue="Logout">
            <Icon icon="logout" />
            <Text slot="label">Logout</Text>
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
