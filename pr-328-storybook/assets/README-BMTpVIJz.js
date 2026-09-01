import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-nnAUVtXG.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DQ7EliTm.js";import{t as c}from"./mdx-react-shim-DBrFA3vm.js";import{ChipGroupProps as l,ChipListProps as u,ControlledSelection as d,Default as f,Disabled as p,EmptyState as m,MenuFilterTrigger as h,Props as g,RemovableChips as _,Rtl as v,Sizes as y,ToggleChips as b,Truncation as x,n as S,t as C}from"./chip.stories-BFxYVcmu.js";function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:C,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`chip`,children:`Chip`}),`
`,(0,E.jsx)(t.p,{children:`Grouped pill-shaped items for selecting values and removing user-added filters or tokens. Use a rounded Button for menu filters.`}),`
`,(0,E.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`ChipGroup`}),` + `,(0,E.jsx)(t.code,{children:`ChipList`}),` + `,(0,E.jsx)(t.code,{children:`Chip`}),` for grouped values, selection, keyboard navigation, and removal`]}),`
`,(0,E.jsx)(t.li,{children:`Toggle Chips for selecting multiple peer filters`}),`
`,(0,E.jsx)(t.li,{children:`Removable Chips for user-added filters and input tokens`}),`
`,(0,E.jsxs)(t.li,{children:[`Shared `,(0,E.jsx)(t.code,{children:`sm`}),`, `,(0,E.jsx)(t.code,{children:`md`}),`, and `,(0,E.jsx)(t.code,{children:`lg`}),` sizes, with optional leading icons`]}),`
`,(0,E.jsx)(t.li,{children:`Menu filters use a fully rounded Antares Button, not Chip`}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsx)(t.p,{children:`Start with a labeled group of related values. Use a selection mode or remove
action when the group needs interactive behavior.`}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`toggle-chips`,children:`Toggle Chips`}),`
`,(0,E.jsx)(t.p,{children:`Use Toggle Chips for multiple peer filters. Selected items show a check while
unselected items remain available in the same group.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`removable-chips`,children:`Removable Chips`}),`
`,(0,E.jsx)(t.p,{children:`Use Removable Chips for user-added filters and tokens. Removing a chip
updates the owning collection and clears that value from the UI.`}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState } from 'react';
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
`,(0,E.jsx)(t.h3,{id:`controlled-selection`,children:`Controlled Selection`}),`
`,(0,E.jsxs)(t.p,{children:[`Use `,(0,E.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,E.jsx)(t.code,{children:`onSelectionChange`}),` when another part of the page
needs to own the selected filter state.`]}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState } from 'react';
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
`,(0,E.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,E.jsxs)(t.p,{children:[`Compare the supported `,(0,E.jsx)(t.code,{children:`sm`}),`, `,(0,E.jsx)(t.code,{children:`md`}),`, and `,(0,E.jsx)(t.code,{children:`lg`}),` sizes. Keep one size per group.`]}),`
`,(0,E.jsx)(i,{of:y,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Flex, Label } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,E.jsxs)(t.p,{children:[`Disable individual options with `,(0,E.jsx)(t.code,{children:`disabledKeys`}),`. Disabled behavior is
supported by the API but is not part of the supplied Chip design spec.`]}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`truncation`,children:`Truncation`}),`
`,(0,E.jsx)(t.p,{children:`Keep labels brief so truncation is exceptional. Long labels stay on one
line and use an ellipsis when the available width is constrained.`}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Box, Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

export function TruncationExample() {
  return (
    <Box style={{ maxInlineSize: '18rem' }}>
      <ChipGroup>
        <Label>Filters</Label>
        <ChipList>
          <Chip id="category">Category</Chip>
          <Chip id="long">Discounted price up to twenty thousand dollars</Chip>
          <Chip id="status">Active</Chip>
        </ChipList>
      </ChipGroup>
    </Box>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`empty-state`,children:`Empty State`}),`
`,(0,E.jsx)(t.p,{children:`Give an empty collection useful guidance, then let the user add the first
value. Removable items continue to be owned by the collection.`}),`
`,(0,E.jsx)(i,{of:m,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState } from 'react';
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
`,(0,E.jsx)(t.h3,{id:`menu-filter-trigger`,children:`Menu filter trigger`}),`
`,(0,E.jsx)(t.p,{children:`Menu filters use a rounded Button as the trigger that opens a Menu. This is
a related pattern rather than a Chip inside ChipGroup.`}),`
`,(0,E.jsx)(i,{of:h,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Flex, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

export function MenuFilterTriggerExample() {
  return (
    <MenuTrigger>
      <Flex as={Button} alignItems="center" gap="sm" rounding="full" variant="secondary">
        <Icon icon="map-pin" />
        <Text>Location</Text>
        <Icon icon="chevron-down" />
      </Flex>
      <Menu aria-label="Location">
        <MenuItem id="austin">Austin</MenuItem>
        <MenuItem id="chicago">Chicago</MenuItem>
        <MenuItem id="denver">Denver</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,E.jsx)(t.p,{children:`Toggle Chips follow the current layout direction and locale for RTL content.`}),`
`,(0,E.jsx)(i,{of:v,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';
import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';

export function RtlExample() {
  return (
    <RTLProvider>
      <ChipGroup selectionMode="multiple" defaultSelectedKeys={['a']}>
        <Label>مرشحات</Label>
        <ChipList>
          <Chip id="a" textValue="أوستن">
            {({ isSelected }) => (
              <>
                <Icon icon="map-pin" />
                <Text>أوستن</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
          <Chip id="b" textValue="نشط">
            {({ isSelected }) => (
              <>
                <Icon icon="star" />
                <Text>نشط</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
          <Chip id="c" textValue="متاح">
            {({ isSelected }) => (
              <>
                <Text>متاح</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
        </ChipList>
      </ChipGroup>
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsx)(t.p,{children:`Chip lives inside a collection. Compose the group like this:`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<ChipGroup size="md" selectionMode="multiple">
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
`,(0,E.jsxs)(t.p,{children:[`A plain string is enough for simple chips (`,(0,E.jsx)(t.code,{children:`<Chip>Austin</Chip>`}),`). With an icon or remove button, wrap the copy in `,(0,E.jsx)(t.code,{children:`<Text>`}),` so the label remains an explicit content role.`]}),`
`,(0,E.jsx)(t.p,{children:`The group applies its size consistently to every Chip. Keep one Chip family and one size per group, and let the list wrap horizontally when needed.`}),`
`,(0,E.jsxs)(t.p,{children:[`For removable chips, enable `,(0,E.jsx)(t.code,{children:`onRemove`}),` on the group and place a self-closing remove button. Chip merges the default X into RAC’s remove slot:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<Chip id="austin" textValue="Austin">
  Austin
  <Button slot="remove" />
</Chip>
`})}),`
`,(0,E.jsx)(t.p,{children:`Compose a selected check when you want Toggle affordance:`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<Chip id="home" textValue="Home">
  {({ isSelected }) => (
    <>
      <Text>Home</Text>
      {isSelected ? <Icon icon="checkmark" /> : null}
    </>
  )}
</Chip>
`})}),`
`,(0,E.jsxs)(t.p,{children:[`Chip is reserved for items inside `,(0,E.jsx)(t.code,{children:`ChipGroup`}),`. For a filter that opens a menu, use a fully rounded Button:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<MenuTrigger>
  <Flex as={Button} alignItems="center" gap="sm" rounding="full" variant="secondary">
    <Icon icon="map-pin" />
    <Text>Location</Text>
    <Icon icon="chevron-down" />
  </Flex>
  <Menu>{/* ... */}</Menu>
</MenuTrigger>
`})}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Every `,(0,E.jsx)(t.code,{children:`ChipGroup`}),` needs a composed `,(0,E.jsx)(t.code,{children:`Label`}),` or `,(0,E.jsx)(t.code,{children:`aria-label`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Use `,(0,E.jsx)(t.code,{children:`textValue`}),` when children are composed (icon + text, or a render prop).`]}),`
`,(0,E.jsxs)(t.li,{children:[`RAC supplies remove button naming (`,(0,E.jsx)(t.code,{children:`Remove`}),` + row label); you usually do not need a manual remove `,(0,E.jsx)(t.code,{children:`aria-label`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Menu filter Buttons expose `,(0,E.jsx)(t.code,{children:`aria-haspopup`}),` / `,(0,E.jsx)(t.code,{children:`aria-expanded`}),`; add `,(0,E.jsx)(t.code,{children:`aria-label`}),` when visible text is incomplete.`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsx)(t.li,{children:`Keep labels brief; truncation should be exceptional.`}),`
`,(0,E.jsx)(t.li,{children:`Prefer groups of three or more related chips; lay them out horizontally and let them wrap.`}),`
`,(0,E.jsx)(t.li,{children:`Keep one family and one size per group.`}),`
`,(0,E.jsx)(t.li,{children:`Use only Removable chips as tokens inside an input.`}),`
`,(0,E.jsxs)(t.li,{children:[`Do not use Chip outside `,(0,E.jsx)(t.code,{children:`ChipGroup`}),` — use a rounded Button for menu filters.`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`<ChipGroup>
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
`,(0,E.jsx)(t.h3,{id:`chip-1`,children:`Chip`}),`
`,(0,E.jsx)(a,{of:g}),`
`,(0,E.jsx)(t.h3,{id:`chipgroup`,children:`ChipGroup`}),`
`,(0,E.jsx)(a,{of:l}),`
`,(0,E.jsx)(t.h3,{id:`chiplist`,children:`ChipList`}),`
`,(0,E.jsx)(a,{of:u})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),S()}))();export{T as default};