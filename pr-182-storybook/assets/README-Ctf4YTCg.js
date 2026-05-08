import{j as e}from"./iframe-DG3Ay5l6.js";import{useMDXComponents as s}from"./index-kiLheNkG.js";import{M as l,A as d,a as n,S as o}from"./blocks-BrTOzewo.js";import{S as c,P as a,D as u,M as p,C as h,a as m,I as x,b as g,W as j,R as f,c as I}from"./button-group.stories-CKdWyT_M.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aIEYDSX2.js";import"./index-CAibReNU.js";import"./index-BC4nUMpV.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./ToggleButton-BEbVKckN.js";import"./Text-o_ffsxuH.js";import"./mergeProps-jw9f8g2-.js";import"./SSRProvider-CSccm5Hk.js";import"./useObjectRef-Bt7AoTYy.js";import"./SelectionIndicator-BKwifFsc.js";import"./filterDOMProps-BNnC3YgW.js";import"./useControlledState-km3iKmG6.js";import"./useButton-C8pLwjs7.js";import"./usePress-uzsrfJ-c.js";import"./utils-DAMIA-d-.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BKJHOq_P.js";import"./useHover-Dxf8G8v1.js";import"./platform-BULRNHlZ.js";import"./FocusScope-Dgf4Tzdf.js";import"./context-DtTDjPrb.js";import"./useToggleState-4yttYVDr.js";import"./useFocusRing-BuYVPqFf.js";import"./useFocusWithin-CZtRim9f.js";import"./index-dMgh0xEH.js";import"./index-Cb4ao8WG.js";import"./index-1osl4Qgs.js";import"./index-CUmQUz9T.js";import"./index-CUP1lm4b.js";import"./slots-B2G1OXBw.js";import"./index-BiMXcAtJ.js";import"./index-CLj43KZG.js";import"./index-DoDl_Hk-.js";import"./index-DdtYI0mb.js";import"./create-external-store-TtP3UJpK.js";import"./index-CfNyJ-c3.js";import"./client-BYFtKW75.js";import"./index-oK3OtEve.js";import"./rtl-locale-provider-B56R05El.js";import"./index-B6DWkUK5.js";import"./Dialog-DEv3sJth.js";import"./Button-B4451itJ.js";import"./Hidden-Cv0KDwMz.js";import"./RSPContexts-C21p4uNp.js";import"./OverlayArrow--wJCRdpV.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C-jYM_Nr.js";import"./Collection-DivT1Z16.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-Cxqozi7q.js";import"./Overlay-CcfI1CyU.js";import"./PortalProvider-BEyJjS_d.js";import"./useLocalizedStringFormatter-BE3-kXmZ.js";import"./usePreventScroll-CoGi7r6Y.js";import"./useLabels-D6yUodzK.js";import"./VisuallyHidden-BIHtrsfH.js";import"./index-D00NLFGA.js";const B=`import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week">Week</ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
    </ButtonGroup>
  );
}
`,G=`import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <ButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ButtonGroupItem id="bold">Bold</ButtonGroupItem>
      <ButtonGroupItem id="italic">Italic</ButtonGroupItem>
      <ButtonGroupItem id="underline">Underline</ButtonGroupItem>
    </ButtonGroup>
  );
}
`,y=`import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['week']));

  return (
    <>
      <ButtonGroup
        aria-label="View"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={(keys) => setSelected(keys as Set<string>)}
      >
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>
      <p>Current selection: {Array.from(selected).join(', ')}</p>
    </>
  );
}
`,b=`import { ButtonGroup, ButtonGroupItem, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ButtonGroup aria-label="Size sm" size="sm" defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>

      <ButtonGroup aria-label="Size md" size="md" defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>
    </Flex>
  );
}
`,w=`import { ButtonGroup, ButtonGroupItem, Icon } from '@godaddy/antares';

export function IconOnlyExample() {
  return (
    <ButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ButtonGroupItem id="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </ButtonGroupItem>
      <ButtonGroupItem id="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
`,S=`import { ButtonGroup, ButtonGroupItem, Icon } from '@godaddy/antares';

export function IconAndTextExample() {
  return (
    <ButtonGroup aria-label="Layout" defaultSelectedKeys={['list']} selectionMode="single">
      <ButtonGroupItem id="list">
        <Icon icon="bulleted-list" />
        List
      </ButtonGroupItem>
      <ButtonGroupItem id="grid">
        <Icon icon="grid" />
        Grid
      </ButtonGroupItem>
    </ButtonGroup>
  );
}
`,M=`import { ButtonGroup, ButtonGroupItem, Flex } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <label>Disabled group</label>
      <ButtonGroup aria-label="Disabled group" isDisabled defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>

      <label>Individual disabled item</label>
      <ButtonGroup aria-label="Individual disabled" defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week" isDisabled>
          Week
        </ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>
    </Flex>
  );
}
`,v=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { DefaultExample } from './default.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <DefaultExample />
    </RTLProvider>
  );
}
`,L=`import { useState } from 'react';
import { ButtonGroup, ButtonGroupItem, Icon, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

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
    <ButtonGroup
      aria-label="Text formatting"
      selectionMode="multiple"
      selectedKeys={formatting}
      onSelectionChange={(keys) => setFormatting(new Set([...(keys as Set<string>)].filter((k) => k !== 'align')))}
    >
      <ButtonGroupItem id="bold" aria-label="Bold">
        <Icon icon="bold" />
      </ButtonGroupItem>
      <ButtonGroupItem id="italic" aria-label="Italic">
        <Icon icon="italic" />
      </ButtonGroupItem>

      <MenuTrigger>
        <ButtonGroupItem id="align" aria-label={ALIGNMENT_LABELS[alignment]}>
          <Icon icon={ALIGNMENT_ICONS[alignment]} />
          <Icon icon="chevron-down" />
        </ButtonGroupItem>
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
    </ButtonGroup>
  );
}
`;function r(i){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(t.h1,{id:"buttongroup",children:"ButtonGroup"}),`
`,e.jsx(t.p,{children:"Organizes multiple related buttons into a single, cohesive unit with consistent spacing, alignment, and interaction behavior. Supports single or multiple selection."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:a}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default-single-selection",children:"Default (Single Selection)"}),`
`,e.jsxs(t.p,{children:["An uncontrolled button group with a default selection. The component manages its own state via ",e.jsx(t.code,{children:"defaultSelectedKeys"}),"."]}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:B}),`
`,e.jsx(t.h3,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:'selectionMode="multiple"'})," to allow more than one item to be active at a time."]}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:G}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"selectedKeys"})," and ",e.jsx(t.code,{children:"onSelectionChange"}),` to fully control selection from parent state.
`,e.jsx(t.code,{children:"onSelectionChange"})," receives a ",e.jsx(t.code,{children:"Set<string>"})," containing the ",e.jsx(t.code,{children:"id"})," values of the selected items."]}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:["Two sizes are available: ",e.jsx(t.code,{children:"sm"})," and ",e.jsx(t.code,{children:"md"})," (default)."]}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"icon--text",children:"Icon + Text"}),`
`,e.jsxs(t.p,{children:["Items can include an ",e.jsx(t.code,{children:"Icon"})," alongside text for added visual context."]}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(t.h3,{id:"icon-only",children:"Icon Only"}),`
`,e.jsxs(t.p,{children:["For compact layouts, items can contain only icons. Padding adjusts automatically to keep the button square — no extra prop required. Always provide an ",e.jsx(t.code,{children:"aria-label"})," on each icon-only item so screen readers can identify the action."]}),`
`,e.jsx(n,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:w}),`
`,e.jsx(t.h3,{id:"with-dropdown",children:"With Dropdown"}),`
`,e.jsxs(t.p,{children:["Use a ",e.jsx(t.code,{children:"MenuTrigger"})," inside a ",e.jsx(t.code,{children:"ButtonGroup"})," when one of the actions has sub-options."]}),`
`,e.jsx(n,{of:j,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:L}),`
`,e.jsx(t.h3,{id:"rtl-direction",children:"RTL Direction"}),`
`,e.jsxs(t.p,{children:["The button group follows the current layout direction (LTR or RTL). Direction is detected automatically from the browser or system settings via RAC's ",e.jsx(t.code,{children:"I18nProvider"}),"."]}),`
`,e.jsx(n,{of:f,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(t.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsxs(t.p,{children:["Disable the entire group with ",e.jsx(t.code,{children:"isDisabled"})," on the container, or disable individual items with ",e.jsx(t.code,{children:"isDisabled"})," on specific ",e.jsx(t.code,{children:"ButtonGroupItem"})," elements."]}),`
`,e.jsx(n,{of:I,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:M}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Key"}),e.jsx(t.th,{children:"Action"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Tab"})}),e.jsx(t.td,{children:"Moves focus to/from the button group (single tab stop)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Arrow Left / Right"})}),e.jsx(t.td,{children:"Move focus between items (RAC automatically reverses in RTL)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Space / Enter"})}),e.jsx(t.td,{children:"Toggle the focused item"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Home"})}),e.jsx(t.td,{children:"Move focus to the first item"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"End"})}),e.jsx(t.td,{children:"Move focus to the last item"})]})]})]}),`
`,e.jsx(t.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'selectionMode="single"'})," → ",e.jsx(t.code,{children:'role="radiogroup"'})," on container, ",e.jsx(t.code,{children:'role="radio"'})," + ",e.jsx(t.code,{children:"aria-checked"})," per item"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'selectionMode="multiple"'})," → ",e.jsx(t.code,{children:'role="toolbar"'})," on container, ",e.jsx(t.code,{children:'role="button"'})," + ",e.jsx(t.code,{children:"aria-pressed"})," per item"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"aria-label"})," (or ",e.jsx(t.code,{children:"aria-labelledby"}),") is required on the group container"]}),`
`,e.jsxs(t.li,{children:["Icon-only items require ",e.jsx(t.code,{children:"aria-label"})," on each ",e.jsx(t.code,{children:"ButtonGroupItem"})]}),`
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
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"View switching"})," — use ",e.jsx(t.strong,{children:"SegmentedController"})," when selecting between mutually exclusive content views (e.g. Monthly / Yearly, Overview / Details). Quick rule: if it triggers an action → ButtonGroup; if it switches between views → SegmentedController."]}),`
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
`,e.jsxs(t.p,{children:["Use icon-only items only when the icon's meaning is universally recognized. Always provide an ",e.jsx(t.code,{children:"aria-label"})," on each icon-only ",e.jsx(t.code,{children:"ButtonGroupItem"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<ButtonGroupItem id="list" aria-label="List view">
  <Icon icon="bulleted-list" />
</ButtonGroupItem>
`})}),`
`,e.jsx(t.h2,{id:"open-questions",children:"Open Questions"}),`
`,e.jsx(t.p,{children:"The following items need design or stakeholder input before v1 ships:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Focus indicator"}),": Figma specifies a fixed blue (",e.jsx(t.code,{children:"#1976d2"}),") 1 px border + 2 px inset shadow. The current implementation uses ",e.jsx(t.code,{children:"outline: 2px solid Highlight"})," for cross-component consistency and OS-preference respect. Confirm whether Figma's brand-blue should override this."]}),`
`]})]})}function Fe(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{Fe as default};
