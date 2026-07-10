import{i as e}from"./preload-helper-B4cZKGJ2.js";import{y as t}from"./iframe-BXpFpKoH.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D1DQoGQj.js";import{t as c}from"./mdx-react-shim-ddhxeeeS.js";import{Controlled as l,Default as u,Disabled as d,IconAndText as f,IconOnly as p,MultipleSelection as m,Props as h,RTL as g,Sizes as _,WithDropdown as v,n as y,t as b}from"./toggle-button.stories-50hK3PAX.js";var x,S=e((()=>{x=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
`})),C,w=e((()=>{C=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <ToggleButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">Italic</ToggleButton>
      <ToggleButton id="underline">Underline</ToggleButton>
    </ToggleButtonGroup>
  );
}
`})),T,E=e((()=>{T=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['week']));

  return (
    <>
      <ToggleButtonGroup
        aria-label="View"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={(keys) => setSelected(keys as Set<string>)}
      >
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
      <p>Current selection: {Array.from(selected).join(', ')}</p>
    </>
  );
}
`})),D,O=e((()=>{D=`import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <label>Disabled group</label>
      <ToggleButtonGroup aria-label="Disabled group" isDisabled defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <label>Individual disabled item</label>
      <ToggleButtonGroup aria-label="Individual disabled" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week" isDisabled>
          Week
        </ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  );
}
`})),k,A=e((()=>{k=`import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ToggleButtonGroup aria-label="Size sm" size="sm" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup aria-label="Size md" size="md" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  );
}
`})),j,M=e((()=>{j=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

export function IconAndTextExample() {
  return (
    <ToggleButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ToggleButton id="list">
        <Icon icon="bulleted-list" />
        List
      </ToggleButton>
      <ToggleButton id="grid">
        <Icon icon="grid" />
        Grid
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
`})),N,P=e((()=>{N=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

export function IconOnlyExample() {
  return (
    <ToggleButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ToggleButton id="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </ToggleButton>
      <ToggleButton id="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
`})),F,I=e((()=>{F=`import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Icon, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

type Alignment = 'left' | 'center' | 'right';

const ALIGNMENT_ICONS: Record<Alignment, string> = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right'
};

const ALIGNMENT_LABELS: Record<Alignment, string> = {
  left: 'Align Left',
  center: 'Align Center',
  right: 'Align Right'
};

export function WithDropdownExample() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set());
  const [[alignment], setAlignment] = useState<Set<Alignment>>(new Set(['left']));

  return (
    <ToggleButtonGroup
      aria-label="Text formatting"
      selectionMode="multiple"
      selectedKeys={formatting}
      onSelectionChange={(keys) => setFormatting(new Set([...(keys as Set<string>)].filter((k) => k !== 'align')))}
    >
      <ToggleButton id="bold" aria-label="Bold">
        <Icon icon="bold" />
      </ToggleButton>
      <ToggleButton id="italic" aria-label="Italic">
        <Icon icon="italic" />
      </ToggleButton>

      <MenuTrigger>
        <ToggleButton id="align" aria-label={ALIGNMENT_LABELS[alignment]}>
          <Icon icon={ALIGNMENT_ICONS[alignment]} />
          <Icon icon="chevron-down" />
        </ToggleButton>
        <Menu
          selectionMode="single"
          selectedKeys={[alignment]}
          onSelectionChange={(keys) => setAlignment(new Set([...(keys as Set<Alignment>)]))}
        >
          <MenuItem id="left">{ALIGNMENT_LABELS.left}</MenuItem>
          <MenuItem id="center">{ALIGNMENT_LABELS.center}</MenuItem>
          <MenuItem id="right">{ALIGNMENT_LABELS.right}</MenuItem>
        </Menu>
      </MenuTrigger>
    </ToggleButtonGroup>
  );
}
`})),L,R=e((()=>{L=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { DefaultExample } from './default.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <DefaultExample />
    </RTLProvider>
  );
}
`}));function z(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(o,{of:y,name:`Overview`}),`
`,(0,V.jsx)(t.h1,{id:`togglebutton`,children:`ToggleButton`}),`
`,(0,V.jsx)(t.p,{children:`Accessible toggle button component for grouped contextual actions with single or multiple selection, keyboard navigation, and RTL-aware layouts.`}),`
`,(0,V.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,V.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,V.jsx)(a,{of:h}),`
`,(0,V.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,V.jsx)(t.h3,{id:`default-single-selection`,children:`Default (Single Selection)`}),`
`,(0,V.jsxs)(t.p,{children:[`A `,(0,V.jsx)(t.code,{children:`ToggleButton`}),` toggles between selected and unselected. Wrap multiple inside a `,(0,V.jsx)(t.code,{children:`ToggleButtonGroup`}),` to link them with shared selection and keyboard navigation — `,(0,V.jsx)(t.code,{children:`defaultSelectedKeys`}),` sets the initial selection.`]}),`
`,(0,V.jsx)(i,{of:u,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:x}),`
`,(0,V.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple Selection`}),`
`,(0,V.jsxs)(t.p,{children:[`Use `,(0,V.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow more than one item to be active at a time.`]}),`
`,(0,V.jsx)(i,{of:m,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:C}),`
`,(0,V.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,V.jsxs)(t.p,{children:[`Use `,(0,V.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,V.jsx)(t.code,{children:`onSelectionChange`}),` to control selection from parent state — `,(0,V.jsx)(t.code,{children:`onSelectionChange`}),` receives a `,(0,V.jsx)(t.code,{children:`Set<string>`}),` of the selected item `,(0,V.jsx)(t.code,{children:`id`}),` values.`]}),`
`,(0,V.jsx)(i,{of:l,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:T}),`
`,(0,V.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,V.jsxs)(t.p,{children:[`Disable the entire group with `,(0,V.jsx)(t.code,{children:`isDisabled`}),` on the container, or disable individual items with `,(0,V.jsx)(t.code,{children:`isDisabled`}),` on specific `,(0,V.jsx)(t.code,{children:`ToggleButton`}),` elements.`]}),`
`,(0,V.jsx)(i,{of:d,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:D}),`
`,(0,V.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,V.jsxs)(t.p,{children:[`Two sizes are available: `,(0,V.jsx)(t.code,{children:`sm`}),` and `,(0,V.jsx)(t.code,{children:`md`}),` (default).`]}),`
`,(0,V.jsx)(i,{of:_,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:k}),`
`,(0,V.jsx)(t.h3,{id:`icon--text`,children:`Icon + Text`}),`
`,(0,V.jsxs)(t.p,{children:[`Items can include an `,(0,V.jsx)(t.code,{children:`Icon`}),` alongside text for added visual context.`]}),`
`,(0,V.jsx)(i,{of:f,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:j}),`
`,(0,V.jsx)(t.h3,{id:`icon-only`,children:`Icon Only`}),`
`,(0,V.jsxs)(t.p,{children:[`For compact layouts, items can contain only icons. Padding adjusts automatically to keep the button square — no extra prop required. Always provide an `,(0,V.jsx)(t.code,{children:`aria-label`}),` on each icon-only item so screen readers can identify the action.`]}),`
`,(0,V.jsx)(i,{of:p,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:N}),`
`,(0,V.jsx)(t.h3,{id:`with-dropdown`,children:`With Dropdown`}),`
`,(0,V.jsxs)(t.p,{children:[`Wrap a `,(0,V.jsx)(t.code,{children:`ToggleButton`}),` in a `,(0,V.jsx)(t.code,{children:`MenuTrigger`}),` to add sub-options to a group item.`]}),`
`,(0,V.jsx)(i,{of:v,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:F}),`
`,(0,V.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,V.jsx)(t.p,{children:`The group follows the document's layout direction, detected automatically from the browser locale.`}),`
`,(0,V.jsx)(i,{of:g,inline:!0}),`
`,(0,V.jsx)(r,{language:`tsx`,code:L}),`
`,(0,V.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,V.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,V.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,V.jsxs)(t.p,{children:[(0,V.jsx)(t.strong,{children:`ToggleButtonGroup Container:`}),` `,(0,V.jsx)(t.code,{children:`data-size`})]}),`
`,(0,V.jsxs)(t.p,{children:[(0,V.jsx)(t.strong,{children:`ToggleButton Item:`}),` `,(0,V.jsx)(t.code,{children:`data-selected`}),`, `,(0,V.jsx)(t.code,{children:`data-hovered`}),`, `,(0,V.jsx)(t.code,{children:`data-pressed`}),`, `,(0,V.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,V.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-css`,children:`.my-toggle-group [data-selected] {
  background-color: #09757a;
  color: #fff;
}

.my-toggle-group [data-focus-visible] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.my-toggle-group [data-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
`})}),`
`,(0,V.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,V.jsxs)(t.p,{children:[`Individual components can be styled by passing `,(0,V.jsx)(t.code,{children:`className`}),` props:`]}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-jsx`,children:`<ToggleButtonGroup aria-label="View" className="custom-toggle-group">
  <ToggleButton id="list" className="custom-item">List</ToggleButton>
  <ToggleButton id="grid" className="custom-item">Grid</ToggleButton>
</ToggleButtonGroup>
`})}),`
`,(0,V.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,V.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,V.jsxs)(t.table,{children:[(0,V.jsx)(t.thead,{children:(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.th,{children:`Key`}),(0,V.jsx)(t.th,{children:`Action`})]})}),(0,V.jsxs)(t.tbody,{children:[(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.td,{children:(0,V.jsx)(t.strong,{children:`Tab`})}),(0,V.jsx)(t.td,{children:`Moves focus to/from the button group (single tab stop)`})]}),(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.td,{children:(0,V.jsx)(t.strong,{children:`Arrow Left / Right`})}),(0,V.jsx)(t.td,{children:`Move focus between items (RAC automatically reverses in RTL)`})]}),(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.td,{children:(0,V.jsx)(t.strong,{children:`Space / Enter`})}),(0,V.jsx)(t.td,{children:`Toggle the focused item`})]}),(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.td,{children:(0,V.jsx)(t.strong,{children:`Home`})}),(0,V.jsx)(t.td,{children:`Move focus to the first item`})]}),(0,V.jsxs)(t.tr,{children:[(0,V.jsx)(t.td,{children:(0,V.jsx)(t.strong,{children:`End`})}),(0,V.jsx)(t.td,{children:`Move focus to the last item`})]})]})]}),`
`,(0,V.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,V.jsxs)(t.ul,{children:[`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.code,{children:`selectionMode="single"`}),` → `,(0,V.jsx)(t.code,{children:`role="radiogroup"`}),` on container, `,(0,V.jsx)(t.code,{children:`role="radio"`}),` + `,(0,V.jsx)(t.code,{children:`aria-checked`}),` per item`]}),`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.code,{children:`selectionMode="multiple"`}),` → `,(0,V.jsx)(t.code,{children:`role="toolbar"`}),` on container, `,(0,V.jsx)(t.code,{children:`role="button"`}),` + `,(0,V.jsx)(t.code,{children:`aria-pressed`}),` per item`]}),`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.code,{children:`aria-label`}),` (or `,(0,V.jsx)(t.code,{children:`aria-labelledby`}),`) is required on the group container`]}),`
`,(0,V.jsxs)(t.li,{children:[`Icon-only items require `,(0,V.jsx)(t.code,{children:`aria-label`}),` on each `,(0,V.jsx)(t.code,{children:`ToggleButton`})]}),`
`]}),`
`,(0,V.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,V.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both selectedKeys and defaultSelectedKeys
<ToggleButtonGroup selectedKeys={keys} defaultSelectedKeys={['day']}>
  <ToggleButton id="day">Day</ToggleButton>
</ToggleButtonGroup>

// ✅ Controlled mode
<ToggleButtonGroup selectedKeys={keys} onSelectionChange={setKeys}>
  <ToggleButton id="day">Day</ToggleButton>
</ToggleButtonGroup>

// ✅ Uncontrolled mode
<ToggleButtonGroup defaultSelectedKeys={['day']}>
  <ToggleButton id="day">Day</ToggleButton>
</ToggleButtonGroup>
`})}),`
`,(0,V.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-item {
  background-color: red;
}

/* ✅ Use data attributes with className for higher specificity */
.my-toggle-group [data-selected] {
  background-color: red;
}
`})}),`
`,(0,V.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focus-visible] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-toggle-group [data-focus-visible] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,V.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,V.jsx)(t.h3,{id:`when-to-use`,children:`When to Use`}),`
`,(0,V.jsxs)(t.ul,{children:[`
`,(0,V.jsx)(t.li,{children:`✅ For grouped contextual actions — two or more closely related actions that belong together (e.g. Bold / Italic / Underline, Align Left / Center / Right)`}),`
`,(0,V.jsx)(t.li,{children:`✅ For compact action grouping — related actions in space-constrained layouts (e.g. Undo / Redo, Zoom In / Out / Reset)`}),`
`,(0,V.jsx)(t.li,{children:`✅ For multi-select scenarios — when users need to select multiple options simultaneously`}),`
`,(0,V.jsx)(t.li,{children:`❌ For unrelated actions that perform disconnected tasks without shared context`}),`
`,(0,V.jsxs)(t.li,{children:[`❌ For more than 5 choices — cognitive overload; consider a `,(0,V.jsx)(t.strong,{children:`Select`}),` instead`]}),`
`,(0,V.jsx)(t.li,{children:`❌ When actions require strong visual distinction (e.g. Save vs. Delete)`}),`
`,(0,V.jsx)(t.li,{children:`❌ When selecting an option leads to a different page or workflow — use navigation instead`}),`
`,(0,V.jsxs)(t.li,{children:[`❌ For mutually exclusive content views (e.g. Monthly / Yearly) — use `,(0,V.jsx)(t.strong,{children:`SegmentedController`}),` instead`]}),`
`]}),`
`,(0,V.jsx)(t.h3,{id:`keep-variants-consistent`,children:`Keep Variants Consistent`}),`
`,(0,V.jsx)(t.p,{children:`Avoid mixing different content types (text-only, icon-only, icon+text) within the same group. Mixing styles creates visual noise and makes the set feel fragmented rather than unified.`}),`
`,(0,V.jsx)(t.h3,{id:`balance-label-lengths`,children:`Balance Label Lengths`}),`
`,(0,V.jsx)(t.p,{children:`Keep button labels of similar length. Large differences in text length cause irregular button widths and make the group appear uneven. Prefer short, concise wording.`}),`
`,(0,V.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,V.jsx)(t.p,{children:`Align the group to reflect its relationship to surrounding content:`}),`
`,(0,V.jsxs)(t.ul,{children:[`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.strong,{children:`Left`}),` — when the group controls content directly below or within the same column (dashboards, tables).`]}),`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.strong,{children:`Center`}),` — when the group acts as a prominent toggle affecting an entire section or page.`]}),`
`,(0,V.jsxs)(t.li,{children:[(0,V.jsx)(t.strong,{children:`Right`}),` — when the group represents utility or contextual controls (e.g. grid/list view toggle).`]}),`
`]}),`
`,(0,V.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,V.jsxs)(t.ul,{children:[`
`,(0,V.jsxs)(t.li,{children:[`Use `,(0,V.jsx)(t.strong,{children:`title case`}),`: capitalize the first letter of each word, except short prepositions.`]}),`
`,(0,V.jsx)(t.li,{children:`Keep labels to one or two words. Omit articles (a, an, the) and filler words.`}),`
`,(0,V.jsx)(t.li,{children:`Prefer action-focused or descriptive language that communicates the option instantly.`}),`
`]}),`
`,(0,V.jsx)(t.h3,{id:`icon-only-items`,children:`Icon-Only Items`}),`
`,(0,V.jsxs)(t.p,{children:[`Use icon-only items only when the icon's meaning is universally recognized. Always provide an `,(0,V.jsx)(t.code,{children:`aria-label`}),` on each icon-only `,(0,V.jsx)(t.code,{children:`ToggleButton`}),`:`]}),`
`,(0,V.jsx)(t.pre,{children:(0,V.jsx)(t.code,{className:`language-tsx`,children:`<ToggleButton id="list" aria-label="List view">
  <Icon icon="bulleted-list" />
</ToggleButton>
`})})]})}function B(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,V.jsx)(t,{...e,children:(0,V.jsx)(z,{...e})}):z(e)}var V;e((()=>{V=t(),c(),s(),S(),w(),E(),O(),A(),M(),P(),I(),R(),b()}))();export{B as default};