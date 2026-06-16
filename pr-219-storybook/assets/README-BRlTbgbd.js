import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-xMnMq0c1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-T9LBPeMM.js";import{t as c}from"./mdx-react-shim-By3kejgH.js";import{Basic as l,IconAccessories as u,LeadingControl as d,Props as f,TrailingControl as p,n as m,t as h}from"./field-frame.stories-CR_3I-1B.js";var g,_=e((()=>{g=`import { Button, Flex } from '@godaddy/antares';
import { FieldFrame, type FieldFrameProps } from '../src';

export function FieldFrameTrailingControl(props: FieldFrameProps) {
  return (
    <FieldFrame label="Search" isRequired description="Search by keyword" {...props}>
      <Flex flex={1} />
      <Button aria-label="Search">Search</Button>
    </FieldFrame>
  );
}
`})),v,y=e((()=>{v=`import { Icon, Button, Flex } from '@godaddy/antares';
import { FieldFrame, type FieldFrameProps } from '../src';

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
`})),b,x=e((()=>{b=`import { FieldFrame, type FieldFrameProps } from '../src';

export function FieldFrameBasic(props: FieldFrameProps) {
  return <FieldFrame {...props} />;
}
`}));function S(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:h,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`fieldframe`,children:`FieldFrame`}),`
`,(0,w.jsx)(t.p,{children:`Field frame component with integrated Label, description Text, and FieldError for form fields`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`Internal component.`}),` FieldFrame is intended for internal use only. Use the public field components (TextField, NumberField, DateField, Select) instead; they compose FieldFrame internally.`]}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Visual frame`}),`: Shared border, focus, disabled, and invalid styling around field content`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Focus delegation`}),`: Tracks focus from any focusable child (input, button) via `,(0,w.jsx)(t.code,{children:`data-focus-within`}),` and `,(0,w.jsx)(t.code,{children:`data-focus-visible`})]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Label, description, error`}),`: Optional Label, helper Text, and FieldError with proper accessibility association`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Required indicator`}),`: Shows asterisk next to label when the field is required`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`React Aria integration`}),`: Uses Provider pattern so nested elements stay in sync with the frame`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Field wrapper composition`}),`: Designed to sit inside TextField, NumberField, DateField, or Select as the main field UI`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,w.jsx)(t.h3,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.p,{children:`FieldFrame accepts the following props:`}),`
`,(0,w.jsx)(a,{of:f}),`
`,(0,w.jsx)(t.h3,{id:`basic-example`,children:`Basic example`}),`
`,(0,w.jsx)(i,{of:l,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsxs)(t.p,{children:[`Examples for leading control, trailing control, and icon accessories are in `,(0,w.jsx)(t.a,{href:`#examples`,children:`Examples`}),` at the end.`]}),`
`,(0,w.jsx)(t.h2,{id:`component-composition`,children:`Component composition`}),`
`,(0,w.jsx)(t.h3,{id:`internal-structure`,children:`Internal structure`}),`
`,(0,w.jsxs)(t.p,{children:[`FieldFrame renders a single React Aria `,(0,w.jsx)(t.code,{children:`Provider`}),` that supplies the necessary context to its children. Structure tree:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-text`,children:`Provider
├── Label                     ← when label prop
├── Group.frame               ← border, focus/invalid/disabled styling
│   └── {children}            ← Input, Button, DateInput, SelectValue, etc.
├── FieldError                ← when errorMessage prop
└── Text[slot=description]    ← when description prop
`})}),`
`,(0,w.jsx)(t.p,{children:`The following list describes the internal React Aria components used to compose FieldFrame:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Label`}),` (optional) — Rendered when `,(0,w.jsx)(t.code,{children:`label`}),` is provided. Shows a required indicator (asterisk).`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Group`}),` — The visual frame. Exposes `,(0,w.jsx)(t.code,{children:`data-focus-within`}),`, `,(0,w.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,w.jsx)(t.code,{children:`data-disabled`}),`, and `,(0,w.jsx)(t.code,{children:`data-invalid`}),`. All focusable children (input, button, etc.) live inside this Group.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`FieldError`}),` (optional) — Rendered when `,(0,w.jsx)(t.code,{children:`errorMessage`}),` is provided. Rendered below the Group, above the description. Associated with the field for accessibility.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Text`}),` (optional) — Description block rendered when `,(0,w.jsx)(t.code,{children:`description`}),` is provided.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`Children you pass to FieldFrame (e.g. `,(0,w.jsx)(t.code,{children:`Input`}),`, `,(0,w.jsx)(t.code,{children:`Button`}),`, `,(0,w.jsx)(t.code,{children:`DateInput`}),`, `,(0,w.jsx)(t.code,{children:`SelectValue`}),`) are rendered inside the Group. The provider ensures nested Input and Button read the same disabled/required state as the frame.`]}),`
`,(0,w.jsx)(t.h3,{id:`states`,children:`States`}),`
`,(0,w.jsxs)(t.p,{children:[`The states `,(0,w.jsx)(t.strong,{children:`disabled`}),`, `,(0,w.jsx)(t.strong,{children:`readonly`}),`, and `,(0,w.jsx)(t.strong,{children:`invalid`}),` are applied when the field wrapper (e.g. TextField, NumberField, Select) is marked as disabled, readonly, or invalid respectively. The frame reflects these and other states via data attributes on the group.`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`State`}),(0,w.jsx)(t.th,{children:`CSS Selector`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`disabled — Applied when the field wrapper is disabled.`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-disabled]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`invalid — Applied when the field wrapper is invalid (e.g. validation failed).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-invalid]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`readonly — Applied when the field wrapper is read only.`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-readonly]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`focus — Whether an element within the frame has keyboard focus (for focus-ring styling).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-focus-visible]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`focus-within — Whether an element within the frame is focused, via mouse or keyboard.`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-focus-within]`})})]})]})]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`leading-control`,children:`Leading control`}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(t.h3,{id:`trailing-control`,children:`Trailing control`}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(t.h3,{id:`icon-accessories`,children:`Icon accessories`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),m(),_(),y(),x()}))();export{C as default};