import{j as e}from"./iframe-BQo81cX5.js";import{u as s,M as r,A as d,a as n,S as o}from"./blocks-D40TWfPg.js";import{S as a,P as c,D as g,M as u,C as h,a as p,b as x,I as m,c as j,W as T,R as y}from"./toggle-button.stories-C2OR9C8t.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4vCilNW6.js";import"./index-DgwHFz0H.js";import"./index-ns4hd72K.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./ToggleButton-j3K2E4ME.js";import"./Text-BXAFqKb0.js";import"./SSRProvider-DbNrytmr.js";import"./SelectionIndicator-B1TcoGgg.js";import"./SharedElementTransition-CvB0LCF7.js";import"./Button-BONVOPKW.js";import"./ProgressBar-CbNr0uGk.js";import"./useLabel-CxSbOIQ6.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-DZdY1YND.js";import"./number-P4c4HRxZ.js";import"./useHover-BfbAv8dL.js";import"./useFocusRing-DHiMMysQ.js";import"./FocusScope-D41WX2hc.js";import"./useControlledState-CcPFMwGz.js";import"./useToggleState-S_f55ap9.js";import"./index-IR1Fs-_n.js";import"./index-D6Jjajys.js";import"./index-BKideCSp.js";import"./index-CSAEVYVz.js";import"./index-BKcMW1wv.js";import"./slots-gxdXh3-A.js";import"./index-DWoPlmc9.js";import"./index-CLj43KZG.js";import"./index-DtQrBc1g.js";import"./index-60QUrdxT.js";import"./create-external-store-TtP3UJpK.js";import"./index-CuMxKIpi.js";import"./client-CjDxRmut.js";import"./index-BXtJ1pza.js";import"./rtl-locale-provider-3KcWxJJD.js";import"./index-D0DxxL7E.js";import"./Dialog-C9S6tWyx.js";import"./Heading-BaFmuuCw.js";import"./animation-CpC8xnar.js";import"./Collection-D8ZCOB2A.js";import"./Autocomplete-BlhJgApI.js";import"./useLocalizedStringFormatter-UxfUSOvb.js";import"./useCollator-DOaNmk-f.js";import"./useEvent-Bm81J4Jv.js";import"./VisuallyHidden-BnbrII6R.js";import"./index-B5roP8fG.js";const f=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
`,B=`import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

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
`,S=`import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

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
`,v=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
`,M=`import { ToggleButtonGroup, ToggleButton, Icon } from '@godaddy/antares';

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
`,I=`import { useState } from 'react';
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
`,G=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { DefaultExample } from './default.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <DefaultExample />
    </RTLProvider>
  );
}
`;function l(i){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"togglebutton",children:"ToggleButton"}),`
`,e.jsx(t.p,{children:"Accessible toggle button component for grouped contextual actions with single or multiple selection, keyboard navigation, and RTL-aware layouts."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default-single-selection",children:"Default (Single Selection)"}),`
`,e.jsxs(t.p,{children:["A ",e.jsx(t.code,{children:"ToggleButton"})," toggles between selected and unselected. Wrap multiple inside a ",e.jsx(t.code,{children:"ToggleButtonGroup"})," to link them with shared selection and keyboard navigation — ",e.jsx(t.code,{children:"defaultSelectedKeys"})," sets the initial selection."]}),`
`,e.jsx(n,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(t.h3,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:'selectionMode="multiple"'})," to allow more than one item to be active at a time."]}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:B}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"selectedKeys"})," and ",e.jsx(t.code,{children:"onSelectionChange"})," to control selection from parent state — ",e.jsx(t.code,{children:"onSelectionChange"})," receives a ",e.jsx(t.code,{children:"Set<string>"})," of the selected item ",e.jsx(t.code,{children:"id"})," values."]}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsxs(t.p,{children:["Disable the entire group with ",e.jsx(t.code,{children:"isDisabled"})," on the container, or disable individual items with ",e.jsx(t.code,{children:"isDisabled"})," on specific ",e.jsx(t.code,{children:"ToggleButton"})," elements."]}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:["Two sizes are available: ",e.jsx(t.code,{children:"sm"})," and ",e.jsx(t.code,{children:"md"})," (default)."]}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:w}),`
`,e.jsx(t.h3,{id:"icon--text",children:"Icon + Text"}),`
`,e.jsxs(t.p,{children:["Items can include an ",e.jsx(t.code,{children:"Icon"})," alongside text for added visual context."]}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(t.h3,{id:"icon-only",children:"Icon Only"}),`
`,e.jsxs(t.p,{children:["For compact layouts, items can contain only icons. Padding adjusts automatically to keep the button square — no extra prop required. Always provide an ",e.jsx(t.code,{children:"aria-label"})," on each icon-only item so screen readers can identify the action."]}),`
`,e.jsx(n,{of:j,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:M}),`
`,e.jsx(t.h3,{id:"with-dropdown",children:"With Dropdown"}),`
`,e.jsxs(t.p,{children:["Wrap a ",e.jsx(t.code,{children:"ToggleButton"})," in a ",e.jsx(t.code,{children:"MenuTrigger"})," to add sub-options to a group item."]}),`
`,e.jsx(n,{of:T,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:I}),`
`,e.jsx(t.h3,{id:"rtl-direction",children:"RTL Direction"}),`
`,e.jsx(t.p,{children:"The group follows the document's layout direction, detected automatically from the browser locale."}),`
`,e.jsx(n,{of:y,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:G}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"Components automatically add data attributes for styling different states:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"ToggleButtonGroup Container:"})," ",e.jsx(t.code,{children:"data-size"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"ToggleButton Item:"})," ",e.jsx(t.code,{children:"data-selected"}),", ",e.jsx(t.code,{children:"data-hovered"}),", ",e.jsx(t.code,{children:"data-pressed"}),", ",e.jsx(t.code,{children:"data-focus-visible"}),", ",e.jsx(t.code,{children:"data-disabled"})]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`.my-toggle-group [data-selected] {
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
`,e.jsx(t.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(t.p,{children:["Individual components can be styled by passing ",e.jsx(t.code,{children:"className"})," props:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<ToggleButtonGroup aria-label="View" className="custom-toggle-group">
  <ToggleButton id="list" className="custom-item">List</ToggleButton>
  <ToggleButton id="grid" className="custom-item">Grid</ToggleButton>
</ToggleButtonGroup>
`})}),`
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
`,e.jsx(t.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(t.h3,{id:"selection-not-updating",children:"Selection Not Updating"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`// ❌ Wrong: Using both selectedKeys and defaultSelectedKeys
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
`,e.jsx(t.h3,{id:"styling-overrides-not-applying",children:"Styling Overrides Not Applying"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`/* ❌ May not have enough specificity */
.my-custom-item {
  background-color: red;
}

/* ✅ Use data attributes with className for higher specificity */
.my-toggle-group [data-selected] {
  background-color: red;
}
`})}),`
`,e.jsx(t.h3,{id:"keyboard-navigation-not-working",children:"Keyboard Navigation Not Working"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`/* ❌ Don't remove focus outlines without replacement */
[data-focus-visible] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-toggle-group [data-focus-visible] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(t.h3,{id:"when-to-use",children:"When to Use"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"✅ For grouped contextual actions — two or more closely related actions that belong together (e.g. Bold / Italic / Underline, Align Left / Center / Right)"}),`
`,e.jsx(t.li,{children:"✅ For compact action grouping — related actions in space-constrained layouts (e.g. Undo / Redo, Zoom In / Out / Reset)"}),`
`,e.jsx(t.li,{children:"✅ For multi-select scenarios — when users need to select multiple options simultaneously"}),`
`,e.jsx(t.li,{children:"❌ For unrelated actions that perform disconnected tasks without shared context"}),`
`,e.jsxs(t.li,{children:["❌ For more than 5 choices — cognitive overload; consider a ",e.jsx(t.strong,{children:"Select"})," instead"]}),`
`,e.jsx(t.li,{children:"❌ When actions require strong visual distinction (e.g. Save vs. Delete)"}),`
`,e.jsx(t.li,{children:"❌ When selecting an option leads to a different page or workflow — use navigation instead"}),`
`,e.jsxs(t.li,{children:["❌ For mutually exclusive content views (e.g. Monthly / Yearly) — use ",e.jsx(t.strong,{children:"SegmentedController"})," instead"]}),`
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
`,e.jsx(t.h3,{id:"label-guidelines",children:"Label Guidelines"}),`
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
`})})]})}function Me(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(l,{...i})}):l(i)}export{Me as default};
