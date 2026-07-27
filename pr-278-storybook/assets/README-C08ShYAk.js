import{i as e}from"./preload-helper-BHwm7qkS.js";import{y as t}from"./iframe-BLLDn8ZS.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C82fOZXF.js";import{t as c}from"./mdx-react-shim-ChV-n-qA.js";import{Basic as l,BottomSheet as u,Controlled as d,Groups as f,MenuGroupProps as p,MenuItemProps as m,MenuTriggerProps as h,Props as g,Selection as _,Sizes as v,SubmenuTriggerProps as y,WithSubmenus as b,n as x,t as S}from"./menu.stories-BndegtiN.js";var C,w=e((()=>{C=`import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

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
}
`})),T,E=e((()=>{T=`import { Button, Icon, Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from '@godaddy/antares';

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
}
`})),D,O=e((()=>{D=`import { Button, Flex, Menu, MenuGroup, MenuItem, MenuTrigger, Text, type Selection } from '@godaddy/antares';
import { useState } from 'react';

export function SelectionExample() {
  const [columns, setColumns] = useState<Selection>(new Set(['name', 'date']));
  const selectedLabel = columns === 'all' ? 'all' : [...columns].join(', ');

  return (
    <Flex gap="lg" alignItems="center">
      {/* Controlled: you own the state. */}
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

      {/* Uncontrolled: seed initial selections with defaultSelectedKeys. */}
      <MenuTrigger>
        <Button variant="primary">Filters</Button>
        <Menu aria-label="Filters">
          <MenuGroup selectionMode="multiple" defaultSelectedKeys={['unread']}>
            <MenuItem id="unread">Unread</MenuItem>
            <MenuItem id="flagged">Flagged</MenuItem>
            <MenuItem id="archived">Archived</MenuItem>
          </MenuGroup>
        </Menu>
      </MenuTrigger>
    </Flex>
  );
}
`})),k,A=e((()=>{k=`import { Flex, Menu, MenuGroup, MenuItem } from '@godaddy/antares';

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
}
`})),j,M=e((()=>{j=`import { Button, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';
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
}
`})),N,P=e((()=>{N=`import { Button, Icon, Menu, MenuItem, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';

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
}
`})),F,I=e((()=>{F=`import { Button, Drawer, Menu, MenuGroup, MenuItem } from '@godaddy/antares';
import { useState } from 'react';

/**
 * On small screens a menu often reads better as a bottom sheet than an anchored
 * popover. Since \`Menu\` works standalone, drop it into a bottom \`Drawer\`.
 */
export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open menu
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable showCloseButton aria-label="Menu">
        <Menu aria-label="Account actions" onAction={() => setOpen(false)} blockPaddingStart="xl">
          <MenuGroup label="Account">
            <MenuItem id="profile">Profile</MenuItem>
            <MenuItem id="settings">Settings</MenuItem>
          </MenuGroup>
          <MenuGroup label="Session">
            <MenuItem id="logout">Log out</MenuItem>
          </MenuGroup>
        </Menu>
      </Drawer>
    </>
  );
}
`}));function L(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(o,{of:x,name:`Overview`}),`
`,(0,z.jsx)(t.h1,{id:`menu`,children:`Menu`}),`
`,(0,z.jsx)(t.p,{children:`Accessible dropdown menu with grouping, multi-select checkbox items, leading icons, and submenus.`}),`
`,(0,z.jsxs)(t.p,{children:[`An accessible dropdown menu built on React Aria. It supports grouping with optional
titles, multi-select checkbox items, leading icons, submenus, and two sizes. It
reuses Antares' `,(0,z.jsx)(t.code,{children:`Popover`}),` for the overlay and `,(0,z.jsx)(t.code,{children:`Checkbox`}),` indicator for selection.`]}),`
`,(0,z.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[`Grouping with an optional title via `,(0,z.jsx)(t.code,{children:`MenuGroup`}),`, plus `,(0,z.jsx)(t.code,{children:`MenuSeparator`}),` dividers`]}),`
`,(0,z.jsxs)(t.li,{children:[`Multi-select groups: set `,(0,z.jsx)(t.code,{children:`selectionMode="multiple"`}),` on a `,(0,z.jsx)(t.code,{children:`MenuGroup`}),` to render
its items as checkboxes, while other groups stay plain action items`]}),`
`,(0,z.jsxs)(t.li,{children:[`Optional leading `,(0,z.jsx)(t.code,{children:`icon`}),` per item; links (`,(0,z.jsx)(t.code,{children:`href`}),`) and disabled items`]}),`
`,(0,z.jsxs)(t.li,{children:[`Submenus via `,(0,z.jsx)(t.code,{children:`SubmenuTrigger`})]}),`
`,(0,z.jsxs)(t.li,{children:[`Two sizes (`,(0,z.jsx)(t.code,{children:`sm`}),`, `,(0,z.jsx)(t.code,{children:`md`}),`) that submenus inherit automatically`]}),`
`,(0,z.jsxs)(t.li,{children:[`Usable anchored to a trigger or standalone (e.g. inside a bottom-sheet `,(0,z.jsx)(t.code,{children:`Drawer`}),`)`]}),`
`]}),`
`,(0,z.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,z.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,z.jsx)(t.h3,{id:`menu-1`,children:`Menu`}),`
`,(0,z.jsx)(a,{of:g}),`
`,(0,z.jsx)(t.h3,{id:`menutrigger`,children:`MenuTrigger`}),`
`,(0,z.jsx)(a,{of:h}),`
`,(0,z.jsx)(t.h3,{id:`menugroup`,children:`MenuGroup`}),`
`,(0,z.jsx)(a,{of:p}),`
`,(0,z.jsx)(t.h3,{id:`menuitem`,children:`MenuItem`}),`
`,(0,z.jsx)(a,{of:m}),`
`,(0,z.jsx)(t.h3,{id:`submenutrigger`,children:`SubmenuTrigger`}),`
`,(0,z.jsx)(a,{of:y}),`
`,(0,z.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,z.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,z.jsx)(t.p,{children:`A trigger with plain action items.`}),`
`,(0,z.jsx)(i,{of:l,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:C}),`
`,(0,z.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.code,{children:`MenuTrigger`}),` exposes its open state via `,(0,z.jsx)(t.code,{children:`isOpen`}),`/`,(0,z.jsx)(t.code,{children:`onOpenChange`}),`, which can be used to drive the rotation of a chevron icon.`]}),`
`,(0,z.jsx)(i,{of:d,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:j}),`
`,(0,z.jsx)(t.h3,{id:`groups`,children:`Groups`}),`
`,(0,z.jsx)(t.p,{children:`Labeled groups separated by dividers, a multi-select checkbox group mixed with
plain action groups, leading icons, a disabled item, and a link.`}),`
`,(0,z.jsx)(i,{of:f,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:T}),`
`,(0,z.jsx)(t.h3,{id:`multi-select`,children:`Multi-select`}),`
`,(0,z.jsxs)(t.p,{children:[`A `,(0,z.jsx)(t.code,{children:`MenuGroup`}),` with `,(0,z.jsx)(t.code,{children:`selectionMode="multiple"`}),` renders its items as checkboxes.
The initially checked items are the group's selected keys - controlled with
`,(0,z.jsx)(t.code,{children:`selectedKeys`}),` + `,(0,z.jsx)(t.code,{children:`onSelectionChange`}),`, or uncontrolled with `,(0,z.jsx)(t.code,{children:`defaultSelectedKeys`}),`.
Keys correspond to each `,(0,z.jsx)(t.code,{children:`MenuItem`}),`'s `,(0,z.jsx)(t.code,{children:`id`}),`.`]}),`
`,(0,z.jsx)(i,{of:_,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:D}),`
`,(0,z.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.code,{children:`size`}),` controls item density. Shown here as two standalone menus so both
sizes are visible at once; in practice you set `,(0,z.jsx)(t.code,{children:`size`}),` on the `,(0,z.jsx)(t.code,{children:`Menu`}),` inside a
`,(0,z.jsx)(t.code,{children:`MenuTrigger`}),`.`]}),`
`,(0,z.jsx)(i,{of:v,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:k}),`
`,(0,z.jsx)(t.h3,{id:`submenus`,children:`Submenus`}),`
`,(0,z.jsxs)(t.p,{children:[`Nested menus via `,(0,z.jsx)(t.code,{children:`SubmenuTrigger`}),`.`]}),`
`,(0,z.jsx)(i,{of:b,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:N}),`
`,(0,z.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom sheet`}),`
`,(0,z.jsxs)(t.p,{children:[`Because `,(0,z.jsx)(t.code,{children:`Menu`}),` works standalone, it can render inside a bottom `,(0,z.jsx)(t.code,{children:`Drawer`}),` for a
mobile-style sheet.`]}),`
`,(0,z.jsx)(i,{of:u,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:F}),`
`,(0,z.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,z.jsxs)(t.p,{children:[`Selection is scoped per group. Give a `,(0,z.jsx)(t.code,{children:`MenuGroup`}),` `,(0,z.jsx)(t.code,{children:`selectionMode="multiple"`}),` to
turn its items into checkboxes; leave it off to keep plain action items - both
can coexist in one menu. Seed the initially checked items with
`,(0,z.jsx)(t.code,{children:`defaultSelectedKeys`}),` (uncontrolled) or drive them with `,(0,z.jsx)(t.code,{children:`selectedKeys`}),` +
`,(0,z.jsx)(t.code,{children:`onSelectionChange`}),` (controlled); keys match each `,(0,z.jsx)(t.code,{children:`MenuItem`}),`'s `,(0,z.jsx)(t.code,{children:`id`}),`. Menu-level
selection props are also supported for the simple whole-menu case.`]}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.code,{children:`size`}),` is set per `,(0,z.jsx)(t.code,{children:`Menu`}),` (`,(0,z.jsx)(t.code,{children:`sm`}),` / `,(0,z.jsx)(t.code,{children:`md`}),`). Submenus do not inherit it - set `,(0,z.jsx)(t.code,{children:`size`}),`
on each submenu `,(0,z.jsx)(t.code,{children:`Menu`}),` if you want a smaller nested menu. RAC state data
attributes (`,(0,z.jsx)(t.code,{children:`data-hovered`}),`, `,(0,z.jsx)(t.code,{children:`data-focused`}),`, `,(0,z.jsx)(t.code,{children:`data-selected`}),`, `,(0,z.jsx)(t.code,{children:`data-disabled`}),`,
and `,(0,z.jsx)(t.code,{children:`aria-expanded`}),` on the trigger) are available for styling via `,(0,z.jsx)(t.code,{children:`className`}),`.`]}),`
`,(0,z.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Space/Enter`}),`: activate an item; `,(0,z.jsx)(t.strong,{children:`Escape`}),`: close`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Arrow Up/Down`}),`: move between items; `,(0,z.jsx)(t.strong,{children:`Home/End`}),`: first/last`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Arrow Right/Left`}),`: open/close a submenu`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Type to select`}),`: jump to a matching item (string labels are used as `,(0,z.jsx)(t.code,{children:`textValue`}),`)`]}),`
`,(0,z.jsxs)(t.li,{children:[`Multi-select items use RAC's `,(0,z.jsx)(t.code,{children:`menuitemcheckbox`}),` role; the checkbox indicator is
decorative (`,(0,z.jsx)(t.code,{children:`aria-hidden`}),`) and the item owns interaction`]}),`
`]}),`
`,(0,z.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[`Give each selectable `,(0,z.jsx)(t.code,{children:`MenuItem`}),` a stable `,(0,z.jsx)(t.code,{children:`id`}),`, and provide the `,(0,z.jsx)(t.code,{children:`Menu`}),` an
`,(0,z.jsx)(t.code,{children:`aria-label`}),` when there is no visible label.`]}),`
`,(0,z.jsxs)(t.li,{children:[`Use a leading `,(0,z.jsx)(t.code,{children:`icon`}),` for recognition, not as the only label - keep a text label.`]}),`
`,(0,z.jsx)(t.li,{children:`Reserve checkbox groups for multi-select; use plain groups for one-shot actions.`}),`
`]}),`
`,(0,z.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,z.jsx)(t.h3,{id:`submenu-not-opening`,children:`Submenu not opening`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-tsx`,children:`// ❌ Menu nested directly inside a MenuItem
<MenuItem id="share">
  Share
  <Menu>…</Menu>
</MenuItem>

// ✅ Wrap the item and its submenu in SubmenuTrigger
<SubmenuTrigger>
  <MenuItem id="share">Share</MenuItem>
  <Menu aria-label="Share">…</Menu>
</SubmenuTrigger>
`})}),`
`,(0,z.jsx)(t.h3,{id:`every-item-shows-a-checkbox`,children:`Every item shows a checkbox`}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.code,{children:`selectionMode="multiple"`}),` on the `,(0,z.jsx)(t.code,{children:`Menu`}),` applies to all items. Scope it to a
`,(0,z.jsx)(t.code,{children:`MenuGroup`}),` instead so only that group renders checkboxes.`]})]})}function R(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,z.jsx)(t,{...e,children:(0,z.jsx)(L,{...e})}):L(e)}var z;e((()=>{z=t(),c(),s(),w(),E(),O(),A(),M(),P(),I(),S()}))();export{R as default};