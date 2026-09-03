import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-DDSKYeWr.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-AeI9r7-l.js";import{t as c}from"./mdx-react-shim-WCjJotFw.js";import{t as l}from"./runtime-DcPfiwh5.js";import{ChipButtonProps as u,ChipGroupProps as d,ChipListProps as f,ControlledSelection as p,Default as m,Disabled as h,EmptyState as g,MenuFilterTrigger as _,Props as v,RemovableChips as y,Sizes as b,ToggleChips as x,Truncation as S,n as C,t as w}from"./chip.stories-B45G_Xfz.js";function T(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(o,{of:w,name:`Overview`}),`
`,(0,D.jsx)(t.h1,{id:`chip`,children:`Chip`}),`
`,(0,D.jsx)(t.p,{children:`Grouped pill-shaped items for selecting values and removing user-added filters or tokens.`}),`
`,(0,D.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,D.jsxs)(t.ul,{children:[`
`,(0,D.jsxs)(t.li,{children:[(0,D.jsx)(t.code,{children:`ChipGroup`}),` + `,(0,D.jsx)(t.code,{children:`ChipList`}),` + `,(0,D.jsx)(t.code,{children:`Chip`}),` for grouped values, selection, keyboard navigation, and removal`]}),`
`,(0,D.jsx)(t.li,{children:`Toggle Chips for selecting multiple peer filters`}),`
`,(0,D.jsx)(t.li,{children:`Removable Chips for user-added filters and input tokens`}),`
`,(0,D.jsxs)(t.li,{children:[`Shared `,(0,D.jsx)(t.code,{children:`sm`}),`, `,(0,D.jsx)(t.code,{children:`md`}),`, and `,(0,D.jsx)(t.code,{children:`lg`}),` sizes, with optional leading icons`]}),`
`,(0,D.jsxs)(t.li,{children:[(0,D.jsx)(t.code,{children:`ChipButton`}),` for menu filters and other actions with a Chip-like appearance`]}),`
`]}),`
`,(0,D.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,D.jsx)(t.h2,{id:`quick-start`,children:`Quick start`}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

<ChipGroup>
  <Label>Location</Label>
  <ChipList>
    <Chip id="austin">Austin</Chip>
    <Chip id="chicago">Chicago</Chip>
    <Chip id="denver">Denver</Chip>
  </ChipList>
</ChipGroup>
`})}),`
`,(0,D.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,D.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,D.jsx)(t.p,{children:`Start with a labeled group of related values. Add selection or removal when
the group needs interactive behavior.`}),`
`,(0,D.jsx)(i,{of:m,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ChipGroup>
      <Label>Location</Label>
      <ChipList>
        <Chip id="austin">Austin</Chip>
        <Chip id="chicago">Chicago</Chip>
        <Chip id="denver">Denver</Chip>
      </ChipList>
    </ChipGroup>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`toggle-chips`,children:`Toggle Chips`}),`
`,(0,D.jsx)(t.p,{children:`Use Toggle Chips for multiple peer filters. Selected items show a check while
unselected items remain available in the same group.`}),`
`,(0,D.jsx)(i,{of:x,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

export function ToggleChipsExample() {
  return (
    <ChipGroup defaultSelectedKeys={['home']} selectionMode="multiple">
      <Label>Amenities</Label>
      <ChipList>
        <Chip id="home" textValue="Home">
          {({ isSelected }) => (
            <>
              <Icon icon="home" />
              <Text>Home</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
        <Chip id="star" textValue="Featured">
          {({ isSelected }) => (
            <>
              <Icon icon="star" />
              <Text>Featured</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
        <Chip id="wifi" textValue="Wifi">
          {({ isSelected }) => (
            <>
              <Text>Wifi</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`removable-chips`,children:`Removable Chips`}),`
`,(0,D.jsx)(t.p,{children:`Use Removable Chips for user-added filters and tokens. Removing a Chip calls
the group callback so the owning collection can update its items.`}),`
`,(0,D.jsx)(i,{of:y,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { useState } from 'react';
import { Button, Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

export function RemovableChipsExample() {
  const [filters, setFilters] = useState([
    { id: 'austin', name: 'Austin', icon: 'map-pin' as const },
    { id: 'active', name: 'Active' }
  ]);

  return (
    <ChipGroup
      onRemove={function handleRemove(keys) {
        setFilters((current) => current.filter((item) => !keys.has(item.id)));
      }}
    >
      <Label>Applied filters</Label>
      <ChipList items={filters} renderEmptyState={() => 'No filters applied'}>
        {(item) => (
          <Chip id={item.id} textValue={item.name}>
            {'icon' in item && item.icon ? <Icon icon={item.icon} /> : null}
            <Text>{item.name}</Text>
            <Button slot="remove" />
          </Chip>
        )}
      </ChipList>
    </ChipGroup>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`controlled-selection`,children:`Controlled Selection`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,D.jsx)(t.code,{children:`onSelectionChange`}),` when another part of the page
needs to own the selected filter state.`]}),`
`,(0,D.jsx)(i,{of:p,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { useState } from 'react';
import { Chip, ChipGroup, ChipList, Label, Text } from '@godaddy/antares';

const options = [
  { id: 'austin', name: 'Austin' },
  { id: 'active', name: 'Active' },
  { id: 'featured', name: 'Featured' }
];

export function ControlledSelectionExample() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['austin']));

  return (
    <>
      <ChipGroup
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={function handleSelectionChange(keys) {
          setSelectedKeys(
            keys === 'all' ? new Set(options.map((option) => option.id)) : new Set([...keys].map(String))
          );
        }}
      >
        <Label>Filters</Label>
        <ChipList>
          {options.map((option) => (
            <Chip key={option.id} id={option.id}>
              {option.name}
            </Chip>
          ))}
        </ChipList>
      </ChipGroup>
      <Text>Selected: {selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}</Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,D.jsxs)(t.p,{children:[`Compare the supported `,(0,D.jsx)(t.code,{children:`sm`}),`, `,(0,D.jsx)(t.code,{children:`md`}),`, and `,(0,D.jsx)(t.code,{children:`lg`}),` sizes. Keep one size per group.`]}),`
`,(0,D.jsx)(i,{of:b,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Flex, Label } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg'] as const;

export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      {sizes.map((size) => (
        <ChipGroup key={size} size={size}>
          <Label>Topics ({size})</Label>
          <ChipList>
            <Chip id="design">Design</Chip>
            <Chip id="development">Development</Chip>
            <Chip id="research">Research</Chip>
          </ChipList>
        </ChipGroup>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,D.jsxs)(t.p,{children:[`Disable individual options with `,(0,D.jsx)(t.code,{children:`disabledKeys`}),` when some values are unavailable.`]}),`
`,(0,D.jsx)(i,{of:h,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <>
      <ChipGroup selectionMode="multiple" disabledKeys={['a', 'b']} defaultSelectedKeys={['a']}>
        <Label>Unavailable options</Label>
        <ChipList>
          <Chip id="a">Disabled option</Chip>
          <Chip id="b" textValue="Also unavailable">
            <Icon icon="star" />
            <Text>Also unavailable</Text>
          </Chip>
        </ChipList>
      </ChipGroup>
      <ChipGroup selectionMode="multiple" disabledKeys={['off']} defaultSelectedKeys={['on']}>
        <Label>Mixed availability</Label>
        <ChipList>
          <Chip id="on">Enabled</Chip>
          <Chip id="off">Disabled option</Chip>
        </ChipList>
      </ChipGroup>
    </>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`truncation`,children:`Truncation`}),`
`,(0,D.jsx)(t.p,{children:`By default, long labels truncate visually when space is constrained, while
the complete accessible value remains available.`}),`
`,(0,D.jsx)(i,{of:S,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

export function TruncationExample() {
  return (
    <ChipGroup>
      <Label>Filters</Label>
      <ChipList>
        <Chip id="category">Category</Chip>
        <Chip id="long">Discounted price up to $20,000</Chip>
        <Chip id="status">Active</Chip>
      </ChipList>
    </ChipGroup>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`empty-state`,children:`Empty State`}),`
`,(0,D.jsx)(t.p,{children:`Give an empty collection useful guidance, then let the user add the first
value. Removable items continue to be owned by the collection.`}),`
`,(0,D.jsx)(i,{of:g,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { useState } from 'react';
import { Button, Chip, ChipGroup, ChipList, Flex, Text } from '@godaddy/antares';

const newsCategory = { id: 'news', name: 'News' };

export function EmptyStateExample() {
  const [categories, setCategories] = useState<Set<typeof newsCategory>>(new Set());

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ChipGroup
        aria-label="Categories"
        onRemove={function handleRemove(keys) {
          setCategories((current) => new Set([...current].filter((category) => !keys.has(category.id))));
        }}
      >
        <ChipList items={categories} renderEmptyState={() => 'No categories yet'}>
          {(category) => (
            <Chip id={category.id} textValue={category.name}>
              {category.name}
              <Button slot="remove" />
            </Chip>
          )}
        </ChipList>
        <Text slot="description">Add a category to get started.</Text>
      </ChipGroup>
      <Button
        onPress={function addCategory() {
          setCategories((current) => new Set(current).add(newsCategory));
        }}
      >
        Add category
      </Button>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h3,{id:`menu-filter-trigger`,children:`Menu filter trigger`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`ChipButton`}),` for a menu trigger that shares the Chip family's compact
sizing and presentation.`]}),`
`,(0,D.jsx)(i,{of:_,inline:!0}),`
`,(0,D.jsx)(r,{code:`import { useState } from 'react';
import { ChipButton, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

export function MenuFilterTriggerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <ChipButton>
        <Text>Location</Text>
        <Icon icon="chevron-down" flip={isOpen ? 'vertical' : undefined} />
      </ChipButton>
      <Menu aria-label="Location">
        <MenuItem id="austin">Austin</MenuItem>
        <MenuItem id="chicago">Chicago</MenuItem>
        <MenuItem id="denver">Denver</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,D.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,D.jsxs)(t.p,{children:[`Use a plain string for a simple Chip label. When content is composed, use
`,(0,D.jsx)(t.code,{children:`Text`}),` for the visible label and `,(0,D.jsx)(t.code,{children:`textValue`}),` for the complete accessible value.`]}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`<Chip id="austin" textValue="Austin">
  <Icon icon="map-pin" />
  <Text>Austin</Text>
  <Button slot="remove" />
</Chip>
`})}),`
`,(0,D.jsxs)(t.p,{children:[`Set the size on `,(0,D.jsx)(t.code,{children:`ChipGroup`}),` to share it with every Chip. `,(0,D.jsx)(t.code,{children:`ChipList`}),` wraps items
horizontally by default, and its layout props can be customized when needed.`]}),`
`,(0,D.jsxs)(t.p,{children:[`For removable Chips, provide `,(0,D.jsx)(t.code,{children:`onRemove`}),` on the group and add a self-closing
`,(0,D.jsx)(t.code,{children:`Button`}),` with `,(0,D.jsx)(t.code,{children:`slot="remove"`}),`. The callback receives a `,(0,D.jsx)(t.code,{children:`Set`}),` of removed keys;
update the collection owned by your application.`]}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`<ChipGroup
  onRemove={(keys) => {
    setFilters((current) => current.filter((filter) => !keys.has(filter.id)));
  }}
>
  <ChipList items={filters}>
    {(filter) => (
      <Chip id={filter.id} textValue={filter.name}>
        <Text>{filter.name}</Text>
        <Button slot="remove" />
      </Chip>
    )}
  </ChipList>
</ChipGroup>
`})}),`
`,(0,D.jsx)(t.p,{children:`For Toggle Chips, use the Chip render prop to show a selected accessory.`}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`<Chip id="home" textValue="Home">
  {({ isSelected }) => (
    <>
      <Icon icon="home" />
      <Text>Home</Text>
      {isSelected ? <Icon icon="checkmark" /> : null}
    </>
  )}
</Chip>
`})}),`
`,(0,D.jsx)(t.h3,{id:`menu-filter-button`,children:`Menu filter button`}),`
`,(0,D.jsxs)(t.p,{children:[`When you need a menu with a Chip-like appearance, use `,(0,D.jsx)(t.code,{children:`ChipButton`}),` inside
`,(0,D.jsx)(t.code,{children:`MenuTrigger`}),`. The menu trigger owns open state, focus, keyboard interaction,
and `,(0,D.jsx)(t.code,{children:`aria-expanded`}),`; the consumer owns any configured-filter state.`]}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`import { useState } from 'react';
import { ChipButton, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

const [isOpen, setIsOpen] = useState(false);

<MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
  <ChipButton>
    <Text>Location</Text>
    <Icon icon="chevron-down" flip={isOpen ? 'vertical' : undefined} />
  </ChipButton>

  <Menu aria-label="Location">
    {/* Menu items */}
  </Menu>
</MenuTrigger>
`})}),`
`,(0,D.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,D.jsxs)(t.ul,{children:[`
`,(0,D.jsxs)(t.li,{children:[`Give every `,(0,D.jsx)(t.code,{children:`ChipGroup`}),` a `,(0,D.jsx)(t.code,{children:`Label`}),` or an accessible name such as `,(0,D.jsx)(t.code,{children:`aria-label`}),`.`]}),`
`,(0,D.jsxs)(t.li,{children:[`Use `,(0,D.jsx)(t.code,{children:`textValue`}),` when a Chip contains icons, composed content, or a render prop.`]}),`
`,(0,D.jsx)(t.li,{children:`Use a descriptive group label so removal actions can be announced clearly.`}),`
`,(0,D.jsx)(t.li,{children:`Keep the visible label and the accessible value synchronized.`}),`
`,(0,D.jsxs)(t.li,{children:[(0,D.jsx)(t.code,{children:`ChipButton`}),` is a real button and exposes menu state through `,(0,D.jsx)(t.code,{children:`MenuTrigger`}),`; provide an accessible name when the visible content is incomplete.`]}),`
`]}),`
`,(0,D.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,D.jsxs)(t.ul,{children:[`
`,(0,D.jsx)(t.li,{children:`Keep labels concise and let them truncate only when the available width requires it.`}),`
`,(0,D.jsx)(t.li,{children:`Prefer groups of three or more related values.`}),`
`,(0,D.jsx)(t.li,{children:`Keep one size per group.`}),`
`,(0,D.jsxs)(t.li,{children:[`Let `,(0,D.jsx)(t.code,{children:`ChipList`}),` wrap instead of forcing a single horizontal line.`]}),`
`,(0,D.jsx)(t.li,{children:`Use removable Chips for user-added filters and tokens.`}),`
`,(0,D.jsxs)(t.li,{children:[`For menu filters, use `,(0,D.jsx)(t.code,{children:`ChipButton`}),` with `,(0,D.jsx)(t.code,{children:`MenuTrigger`}),` and provide the chevron explicitly.`]}),`
`]}),`
`,(0,D.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,D.jsx)(t.h3,{id:`a-chip-has-no-accessible-name`,children:`A Chip has no accessible name`}),`
`,(0,D.jsxs)(t.p,{children:[`Add a visible `,(0,D.jsx)(t.code,{children:`Label`}),` to the group or provide `,(0,D.jsx)(t.code,{children:`aria-label`}),`. For composed content,
also provide `,(0,D.jsx)(t.code,{children:`textValue`}),` on the Chip.`]}),`
`,(0,D.jsx)(t.h3,{id:`the-remove-action-does-not-update-the-ui`,children:`The remove action does not update the UI`}),`
`,(0,D.jsxs)(t.p,{children:[`Add `,(0,D.jsx)(t.code,{children:`onRemove`}),` to `,(0,D.jsx)(t.code,{children:`ChipGroup`}),` and remove the returned keys from the collection
owned by your application.`]}),`
`,(0,D.jsx)(t.h3,{id:`a-composed-label-is-not-truncating-correctly`,children:`A composed label is not truncating correctly`}),`
`,(0,D.jsxs)(t.p,{children:[`Keep the label in `,(0,D.jsx)(t.code,{children:`Text`}),`, preserve `,(0,D.jsx)(t.code,{children:`textValue`}),`, and constrain the available width
of the surrounding layout. Truncation is visual; the complete accessible value
should remain available.`]}),`
`,(0,D.jsx)(t.h3,{id:`the-menu-trigger-does-not-look-like-a-chip`,children:`The menu trigger does not look like a Chip`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`ChipButton`}),` inside `,(0,D.jsx)(t.code,{children:`MenuTrigger`}),`, include the visible value, and add a
trailing chevron to communicate that the control opens a menu.`]}),`
`,(0,D.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`<ChipGroup>
  <Label />
  <ChipList>
    <Chip>
      <Icon />
      <Text />
      <Button slot="remove" />
    </Chip>
  </ChipList>
  <Text slot="description" />
  <Text slot="errorMessage" />
</ChipGroup>
`})}),`
`,(0,D.jsxs)(t.p,{children:[`For a menu trigger, the button and menu are composed as siblings inside
`,(0,D.jsx)(t.code,{children:`MenuTrigger`}),`:`]}),`
`,(0,D.jsx)(t.pre,{children:(0,D.jsx)(t.code,{className:`language-tsx`,children:`<MenuTrigger>
  <ChipButton>
    <Text />
    <Icon />
  </ChipButton>
  <Menu>
    <MenuItem />
    {/* ... */}
  </Menu>
</MenuTrigger>
`})}),`
`,(0,D.jsx)(t.h3,{id:`chip-1`,children:`Chip`}),`
`,(0,D.jsx)(a,{of:v}),`
`,(0,D.jsx)(t.h3,{id:`chipgroup`,children:`ChipGroup`}),`
`,(0,D.jsx)(a,{of:d}),`
`,(0,D.jsx)(t.h3,{id:`chiplist`,children:`ChipList`}),`
`,(0,D.jsx)(a,{of:f}),`
`,(0,D.jsx)(t.h3,{id:`chipbutton`,children:`ChipButton`}),`
`,(0,D.jsx)(a,{of:u})]})}function E(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,D.jsx)(t,{...e,children:(0,D.jsx)(T,{...e})}):T(e)}var D;e((()=>{D=t(),c(),s(),l(),C()}))();export{E as default};