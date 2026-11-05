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
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%2302242a%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22%2309757a%22/%3E%3Cpath d=%22M13 72c18-18 34-26 51-26s33 8 51 26v43H13z%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%2264%22 cy=%2253%22 r=%2220%22 fill=%22%23f5f7f8%22/%3E%3Cpath d=%22M35 106c4-17 15-26 29-26s25 9 29 26%22 fill=%22%23f5f7f8%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%22.35%22 stroke-width=%224%22/%3E%3C/svg%3E';

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
