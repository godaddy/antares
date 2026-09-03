import{i as e}from"./preload-helper-Cm6E7gqZ.js";import{F as t}from"./iframe-CrqLB-N1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CjQZ2XWS.js";import{t as c}from"./mdx-react-shim-CWiof15K.js";import{t as l}from"./runtime-ClaidU16.js";import{BottomSheet as u,Controlled as d,Default as f,Groups as p,MenuGroupProps as m,MenuItemProps as h,MenuTriggerProps as g,MultipleSelection as _,Props as v,RichContent as y,SingleSelection as b,Sizes as x,Submenu as S,SubmenuTriggerProps as C,n as w,t as T}from"./menu.stories-DURD37jX.js";function E(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{of:w,name:`Overview`}),`
`,(0,O.jsx)(t.h1,{id:`menu`,children:`Menu`}),`
`,(0,O.jsx)(t.p,{children:`Accessible dropdown menu with grouping, multi-select checkbox items, leading icons, and submenus.`}),`
`,(0,O.jsxs)(t.p,{children:[`An accessible dropdown menu built on React Aria. It supports grouping with optional
titles, multi-select checkbox items, leading icons, submenus, and two sizes. It
reuses Antares' `,(0,O.jsx)(t.code,{children:`Popover`}),` for the overlay and `,(0,O.jsx)(t.code,{children:`Checkbox`}),` indicator for selection.`]}),`
`,(0,O.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,O.jsxs)(t.ul,{children:[`
`,(0,O.jsxs)(t.li,{children:[`Grouping with an optional title via `,(0,O.jsx)(t.code,{children:`MenuGroup`}),`, plus `,(0,O.jsx)(t.code,{children:`MenuSeparator`}),` dividers`]}),`
`,(0,O.jsxs)(t.li,{children:[`Multi-select groups: set `,(0,O.jsx)(t.code,{children:`selectionMode="multiple"`}),` on a `,(0,O.jsx)(t.code,{children:`MenuGroup`}),` to render
its items as checkboxes, while other groups stay plain action items`]}),`
`,(0,O.jsxs)(t.li,{children:[`Optional leading `,(0,O.jsx)(t.code,{children:`icon`}),` per item; links (`,(0,O.jsx)(t.code,{children:`href`}),`) and disabled items`]}),`
`,(0,O.jsxs)(t.li,{children:[`Submenus via `,(0,O.jsx)(t.code,{children:`SubmenuTrigger`})]}),`
`,(0,O.jsxs)(t.li,{children:[`Two sizes (`,(0,O.jsx)(t.code,{children:`sm`}),`, `,(0,O.jsx)(t.code,{children:`md`}),`); set `,(0,O.jsx)(t.code,{children:`size`}),` explicitly on each submenu `,(0,O.jsx)(t.code,{children:`Menu`})]}),`
`,(0,O.jsxs)(t.li,{children:[`Usable anchored to a trigger or standalone (e.g. inside a bottom-sheet `,(0,O.jsx)(t.code,{children:`Drawer`}),`)`]}),`
`]}),`
`,(0,O.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,O.jsx)(t.pre,{children:(0,O.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,O.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,O.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,O.jsx)(t.p,{children:`A trigger with plain action items.`}),`
`,(0,O.jsx)(i,{of:f,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Actions</Button>
      <Menu aria-label="Actions">
        <MenuItem id="new">New file</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="save-as">Save as…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`MenuTrigger`}),` exposes its open state via `,(0,O.jsx)(t.code,{children:`isOpen`}),`/`,(0,O.jsx)(t.code,{children:`onOpenChange`}),`,
which can be used to drive the rotation of a chevron icon.`]}),`
`,(0,O.jsx)(i,{of:d,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="primary">
        <Text>Options</Text>
        <Icon icon="chevron-down" flip={isOpen ? 'vertical' : undefined} />
      </Button>
      <Menu aria-label="Options">
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="delete">Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,O.jsxs)(t.p,{children:[`On small screens a menu often reads better as a bottom sheet than an anchored
popover. Since `,(0,O.jsx)(t.code,{children:`Menu`}),` works standalone, drop it into a bottom `,(0,O.jsx)(t.code,{children:`Drawer`}),`.`]}),`
`,(0,O.jsx)(i,{of:u,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, CloseButton, Content, Drawer, Menu, MenuGroup, MenuItem } from '@godaddy/antares';
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
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`groups`,children:`Groups`}),`
`,(0,O.jsx)(t.p,{children:`Labeled groups separated by dividers, a multi-select checkbox group mixed with
plain action groups, leading icons, a disabled item, and a link.`}),`
`,(0,O.jsx)(i,{of:p,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Icon, Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from '@godaddy/antares';

export function GroupsExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">View</Button>
      <Menu aria-label="View options">
        {/* Unlabeled multi-select group: items render as checkboxes. */}
        <MenuGroup selectionMode="multiple" defaultSelectedKeys={['name', 'date']}>
          <MenuItem id="name">Name</MenuItem>
          <MenuItem id="date">Date modified</MenuItem>
          <MenuItem id="size">Size</MenuItem>
        </MenuGroup>

        <MenuSeparator />

        {/* Labeled group of plain action items, with leading icons + a disabled item. */}
        <MenuGroup label="Actions">
          <MenuItem id="refresh" icon={<Icon icon="circle-half" />}>
            Refresh
          </MenuItem>
          <MenuItem id="export" icon={<Icon icon="grid" />}>
            Export
          </MenuItem>
          <MenuItem id="archive" isDisabled>
            Archive (unavailable)
          </MenuItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup label="More">
          <MenuItem id="docs" href="https://example.com" target="_blank" textValue="Documentation">
            <span>Documentation</span>
          </MenuItem>
        </MenuGroup>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple Selection`}),`
`,(0,O.jsxs)(t.p,{children:[`A `,(0,O.jsx)(t.code,{children:`MenuGroup`}),` with `,(0,O.jsx)(t.code,{children:`selectionMode="multiple"`}),` renders its items as checkboxes.
Drive the checked items with `,(0,O.jsx)(t.code,{children:`selectedKeys`}),` + `,(0,O.jsx)(t.code,{children:`onSelectionChange`}),` or
seed them uncontrolled with `,(0,O.jsx)(t.code,{children:`defaultSelectedKeys`}),`. Keys correspond to each
`,(0,O.jsx)(t.code,{children:`MenuItem`}),`'s `,(0,O.jsx)(t.code,{children:`id`}),`.`]}),`
`,(0,O.jsx)(i,{of:_,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

export function MultipleSelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name', 'date']));
  const selectedLabel = columns === 'all' ? 'all' : [...columns].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      <MenuTrigger>
        <Button variant="primary">Columns</Button>
        <Menu aria-label="Columns">
          <MenuGroup selectionMode="multiple" selectedKeys={columns} onSelectionChange={setColumns}>
            <MenuItem id="name">Name</MenuItem>
            <MenuItem id="date">Date modified</MenuItem>
            <MenuItem id="size">Size</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
      <Text>Selected: {selectedLabel || '-'}</Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`rich-content-from-an-item`,children:`Rich Content From an Item`}),`
`,(0,O.jsxs)(t.p,{children:[`A `,(0,O.jsx)(t.code,{children:`Menu`}),` is a collection, so it only renders `,(0,O.jsx)(t.code,{children:`MenuItem`}),`, `,(0,O.jsx)(t.code,{children:`MenuGroup`}),`,
`,(0,O.jsx)(t.code,{children:`MenuSeparator`}),`, and `,(0,O.jsx)(t.code,{children:`SubmenuTrigger`}),` children. Rich content inside a `,(0,O.jsx)(t.code,{children:`Menu`}),`
or submenu is not supported. To show a `,(0,O.jsx)(t.code,{children:`Calendar`}),`, let the item close the
menu from `,(0,O.jsx)(t.code,{children:`onAction`}),` and open a separate `,(0,O.jsx)(t.code,{children:`Popover`}),` anchored to the trigger
with `,(0,O.jsx)(t.code,{children:`triggerRef`}),`.`]}),`
`,(0,O.jsx)(i,{of:y,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Calendar, Content, Icon, Menu, MenuItem, MenuTrigger, Popover, Text } from '@godaddy/antares';
import { parseDate, type CalendarDate } from '@godaddy/antares/date';
import { useRef, useState } from 'react';

export function RichContentExample() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<CalendarDate | null>(parseDate('2024-03-01'));

  function selectDate(value: CalendarDate | null) {
    setDate(value);
    setCalendarOpen(false);
  }

  return (
    <>
      <MenuTrigger>
        <Button ref={triggerRef} variant="primary">
          Schedule
        </Button>
        <Menu aria-label="Schedule">
          <MenuItem id="now">Publish now</MenuItem>
          <MenuItem id="dates" icon={<Icon icon="calendar" />} onAction={() => setCalendarOpen(true)}>
            Pick a date
          </MenuItem>
        </Menu>
      </MenuTrigger>

      <Popover triggerRef={triggerRef} isOpen={isCalendarOpen} onOpenChange={setCalendarOpen}>
        <Content>
          <Calendar aria-label="Publish date" value={date} onChange={selectDate} />
        </Content>
      </Popover>

      <Text>Publishing on {date == null ? 'demand' : date.toString()}</Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`single-selection`,children:`Single Selection`}),`
`,(0,O.jsxs)(t.p,{children:[`A `,(0,O.jsx)(t.code,{children:`MenuGroup`}),` with `,(0,O.jsx)(t.code,{children:`selectionMode="single"`}),` lets one item be selected at a time.
Drive it with `,(0,O.jsx)(t.code,{children:`selectedKeys`}),` + `,(0,O.jsx)(t.code,{children:`onSelectionChange`}),` or seed it uncontrolled with
`,(0,O.jsx)(t.code,{children:`defaultSelectedKeys`}),`. Keys correspond to each `,(0,O.jsx)(t.code,{children:`MenuItem`}),`'s `,(0,O.jsx)(t.code,{children:`id`}),`.`]}),`
`,(0,O.jsx)(i,{of:b,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

export function SingleSelectionExample() {
  const [sort, setSort] = useState<Selection>(new Set(['recent']));
  const selectedLabel = sort === 'all' ? 'all' : [...sort].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      <MenuTrigger>
        <Button variant="primary">Sort by</Button>
        <Menu aria-label="Sort by">
          <MenuGroup selectionMode="single" selectedKeys={sort} onSelectionChange={setSort}>
            <MenuItem id="recent">Most recent</MenuItem>
            <MenuItem id="name">Name</MenuItem>
            <MenuItem id="size">Size</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
      <Text>Selected: {selectedLabel || '-'}</Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,O.jsxs)(t.p,{children:[(0,O.jsx)(t.code,{children:`size`}),` controls item density. Shown here as two standalone menus so both
sizes are visible at once; in practice you set `,(0,O.jsx)(t.code,{children:`size`}),` on the `,(0,O.jsx)(t.code,{children:`Menu`}),` inside a
`,(0,O.jsx)(t.code,{children:`MenuTrigger`}),`.`]}),`
`,(0,O.jsx)(i,{of:x,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Flex, Menu, MenuGroup, MenuItem } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="xl" alignItems="flex-start">
      <Menu aria-label="Small menu" size="sm" style={{ width: 220 }}>
        <MenuGroup label="Small">
          <MenuItem id="s-new">New file</MenuItem>
          <MenuItem id="s-open">Open</MenuItem>
          <MenuItem id="s-save">Save</MenuItem>
        </MenuGroup>
      </Menu>

      <Menu aria-label="Medium menu" size="md" style={{ width: 220 }}>
        <MenuGroup label="Medium">
          <MenuItem id="m-new">New file</MenuItem>
          <MenuItem id="m-open">Open</MenuItem>
          <MenuItem id="m-save">Save</MenuItem>
        </MenuGroup>
      </Menu>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h3,{id:`submenu`,children:`Submenu`}),`
`,(0,O.jsxs)(t.p,{children:[`Nested menus via `,(0,O.jsx)(t.code,{children:`SubmenuTrigger`}),`.`]}),`
`,(0,O.jsx)(i,{of:S,inline:!0}),`
`,(0,O.jsx)(r,{code:`import { Button, Icon, Menu, MenuItem, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';

export function SubmenuExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Share</Button>
      <Menu aria-label="Share">
        <MenuItem id="copy">Copy link</MenuItem>

        <SubmenuTrigger>
          <MenuItem id="resources" icon={<Icon icon="ok" />}>
            Resources
          </MenuItem>
          <Menu aria-label="Resources">
            <MenuItem id="file">File</MenuItem>
            <MenuItem id="folder">Folder</MenuItem>
          </Menu>
        </SubmenuTrigger>

        <SubmenuTrigger>
          <MenuItem id="dates" icon={<Icon icon="calendar" />}>
            Dates
          </MenuItem>
          <Menu aria-label="Dates">
            <MenuItem id="monday">Monday</MenuItem>
            <MenuItem id="friday">Friday</MenuItem>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,O.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,O.jsxs)(t.ul,{children:[`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.strong,{children:`Space/Enter`}),`: activate an item; `,(0,O.jsx)(t.strong,{children:`Escape`}),`: close`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.strong,{children:`Arrow Up/Down`}),`: move between items; `,(0,O.jsx)(t.strong,{children:`Home/End`}),`: first/last`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.strong,{children:`Arrow Right/Left`}),`: open/close a submenu`]}),`
`,(0,O.jsxs)(t.li,{children:[(0,O.jsx)(t.strong,{children:`Type to select`}),`: jump to a matching item (string labels are used as `,(0,O.jsx)(t.code,{children:`textValue`}),`)`]}),`
`,(0,O.jsxs)(t.li,{children:[`Multi-select items use RAC's `,(0,O.jsx)(t.code,{children:`menuitemcheckbox`}),` role; the checkbox indicator is
decorative (`,(0,O.jsx)(t.code,{children:`aria-hidden`}),`) and the item owns interaction`]}),`
`]}),`
`,(0,O.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,O.jsxs)(t.ul,{children:[`
`,(0,O.jsxs)(t.li,{children:[`Give each selectable `,(0,O.jsx)(t.code,{children:`MenuItem`}),` a stable `,(0,O.jsx)(t.code,{children:`id`}),`, and provide the `,(0,O.jsx)(t.code,{children:`Menu`}),` an
`,(0,O.jsx)(t.code,{children:`aria-label`}),` when there is no visible label.`]}),`
`,(0,O.jsxs)(t.li,{children:[`Use a leading `,(0,O.jsx)(t.code,{children:`icon`}),` for recognition, not as the only label - keep a text label.`]}),`
`,(0,O.jsx)(t.li,{children:`Reserve checkbox groups for multi-select; use plain groups for one-shot actions.`}),`
`,(0,O.jsxs)(t.li,{children:[`A `,(0,O.jsx)(t.code,{children:`Menu`}),` is a collection: it only renders `,(0,O.jsx)(t.code,{children:`MenuItem`}),`, `,(0,O.jsx)(t.code,{children:`MenuGroup`}),`,
`,(0,O.jsx)(t.code,{children:`MenuSeparator`}),`, and `,(0,O.jsx)(t.code,{children:`SubmenuTrigger`}),`. For rich content (a `,(0,O.jsx)(t.code,{children:`Calendar`}),`, a form),
close the menu from `,(0,O.jsx)(t.code,{children:`onAction`}),` and open a separate `,(0,O.jsx)(t.code,{children:`Popover`}),` anchored with
`,(0,O.jsx)(t.code,{children:`triggerRef`}),` instead of putting it in a submenu.`]}),`
`]}),`
`,(0,O.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,O.jsx)(t.h3,{id:`menu-1`,children:`Menu`}),`
`,(0,O.jsx)(a,{of:v}),`
`,(0,O.jsx)(t.h3,{id:`menutrigger`,children:`MenuTrigger`}),`
`,(0,O.jsx)(a,{of:g}),`
`,(0,O.jsx)(t.h3,{id:`menugroup`,children:`MenuGroup`}),`
`,(0,O.jsx)(a,{of:m}),`
`,(0,O.jsx)(t.h3,{id:`menuitem`,children:`MenuItem`}),`
`,(0,O.jsx)(a,{of:h}),`
`,(0,O.jsx)(t.h3,{id:`submenutrigger`,children:`SubmenuTrigger`}),`
`,(0,O.jsx)(a,{of:C})]})}function D(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,O.jsx)(t,{...e,children:(0,O.jsx)(E,{...e})}):E(e)}var O;e((()=>{O=t(),c(),s(),l(),T()}))();export{D as default};