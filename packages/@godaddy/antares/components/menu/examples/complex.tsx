import {
  Button,
  CheckboxIndicator,
  Header,
  Heading,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection
} from '@godaddy/antares';
import { useState } from 'react';

/**
 * Groups, icons, shortcuts, a link, and both kinds of selection.
 * @title Complex
 * @order 10
 */
export function ComplexExample() {
  const [appearance, setAppearance] = useState<Selection>(new Set(['system']));
  const [channels, setChannels] = useState<Selection>(new Set(['email']));

  return (
    <MenuTrigger>
      <Button variant="primary">Complex menu</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Complex">
          <MenuGroup>
            <Header>
              <Heading>My account</Heading>
            </Header>
            <IconItem id="profile" icon="user" shortcut="⇧⌘P">
              Profile
            </IconItem>
            <IconItem id="billing" icon="credit-card" shortcut="⌘B">
              Billing
            </IconItem>
            <IconItem id="settings" icon="settings" shortcut="⌘S">
              Settings
            </IconItem>
          </MenuGroup>
          <Separator />
          <MenuGroup>
            <Header>
              <Heading>Team</Heading>
            </Header>
            <IconItem id="team" icon="users2">
              Team
            </IconItem>
            <SubmenuTrigger>
              <MenuItem id="invite" textValue="Invite users">
                <Icon icon="user-add" />
                <Text slot="label">Invite users</Text>
                <Icon icon="chevron-right" />
              </MenuItem>
              <Popover aria-label="Menu">
                <Menu aria-label="Invite users">
                  <IconItem id="email" icon="mail">
                    Email
                  </IconItem>
                  <IconItem id="message" icon="chat">
                    Message
                  </IconItem>
                  <Separator />
                  <IconItem id="more" icon="plus">
                    More…
                  </IconItem>
                </Menu>
              </Popover>
            </SubmenuTrigger>
            <IconItem id="new-team" icon="plus" shortcut="⌘T">
              New team
            </IconItem>
          </MenuGroup>
          <Separator />
          <SubmenuTrigger>
            <MenuItem id="theme" textValue="Theme">
              <Icon icon="sun" />
              <Text slot="label">Theme</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu
                aria-label="Theme"
                selectionMode="single"
                selectedKeys={appearance}
                onSelectionChange={setAppearance}
              >
                <MenuGroup>
                  <Header>
                    <Heading>Header appearance</Heading>
                  </Header>
                  <SelectItem id="light">Light</SelectItem>
                  <SelectItem id="dark">Dark</SelectItem>
                  <SelectItem id="system">System</SelectItem>
                </MenuGroup>
              </Menu>
            </Popover>
          </SubmenuTrigger>
          <SubmenuTrigger>
            <MenuItem id="notifications" textValue="Notifications">
              <Icon icon="bell" />
              <Text slot="label">Notifications</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu
                aria-label="Notifications"
                selectionMode="multiple"
                selectedKeys={channels}
                onSelectionChange={setChannels}
              >
                <CheckItem id="email">Email</CheckItem>
                <CheckItem id="push">Push</CheckItem>
                <CheckItem id="sms">SMS</CheckItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
          <Separator />
          <MenuGroup aria-label="Help">
            <IconItem id="support" icon="help">
              Support
            </IconItem>
            <MenuItem
              id="docs"
              textValue="Documentation"
              href="https://example.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="link" />
              <Text slot="label">Documentation</Text>
            </MenuItem>
            <IconItem id="api" icon="cloud" isDisabled>
              API
            </IconItem>
          </MenuGroup>
          <Separator />
          <IconItem id="logout" icon="logout" shortcut="⇧⌘Q">
            Log out
          </IconItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function SelectItem({ id, children }: { id: string; children: string }) {
  return (
    <MenuItem id={id} textValue={children}>
      {({ isSelected }) => (
        <>
          <Text slot="label">{children}</Text>
          {isSelected ? <Icon icon="checkmark" /> : null}
        </>
      )}
    </MenuItem>
  );
}

function CheckItem({ id, children }: { id: string; children: string }) {
  return (
    <MenuItem id={id} textValue={children}>
      {({ isSelected }) => (
        <>
          <CheckboxIndicator isSelected={isSelected} />
          <Text slot="label">{children}</Text>
        </>
      )}
    </MenuItem>
  );
}

function IconItem({
  id,
  icon,
  shortcut,
  isDisabled,
  children
}: {
  id: string;
  icon: 'user' | 'credit-card' | 'settings' | 'users2' | 'plus' | 'mail' | 'chat' | 'help' | 'cloud' | 'logout';
  shortcut?: string;
  isDisabled?: boolean;
  children: string;
}) {
  return (
    <MenuItem id={id} textValue={children} isDisabled={isDisabled}>
      <Icon icon={icon} />
      <Text slot="label">{children}</Text>
      {shortcut ? (
        <Text slot={null} emphasis="passive">
          {shortcut}
        </Text>
      ) : null}
    </MenuItem>
  );
}
