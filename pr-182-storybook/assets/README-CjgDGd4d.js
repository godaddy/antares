import{j as e}from"./iframe-FizPR52R.js";import{useMDXComponents as r}from"./index-CYlWwwKA.js";import{M as s,A as d,a as n,S as o}from"./blocks-JxoEOWeE.js";import{S as a,P as c,D as g,M as u,C as h,a as p,I as x,b as m,W as j,R as T,c as f}from"./toggle-button-group.stories-_vwLuvAO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BtUkGQ9d.js";import"./index-R0fMKMBX.js";import"./index-CrXPsRGT.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./ToggleButton-sA0ZX-8r.js";import"./Text-3vU_939k.js";import"./mergeProps-9Am4NR0I.js";import"./SSRProvider-DDSV1Vs0.js";import"./useObjectRef-DnlaCVIn.js";import"./SelectionIndicator-CyQ8yf_G.js";import"./filterDOMProps-BNnC3YgW.js";import"./useControlledState-BZKzWP2Y.js";import"./useButton-DtixIwNP.js";import"./usePress-DeI64UOY.js";import"./utils-DkDEtTO9.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Dg3BZ-Kf.js";import"./useHover-hy5lvGvb.js";import"./platform-BULRNHlZ.js";import"./FocusScope-D8HqnHKn.js";import"./context-Bcbf-1VZ.js";import"./useToggleState-DBxKtTOi.js";import"./useFocusRing-CH-_2Iu_.js";import"./useFocusWithin-DNTW3fOk.js";import"./index-fOJowGxv.js";import"./index-uLcaEJqG.js";import"./index-CAgUBCpC.js";import"./index-D27gNeKN.js";import"./index-cx_hU3e7.js";import"./slots-BooHO7jD.js";import"./index-DX0Fy3Ol.js";import"./index-CLj43KZG.js";import"./index-tjD8p1qT.js";import"./index-B2SL3SGU.js";import"./create-external-store-TtP3UJpK.js";import"./index-BuOcoV4x.js";import"./client-BidA5Bnt.js";import"./index-mvHbFogg.js";import"./rtl-locale-provider-PS48P2et.js";import"./index-n0bKN08x.js";import"./Dialog-3vZxsTiZ.js";import"./Button-DsaOcjMy.js";import"./Hidden-MBZOZzXp.js";import"./RSPContexts-HdXEig3x.js";import"./OverlayArrow-DyzFkNzp.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BuGwh_Se.js";import"./Collection-BONqysM4.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-DMpVQSCA.js";import"./Overlay-LosBpD4F.js";import"./PortalProvider-Cluxesgh.js";import"./useLocalizedStringFormatter-CBj1XN80.js";import"./usePreventScroll-OB1b3WuO.js";import"./useLabels-Dv68jEKz.js";import"./VisuallyHidden-QXylZGA2.js";import"./index-DvFlFjnI.js";const B=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
`,y=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <ToggleButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">Italic</ToggleButton>
      <ToggleButton id="underline">Underline</ToggleButton>
    </ToggleButtonGroup>
  );
}
`,b=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';
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
`,w=`import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

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
`,S=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
`,M=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
`,v=`import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

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
`,I=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { DefaultExample } from './default.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <DefaultExample />
    </RTLProvider>
  );
}
`,G=`import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Icon, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

const ALIGNMENT_ICONS: Record<string, string> = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right'
};

const ALIGNMENT_LABELS: Record<string, string> = {
  left: 'Align Left',
  center: 'Align Center',
  right: 'Align Right'
};

export function WithDropdownExample() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set());
  const [alignment, setAlignment] = useState('left');

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
          selectedKeys={new Set([alignment])}
          onSelectionChange={function handleAlignmentChange(keys) {
            const next = [...(keys as Set<string>)][0];
            if (next) {
              setAlignment(next);
            }
          }}
        >
          <MenuItem id="left">{ALIGNMENT_LABELS.left}</MenuItem>
          <MenuItem id="center">{ALIGNMENT_LABELS.center}</MenuItem>
          <MenuItem id="right">{ALIGNMENT_LABELS.right}</MenuItem>
        </Menu>
      </MenuTrigger>
    </ToggleButtonGroup>
  );
}
`;function l(i){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"togglebuttongroup",children:"ToggleButtonGroup"}),`
`,e.jsx(t.p,{children:"Organizes multiple related buttons into a single, cohesive unit with consistent spacing, alignment, and interaction behavior. Supports single or multiple selection."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default-single-selection",children:"Default (Single Selection)"}),`
`,e.jsxs(t.p,{children:["An uncontrolled toggle button group with a default selection. The component manages its own state via ",e.jsx(t.code,{children:"defaultSelectedKeys"}),"."]}),`
`,e.jsx(n,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:B}),`
`,e.jsx(t.h3,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:'selectionMode="multiple"'})," to allow more than one item to be active at a time."]}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"selectedKeys"})," and ",e.jsx(t.code,{children:"onSelectionChange"}),` to fully control selection from parent state.
`,e.jsx(t.code,{children:"onSelectionChange"})," receives a ",e.jsx(t.code,{children:"Set<string>"})," containing the ",e.jsx(t.code,{children:"id"})," values of the selected items."]}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:["Two sizes are available: ",e.jsx(t.code,{children:"sm"})," and ",e.jsx(t.code,{children:"md"})," (default)."]}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:w}),`
`,e.jsx(t.h3,{id:"icon--text",children:"Icon + Text"}),`
`,e.jsxs(t.p,{children:["Items can include an ",e.jsx(t.code,{children:"Icon"})," alongside text for added visual context."]}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:M}),`
`,e.jsx(t.h3,{id:"icon-only",children:"Icon Only"}),`
`,e.jsxs(t.p,{children:["For compact layouts, items can contain only icons. Padding adjusts automatically to keep the button square — no extra prop required. Always provide an ",e.jsx(t.code,{children:"aria-label"})," on each icon-only item so screen readers can identify the action."]}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(t.h3,{id:"with-dropdown",children:"With Dropdown"}),`
`,e.jsxs(t.p,{children:["Use a ",e.jsx(t.code,{children:"MenuTrigger"})," inside a ",e.jsx(t.code,{children:"ToggleButtonGroup"})," when one of the actions has sub-options."]}),`
`,e.jsx(n,{of:j,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:G}),`
`,e.jsx(t.h3,{id:"rtl-direction",children:"RTL Direction"}),`
`,e.jsxs(t.p,{children:["The button group follows the current layout direction (LTR or RTL). Direction is detected automatically from the browser or system settings via RAC's ",e.jsx(t.code,{children:"I18nProvider"}),"."]}),`
`,e.jsx(n,{of:T,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:I}),`
`,e.jsx(t.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsxs(t.p,{children:["Disable the entire group with ",e.jsx(t.code,{children:"isDisabled"})," on the container, or disable individual items with ",e.jsx(t.code,{children:"isDisabled"})," on specific ",e.jsx(t.code,{children:"ToggleButton"})," elements."]}),`
`,e.jsx(n,{of:f,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Key"}),e.jsx(t.th,{children:"Action"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Tab"})}),e.jsx(t.td,{children:"Moves focus to/from the button group (single tab stop)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Arrow Left / Right"})}),e.jsx(t.td,{children:"Move focus between items (RAC automatically reverses in RTL)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Space / Enter"})}),e.jsx(t.td,{children:"Toggle the focused item"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Home"})}),e.jsx(t.td,{children:"Move focus to the first item"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"End"})}),e.jsx(t.td,{children:"Move focus to the last item"})]})]})]}),`
`,e.jsx(t.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'selectionMode="single"'})," → ",e.jsx(t.code,{children:'role="radiogroup"'})," on container, ",e.jsx(t.code,{children:'role="radio"'})," + ",e.jsx(t.code,{children:"aria-checked"})," per item"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'selectionMode="multiple"'})," → ",e.jsx(t.code,{children:'role="toolbar"'})," on container, ",e.jsx(t.code,{children:'role="button"'})," + ",e.jsx(t.code,{children:"aria-pressed"})," per item"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"aria-label"})," (or ",e.jsx(t.code,{children:"aria-labelledby"}),") is required on the group container"]}),`
`,e.jsxs(t.li,{children:["Icon-only items require ",e.jsx(t.code,{children:"aria-label"})," on each ",e.jsx(t.code,{children:"ToggleButton"})]}),`
`]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(t.h3,{id:"when-to-use",children:"When to Use"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Grouped contextual actions"})," — two or more closely related actions that belong together (e.g. Bold / Italic / Underline, Align Left / Center / Right)."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Compact action grouping"})," — related actions in space-constrained layouts (e.g. Undo / Redo, Zoom In / Out / Reset)."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Multi-select scenarios"})," — when users need to select multiple options simultaneously."]}),`
`]}),`
`,e.jsx(t.h3,{id:"when-not-to-use",children:"When Not to Use"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Unrelated actions"})," — buttons that perform disconnected tasks without shared context."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Too many options"})," — more than 5 choices creates cognitive overload; consider a ",e.jsx(t.strong,{children:"Select"})," instead."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Primary vs. destructive actions"})," — when actions require strong visual distinction (e.g. Save vs. Delete)."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Full navigation changes"})," — when selecting an option leads to a different page or workflow."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"View switching"})," — use ",e.jsx(t.strong,{children:"SegmentedController"})," when selecting between mutually exclusive content views (e.g. Monthly / Yearly, Overview / Details). Quick rule: if it triggers an action → ToggleButtonGroup; if it switches between views → SegmentedController."]}),`
`]}),`
`,e.jsx(t.h3,{id:"keep-variants-consistent",children:"Keep Variants Consistent"}),`
`,e.jsx(t.p,{children:"Avoid mixing different content types (text-only, icon-only, icon+text) within the same group. Mixing styles creates visual noise and makes the set feel fragmented rather than unified."}),`
`,e.jsx(t.h3,{id:"balance-label-lengths",children:"Balance Label Lengths"}),`
`,e.jsx(t.p,{children:"Keep button labels of similar length. Large differences in text length cause irregular button widths and make the group appear uneven. Prefer short, concise wording."}),`
`,e.jsx(t.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsx(t.p,{children:"Align the group to reflect its relationship to surrounding content:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Left"})," — when the group controls content directly below or within the same column (dashboards, tables)."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Center"})," — when the group acts as a prominent toggle affecting an entire section or page."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Right"})," — when the group represents utility or contextual controls (e.g. grid/list view toggle)."]}),`
`]}),`
`,e.jsx(t.h3,{id:"labels",children:"Labels"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.strong,{children:"title case"}),": capitalize the first letter of each word, except short prepositions."]}),`
`,e.jsx(t.li,{children:"Keep labels to one or two words. Omit articles (a, an, the) and filler words."}),`
`,e.jsx(t.li,{children:"Prefer action-focused or descriptive language that communicates the option instantly."}),`
`]}),`
`,e.jsx(t.h3,{id:"icon-only-items",children:"Icon-Only Items"}),`
`,e.jsxs(t.p,{children:["Use icon-only items only when the icon's meaning is universally recognized. Always provide an ",e.jsx(t.code,{children:"aria-label"})," on each icon-only ",e.jsx(t.code,{children:"ToggleButton"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<ToggleButton id="list" aria-label="List view">
  <Icon icon="bulleted-list" />
</ToggleButton>
`})})]})}function ze(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(l,{...i})}):l(i)}export{ze as default};
