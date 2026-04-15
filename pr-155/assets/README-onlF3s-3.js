import{j as e}from"./iframe-DJ60jm-Y.js";import{useMDXComponents as d}from"./index-HeHejDaM.js";import{M as o,A as l,a as n,S as s}from"./blocks-133quRs-.js";import{S as a,P as c,B as h,L as p,T as m,I as x}from"./field-frame.stories-Rh4Xy1cg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D_ua2sNt.js";import"./index-pn1VKk7h.js";import"./index-DJH_JplX.js";import"./index-DrFu-skq.js";import"./index-DrsGf9VV.js";import"./index-gZUnqPss.js";import"./clsx-6fn22u-m.js";import"./index-Cmgh3C0E.js";import"./mergeProps-CJ9PIXRF.js";import"./useObjectRef-B3hmSCry.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-tJIamKYF.js";import"./useFocusWithin-CJ2VVPzU.js";import"./platform-BULRNHlZ.js";import"./useFocusable-BgCWx-NI.js";import"./Collection-D6ohQoQ2.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-C6FpJsIB.js";import"./context-CzspUdIR.js";import"./useControlledState-Bf7BJCaP.js";import"./useOverlayTriggerState-DCd891kF.js";import"./PortalProvider-D6BOTwf3.js";import"./usePreventScroll-DhI2x8M-.js";import"./useLabel-gHHLROxJ.js";import"./VisuallyHidden-C6FjrIkK.js";import"./useField-C6WMW9Vf.js";import"./useButton-RyCyaWsB.js";import"./index-Cij7k7x0.js";import"./index-RAEhFgzt.js";import"./slots--TLLLnr_.js";import"./index-BPClX71o.js";import"./index-CLj43KZG.js";import"./index-BSycw5ha.js";import"./index-C3ueiTbZ.js";import"./create-external-store-TtP3UJpK.js";import"./index-o9YusXH0.js";import"./client-QgVLDxS3.js";import"./index-DK7pp-_D.js";import"./index-Detqy3NL.js";const j=`import { FieldFrame, Button, FieldFrameProps, Flex } from '@godaddy/antares';

export function FieldFrameTrailingControl(props: FieldFrameProps) {
  return (
    <FieldFrame label="Search" isRequired description="Search by keyword" {...props}>
      <Flex flex={1} />
      <Button aria-label="Search">Search</Button>
    </FieldFrame>
  );
}
`,u=`import { FieldFrame, Icon, FieldFrameProps, Button, Flex } from '@godaddy/antares';

export function FieldFrameIconAccessories(props: FieldFrameProps) {
  return (
    <FieldFrame label="Email" description="Enter your email address" {...props}>
      <Icon icon="star" aria-hidden />
      <Flex flex={1} />
      <Button aria-label="Verify email address" size="sm" variant="minimal">
        Verify
      </Button>
    </FieldFrame>
  );
}
`,f=`import { FieldFrame, FieldFrameProps } from '@godaddy/antares';

export function FieldFrameBasic(props: FieldFrameProps) {
  return <FieldFrame {...props} />;
}
`;function t(i){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a,name:"Overview"}),`
`,e.jsx(r.h1,{id:"fieldframe",children:"FieldFrame"}),`
`,e.jsx(r.p,{children:"Field frame component with integrated Label, description Text, and FieldError for form fields"}),`
`,e.jsx(r.h1,{id:"fieldframe-1",children:"FieldFrame"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Internal component."})," FieldFrame is intended for internal use only. Use the public field components (TextField, NumberField, DateField, Select) instead; they compose FieldFrame internally."]}),`
`,e.jsxs(r.p,{children:["Field frame component using ",e.jsx(r.a,{href:"https://react-spectrum.adobe.com/react-aria/",rel:"nofollow",children:"React Aria Components"})," Provider pattern with integrated Label, description Text, and FieldError. Renders the shared frame (label, border, description, error) around field content and manages accessibility."]}),`
`,e.jsx(r.h2,{id:"features",children:"Features"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Visual frame"}),": Shared border, focus, disabled, and invalid styling around field content"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Focus delegation"}),": Tracks focus from any focusable child (input, button) via ",e.jsx(r.code,{children:"data-focus-within"})," and ",e.jsx(r.code,{children:"data-focus-visible"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Label, description, error"}),": Optional Label, helper Text, and FieldError with proper accessibility association"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Required indicator"}),": Shows asterisk next to label when the field is required"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"React Aria integration"}),": Uses Provider pattern so nested elements stay in sync with the frame"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Field wrapper composition"}),": Designed to sit inside TextField, NumberField, DateField, or Select as the main field UI"]}),`
`]}),`
`,e.jsx(r.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(r.h3,{id:"props",children:"Props"}),`
`,e.jsx(r.p,{children:"FieldFrame accepts the following props:"}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(r.h3,{id:"basic-example",children:"Basic example"}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:f}),`
`,e.jsxs(r.p,{children:["Examples for leading control, trailing control, and icon accessories are in ",e.jsx(r.a,{href:"#examples",children:"Examples"})," at the end."]}),`
`,e.jsx(r.h2,{id:"component-composition",children:"Component composition"}),`
`,e.jsx(r.h3,{id:"internal-structure",children:"Internal structure"}),`
`,e.jsxs(r.p,{children:["FieldFrame renders a single React Aria ",e.jsx(r.code,{children:"Provider"})," that supplies the necessary context to its children. Structure tree:"]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-text",children:`Provider
├── Label                     ← when label prop
├── Group.frame               ← border, focus/invalid/disabled styling
│   └── {children}            ← Input, Button, DateInput, SelectValue, etc.
├── FieldError                ← when errorMessage prop
└── Text[slot=description]    ← when description prop
`})}),`
`,e.jsx(r.p,{children:"The following list describes the internal React Aria components used to compose FieldFrame:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Label"})," (optional) — Rendered when ",e.jsx(r.code,{children:"label"})," is provided. Shows a required indicator (asterisk)."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Group"})," — The visual frame. Exposes ",e.jsx(r.code,{children:"data-focus-within"}),", ",e.jsx(r.code,{children:"data-focus-visible"}),", ",e.jsx(r.code,{children:"data-disabled"}),", and ",e.jsx(r.code,{children:"data-invalid"}),". All focusable children (input, button, etc.) live inside this Group."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"FieldError"})," (optional) — Rendered when ",e.jsx(r.code,{children:"errorMessage"})," is provided. Rendered below the Group, above the description. Associated with the field for accessibility."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Text"})," (optional) — Description block rendered when ",e.jsx(r.code,{children:"description"})," is provided."]}),`
`]}),`
`,e.jsxs(r.p,{children:["Children you pass to FieldFrame (e.g. ",e.jsx(r.code,{children:"Input"}),", ",e.jsx(r.code,{children:"Button"}),", ",e.jsx(r.code,{children:"DateInput"}),", ",e.jsx(r.code,{children:"SelectValue"}),") are rendered inside the Group. The provider ensures nested Input and Button read the same disabled/required state as the frame."]}),`
`,e.jsx(r.h3,{id:"states",children:"States"}),`
`,e.jsxs(r.p,{children:["The states ",e.jsx(r.strong,{children:"disabled"}),", ",e.jsx(r.strong,{children:"readonly"}),", and ",e.jsx(r.strong,{children:"invalid"})," are applied when the field wrapper (e.g. TextField, NumberField, Select) is marked as disabled, readonly, or invalid respectively. The frame reflects these and other states via data attributes on the group."]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"State"}),e.jsx(r.th,{children:"CSS Selector"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"disabled — Applied when the field wrapper is disabled."}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[data-disabled]"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"invalid — Applied when the field wrapper is invalid (e.g. validation failed)."}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[data-invalid]"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"readonly — Applied when the field wrapper is read only."}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[data-readonly]"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"focus — Whether an element within the frame has keyboard focus (for focus-ring styling)."}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[data-focus-visible]"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"focus-within — Whether an element within the frame is focused, via mouse or keyboard."}),e.jsx(r.td,{children:e.jsx(r.code,{children:"[data-focus-within]"})})]})]})]}),`
`,e.jsx(r.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(r.h3,{id:"leading-control",children:"Leading control"}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(r.h3,{id:"trailing-control",children:"Trailing control"}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:j}),`
`,e.jsx(r.h3,{id:"icon-accessories",children:"Icon accessories"}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:u})]})}function ae(i={}){const{wrapper:r}={...d(),...i.components};return r?e.jsx(r,{...i,children:e.jsx(t,{...i})}):t(i)}export{ae as default};
