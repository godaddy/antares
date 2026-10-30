import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Bm4GL0Je.js";import{_ as l,a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,m as v,n as y,o as b,p as x,r as S,s as C,t as w,u as T,v as E}from"./menu.stories-PYuZEUyK.js";function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(s,{of:E,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`menu`,children:`Menu`}),`
`,(0,k.jsx)(t.p,{children:`Menu lists actions or options opened from a trigger or placed in a drawer. Supports composable rows, selection modes, and nested submenus.`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`MenuTrigger`}),` wraps a trigger element and a `,(0,k.jsx)(t.code,{children:`Popover`}),` containing `,(0,k.jsx)(t.code,{children:`Menu`}),`. The menu is fully keyboard-navigable, supports typeahead search, and handles open/close state automatically. The trigger applies `,(0,k.jsx)(t.code,{children:`hideArrow`}),` and card styling to all popovers, including nested submenus.`]}),`
`,(0,k.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Trigger and popover`}),`: `,(0,k.jsx)(t.code,{children:`MenuTrigger`}),` wraps any trigger and opens a `,(0,k.jsx)(t.code,{children:`Popover`}),` with automatic card styling and hidden arrow. Use for desktop; use `,(0,k.jsx)(t.code,{children:`Drawer`}),` for mobile.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Menu title and groups`}),`: Place an optional `,(0,k.jsx)(t.code,{children:`Heading`}),` as a sibling to `,(0,k.jsx)(t.code,{children:`Menu`}),` (not `,(0,k.jsx)(t.code,{children:`slot="title"`}),`). Use `,(0,k.jsx)(t.code,{children:`MenuGroup`}),` + `,(0,k.jsx)(t.code,{children:`Header`}),` + `,(0,k.jsx)(t.code,{children:`Heading`}),` for section labels; group headings are presentational.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Composable rows`}),`: Each `,(0,k.jsx)(t.code,{children:`MenuItem`}),` renders a string label or composed content (icons, checkboxes). Use render props (`,(0,k.jsx)(t.code,{children:`isSelected`}),`, `,(0,k.jsx)(t.code,{children:`selectionMode`}),`) and pass `,(0,k.jsx)(t.code,{children:`textValue`}),` for typeahead.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,k.jsx)(t.code,{children:`selectionMode="single"`}),` or `,(0,k.jsx)(t.code,{children:`"multiple"`}),` on `,(0,k.jsx)(t.code,{children:`Menu`}),` or per-`,(0,k.jsx)(t.code,{children:`MenuGroup`}),`. Use controlled state or `,(0,k.jsx)(t.code,{children:`defaultSelectedKeys`}),` for uncontrolled menus.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Separators and submenus`}),`: `,(0,k.jsx)(t.code,{children:`Separator`}),` divides items. `,(0,k.jsx)(t.code,{children:`SubmenuTrigger`}),` nests a `,(0,k.jsx)(t.code,{children:`Popover`}),` + `,(0,k.jsx)(t.code,{children:`Menu`}),` for hierarchies.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Popover or drawer`}),`: Open from `,(0,k.jsx)(t.code,{children:`MenuTrigger`}),` for positioned overlays, or place `,(0,k.jsx)(t.code,{children:`Menu`}),` in a `,(0,k.jsx)(t.code,{children:`Drawer`}),` for full-screen/mobile.`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,k.jsx)(t.p,{children:`Plain actions. Nothing is selected.`}),`
`,(0,k.jsx)(a,{of:g,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Menu, Popover, MenuItem, MenuTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Actions</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Actions">
          <MenuItem id="new">New file</MenuItem>
          <MenuItem id="open">Open…</MenuItem>
          <MenuItem id="save">Save</MenuItem>
          <MenuItem id="save-as">Save as…</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`submenu`,children:`Submenu`}),`
`,(0,k.jsx)(t.p,{children:`Two levels, and nothing is selected. Hover the submenu row, or press Arrow Right, to open it.`}),`
`,(0,k.jsx)(a,{of:v,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Icon, Menu, MenuItem, MenuTrigger, Popover, SubmenuTrigger, Text } from '@godaddy/antares';

export function SubmenuExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Share</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Share">
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="cut">Cut</MenuItem>
          <SubmenuTrigger>
            <MenuItem id="share" textValue="Share">
              <Text slot="label">Share</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu aria-label="Share with">
                <MenuItem id="email">Email</MenuItem>
                <MenuItem id="sms">SMS</MenuItem>
                <MenuItem id="link">Copy link</MenuItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`single-selection`,children:`Single selection`}),`
`,(0,k.jsx)(t.p,{children:`Two levels. One row stays selected in the menu, and one row stays selected in the submenu.`}),`
`,(0,k.jsx)(a,{of:x,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
  Button,
  Icon,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Text,
  type Selection
} from '@godaddy/antares';
import { useState } from 'react';

export function SingleSelectionExample() {
  const [view, setView] = useState<Selection>(new Set(['rulers']));
  const [guides, setGuides] = useState<Selection>(new Set(['layout']));

  return (
    <MenuTrigger>
      <Button variant="primary">View</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="View" selectionMode="single" selectedKeys={view} onSelectionChange={setView}>
          <SelectItem id="grid">Pixel grid</SelectItem>
          <SelectItem id="rulers">Rulers</SelectItem>
          <SelectItem id="comments" isDisabled>
            Comments
          </SelectItem>
          <SubmenuTrigger>
            <MenuItem id="guides" textValue="Guides">
              <Text slot="label">Guides</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu aria-label="Guides" selectionMode="single" selectedKeys={guides} onSelectionChange={setGuides}>
                <SelectItem id="layout">Layout</SelectItem>
                <SelectItem id="columns">Columns</SelectItem>
                <SelectItem id="baseline">Baseline</SelectItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function SelectItem({ id, isDisabled, children }: { id: string; isDisabled?: boolean; children: string }) {
  return (
    <MenuItem id={id} textValue={children} isDisabled={isDisabled}>
      {({ isSelected }) => (
        <>
          <Text slot="label">{children}</Text>
          {isSelected ? <Icon icon="checkmark" /> : null}
        </>
      )}
    </MenuItem>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple selection`}),`
`,(0,k.jsx)(t.p,{children:`Three levels of checkboxes. Groups label the columns and filters, one row pairs an icon with its checkbox, and the details submenu shows a partial selection.`}),`
`,(0,k.jsx)(a,{of:_,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
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

const detailIds = ['owner', 'type'] as const;

export function MultipleSelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name']));
  const [details, setDetails] = useState<Selection>(new Set(['owner']));
  const [tags, setTags] = useState<Selection>(new Set(['published']));
  const selectedDetailCount = details === 'all' ? detailIds.length : detailIds.filter((id) => details.has(id)).length;
  const detailsAllSelected = selectedDetailCount === detailIds.length;
  const detailsSomeSelected = selectedDetailCount > 0 && !detailsAllSelected;

  return (
    <MenuTrigger>
      <Button variant="primary">Columns</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Columns" selectionMode="multiple" selectedKeys={columns} onSelectionChange={setColumns}>
          <MenuGroup>
            <Header>
              <Heading>Columns</Heading>
            </Header>
            <CheckItem id="name">Name</CheckItem>
            <CheckItem id="date">Date modified</CheckItem>
            <CheckItem id="size" icon="database">
              Size
            </CheckItem>
          </MenuGroup>
          <Separator />
          <MenuGroup>
            <Header>
              <Heading>Filters</Heading>
            </Header>
            <SubmenuTrigger>
              <MenuItem id="details" textValue="Details">
                <CheckboxIndicator isSelected={detailsAllSelected} isIndeterminate={detailsSomeSelected} />
                <Text slot="label">Details</Text>
                <Icon icon="chevron-right" />
              </MenuItem>
              <Popover aria-label="Menu">
                <Menu
                  aria-label="Details"
                  selectionMode="multiple"
                  selectedKeys={details}
                  onSelectionChange={setDetails}
                >
                  <CheckItem id="owner">Owner</CheckItem>
                  <CheckItem id="type">Type</CheckItem>
                  <SubmenuTrigger>
                    <MenuItem id="tags" textValue="Tags">
                      <Text slot="label">Tags</Text>
                      <Icon icon="chevron-right" />
                    </MenuItem>
                    <Popover aria-label="Menu">
                      <Menu aria-label="Tags" selectionMode="multiple" selectedKeys={tags} onSelectionChange={setTags}>
                        <CheckItem id="published">Published</CheckItem>
                        <CheckItem id="draft">Draft</CheckItem>
                        <CheckItem id="archived" isDisabled>
                          Archived
                        </CheckItem>
                      </Menu>
                    </Popover>
                  </SubmenuTrigger>
                </Menu>
              </Popover>
            </SubmenuTrigger>
          </MenuGroup>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function CheckItem({
  id,
  icon,
  isDisabled,
  children
}: {
  id: string;
  icon?: 'database';
  isDisabled?: boolean;
  children: string;
}) {
  return (
    <MenuItem id={id} textValue={children} isDisabled={isDisabled}>
      {({ isSelected }) => (
        <>
          <CheckboxIndicator isSelected={isSelected} />
          {icon ? <Icon icon={icon} /> : null}
          <Text slot="label">{children}</Text>
        </>
      )}
    </MenuItem>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`title-and-groups`,children:`Title and groups`}),`
`,(0,k.jsxs)(t.p,{children:[`A title sits beside the menu. Use `,(0,k.jsx)(t.code,{children:`MenuGroup`}),` and `,(0,k.jsx)(t.code,{children:`Header`}),` with `,(0,k.jsx)(t.code,{children:`Heading`}),` to label sections of items, separated by `,(0,k.jsx)(t.code,{children:`Separator`}),`.`]}),`
`,(0,k.jsx)(a,{of:m,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
  Box,
  Button,
  Header,
  Heading,
  Menu,
  MenuGroup,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover
} from '@godaddy/antares';

export function TitleAndGroupsExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Publish</Button>
      <Popover aria-label="Menu">
        <Box blockPaddingStart="md" inlinePadding="lg">
          <Heading size="md">Menu Title</Heading>
        </Box>
        <Menu aria-label="Publish">
          <MenuGroup>
            <Header>
              <Heading>Export</Heading>
            </Header>
            <MenuItem id="image">Image…</MenuItem>
            <MenuItem id="video">Video…</MenuItem>
            <MenuItem id="text">Text…</MenuItem>
          </MenuGroup>
          <Separator />
          <MenuGroup>
            <Header>
              <Heading>Share</Heading>
            </Header>
            <MenuItem id="youtube">YouTube…</MenuItem>
            <MenuItem id="instagram">Instagram…</MenuItem>
            <MenuItem id="email">Email…</MenuItem>
          </MenuGroup>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`account-menu`,children:`Account menu`}),`
`,(0,k.jsx)(t.p,{children:`An avatar opens an account menu. The popover leads with the account details (photo, name, email, settings), then the account actions (profile, settings, logout).`}),`
`,(0,k.jsx)(a,{of:w,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
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
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,k.jsx)(t.p,{children:`On a small screen the same menu can live in a bottom drawer instead of a popover.`}),`
`,(0,k.jsx)(a,{of:y,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, CloseButton, Content, Drawer, Header, Heading, Menu, MenuGroup, MenuItem } from '@godaddy/antares';
import { useState } from 'react';

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
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`links`,children:`Links`}),`
`,(0,k.jsxs)(t.p,{children:[`A row with `,(0,k.jsx)(t.code,{children:`href`}),` is a link. The menu still closes after it is chosen.`]}),`
`,(0,k.jsx)(a,{of:u,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Menu, MenuItem, MenuTrigger, Popover } from '@godaddy/antares';

export function LinksExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Links</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Links">
          <MenuItem id="docs" href="https://example.com/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </MenuItem>
          <MenuItem id="blog" href="https://example.com/blog" target="_blank" rel="noopener noreferrer">
            Blog
          </MenuItem>
          <MenuItem id="support" href="https://example.com/support" target="_blank" rel="noopener noreferrer">
            Support
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`open-from-dialog`,children:`Open from dialog`}),`
`,(0,k.jsx)(t.p,{children:`The menu trigger lives in a dialog. Opening the menu leaves the dialog in place.`}),`
`,(0,k.jsx)(a,{of:T,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
  Button,
  CloseButton,
  Content,
  Heading,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  ModalTrigger,
  Popover
} from '@godaddy/antares';

export function OpenFromDialogExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open dialog</Button>
      <Modal>
        <Heading slot="title">Edit file</Heading>
        <CloseButton />
        <Content>
          <MenuTrigger>
            <Button>Open menu</Button>
            <Popover aria-label="Menu">
              <Menu aria-label="File">
                <MenuItem id="new-text">New text file</MenuItem>
                <MenuItem id="new-file">New file…</MenuItem>
                <MenuItem id="new-window">New window</MenuItem>
                <MenuItem id="open-file">Open file…</MenuItem>
                <MenuItem id="export">Export</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </Content>
      </Modal>
    </ModalTrigger>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`complex`,children:`Complex`}),`
`,(0,k.jsx)(t.p,{children:`Groups, icons, shortcuts, a link, and both kinds of selection.`}),`
`,(0,k.jsx)(a,{of:S,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
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
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,k.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,k.jsxs)(t.table,{children:[(0,k.jsx)(t.thead,{children:(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.th,{children:`Key`}),(0,k.jsx)(t.th,{children:`Action`})]})}),(0,k.jsxs)(t.tbody,{children:[(0,k.jsxs)(t.tr,{children:[(0,k.jsxs)(t.td,{children:[(0,k.jsx)(t.code,{children:`Enter`}),` / `,(0,k.jsx)(t.code,{children:`Space`})]}),(0,k.jsx)(t.td,{children:`Activates the focused item`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsxs)(t.td,{children:[(0,k.jsx)(t.code,{children:`Arrow Up`}),` / `,(0,k.jsx)(t.code,{children:`Down`})]}),(0,k.jsx)(t.td,{children:`Moves focus between items`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsxs)(t.td,{children:[(0,k.jsx)(t.code,{children:`Home`}),` / `,(0,k.jsx)(t.code,{children:`End`})]}),(0,k.jsx)(t.td,{children:`Jumps to the first or last item`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.td,{children:(0,k.jsx)(t.code,{children:`Arrow Right`})}),(0,k.jsx)(t.td,{children:`Opens the submenu (if present)`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.td,{children:(0,k.jsx)(t.code,{children:`Arrow Left`})}),(0,k.jsx)(t.td,{children:`Closes the submenu and returns focus`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.td,{children:(0,k.jsx)(t.code,{children:`Escape`})}),(0,k.jsx)(t.td,{children:`Closes the menu (or submenu)`})]}),(0,k.jsxs)(t.tr,{children:[(0,k.jsx)(t.td,{children:`Typeahead (letters)`}),(0,k.jsx)(t.td,{children:`Jumps to the item matching the typed letter`})]})]})]}),`
`,(0,k.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Menu accessible name`}),`: Set `,(0,k.jsx)(t.code,{children:`aria-label`}),` on the `,(0,k.jsx)(t.code,{children:`<Menu>`}),` to name the list (e.g., "Actions", "Share with"). This is separate from any `,(0,k.jsx)(t.code,{children:`Heading`}),` title in the popover.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Roles`}),`: Single-select items use `,(0,k.jsx)(t.code,{children:`menuitemradio`}),`; multiple-select use `,(0,k.jsx)(t.code,{children:`menuitemcheckbox`}),`. Unselectable items use `,(0,k.jsx)(t.code,{children:`menuitem`}),`.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Selection indicators are decorative`}),`: A checkbox, radio check, or chevron-right icon is purely visual. The item owns the `,(0,k.jsx)(t.code,{children:`aria-checked`}),` state.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Group headings`}),`: The group `,(0,k.jsx)(t.code,{children:`Heading`}),` receives `,(0,k.jsx)(t.code,{children:`role="presentation"`}),` automatically and acts as a label for the group, not a real heading level.`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Title placement`}),`: Place an optional `,(0,k.jsx)(t.code,{children:`Heading`}),` as a sibling to `,(0,k.jsx)(t.code,{children:`Menu`}),`, not wrapped inside (do not use `,(0,k.jsx)(t.code,{children:`slot="title"`}),`; see "Title and groups" example).`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Menu name`}),`: Set `,(0,k.jsx)(t.code,{children:`aria-label`}),` on `,(0,k.jsx)(t.code,{children:`<Menu>`}),` to name the list ("Actions", "Share with", "Theme").`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Stable IDs`}),`: Give each `,(0,k.jsx)(t.code,{children:`MenuItem`}),` a unique `,(0,k.jsx)(t.code,{children:`id`}),` for React tracking across re-renders.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Typeahead`}),`: For composed labels (icons, checkboxes), provide `,(0,k.jsx)(t.code,{children:`textValue`}),` to `,(0,k.jsx)(t.code,{children:`MenuItem`}),` for typeahead search.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Selection modes`}),`: Set `,(0,k.jsx)(t.code,{children:`selectionMode`}),` on `,(0,k.jsx)(t.code,{children:`Menu`}),` (all items) or per-`,(0,k.jsx)(t.code,{children:`MenuGroup`}),` (only group). Use controlled state for tracking.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Submenus`}),`: Use `,(0,k.jsx)(t.code,{children:`SubmenuTrigger`}),` with `,(0,k.jsx)(t.code,{children:`chevron-right`}),` icon. Keyboard navigation is automatic.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Mobile`}),`: Replace `,(0,k.jsx)(t.code,{children:`MenuTrigger`}),` + `,(0,k.jsx)(t.code,{children:`Popover`}),` with `,(0,k.jsx)(t.code,{children:`Drawer`}),` on narrow viewports; reuse the same `,(0,k.jsx)(t.code,{children:`Menu`}),`.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Avoid complex content`}),`: Forms, date pickers, and multi-line content belong in a separate overlay, not in menu items.`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<MenuTrigger>
  <Button />
  <Popover>
    <Heading />
    <Menu>
      <MenuItem />
      <Separator />
      <MenuGroup>
        <Header>
          <Heading />
        </Header>
        <MenuItem />
      </MenuGroup>
      <SubmenuTrigger>
        <MenuItem />
        <Popover>
          <Menu>
            <MenuItem />
          </Menu>
        </Popover>
      </SubmenuTrigger>
      {/* ... */}
    </Menu>
  </Popover>
</MenuTrigger>
`})}),`
`,(0,k.jsx)(t.h3,{id:`menu-1`,children:`Menu`}),`
`,(0,k.jsx)(o,{of:f}),`
`,(0,k.jsx)(t.h3,{id:`menutrigger`,children:`MenuTrigger`}),`
`,(0,k.jsx)(o,{of:d}),`
`,(0,k.jsx)(t.h3,{id:`menugroup`,children:`MenuGroup`}),`
`,(0,k.jsx)(o,{of:b}),`
`,(0,k.jsx)(t.h3,{id:`menuitem`,children:`MenuItem`}),`
`,(0,k.jsx)(o,{of:C}),`
`,(0,k.jsx)(t.h3,{id:`separator`,children:`Separator`}),`
`,(0,k.jsx)(o,{of:p}),`
`,(0,k.jsx)(t.h3,{id:`submenutrigger`,children:`SubmenuTrigger`}),`
`,(0,k.jsx)(o,{of:h})]})}function O(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;function A(){return(A=e((()=>{k=t(),n(),c(),l()})))()}A();export{O as default};