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

const accountImage =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20fill%3D%22%23111%22%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2243%22%20r%3D%2220%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M28%20108a36%2036%200%200%201%2072%200Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E';

/**
 * An avatar opens an account menu. The popover leads with the account details (photo, name, email, settings), then the account actions (profile, settings, logout).
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
            <Image src={accountImage} alt="" />
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
