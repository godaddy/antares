import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-vacDtZai.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DTEwm6bc.js";import{t as c}from"./mdx-react-shim-D0rjhuZg.js";import{Basic as l,IconAccessories as u,LeadingControl as d,Props as f,TrailingControl as p,n as m,t as h}from"./field.stories-0leuD2TD.js";var g,_=e((()=>{g=`import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, Input, type FieldGroupProps } from '../src';

export function FieldGroupTrailingControl(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <Input placeholder="Type..." edge="start" />
        <FieldButton aria-label="Search" edge="end">
          Search
        </FieldButton>
      </FieldGroup>
      <FieldDescription>Search by keyword</FieldDescription>
    </Field>
  );
}
`})),v,y=e((()=>{v=`import { Flex, Icon } from '@godaddy/antares';
import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, Input, type FieldGroupProps } from '../src';

export function FieldGroupIconAccessories(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldGroup {...props}>
        <Flex as="span" alignItems="center" inlinePaddingStart="sm">
          <Icon icon="star" />
        </Flex>
        <Input placeholder="Email" edge="middle" />
        <FieldButton aria-label="Verify email address" edge="end">
          Verify
        </FieldButton>
      </FieldGroup>
      <FieldDescription>Enter your email address</FieldDescription>
    </Field>
  );
}
`})),b,x=e((()=>{b=`import { Flex } from '@godaddy/antares';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../src';

/** Props for the composed field-group examples. */
export interface FieldGroupBasicProps {
  /** Class name merged onto the FieldGroup. */
  className?: string;

  /** Helper text shown below the group. */
  description?: string;

  /** Whether the control is disabled. */
  isDisabled?: boolean;

  /** Whether the field is required. */
  isRequired?: boolean;

  /** Label text shown above the group. */
  label?: string;
}

/**
 * Composes the presentational field primitives (Field, FieldLabel, FieldGroup,
 * FieldDescription) into a minimal boxed field, showing how the group and its
 * position markers are assembled. The fill is a static placeholder — real value,
 * focus, and validation behavior is wired up by the field components (TextField,
 * NumberField, Select).
 */
export function FieldGroupBasic({ className, description, isDisabled, isRequired, label }: FieldGroupBasicProps) {
  return (
    <Field>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup className={className} isDisabled={isDisabled} gap="sm">
        <Flex as="span" alignItems="center" padding="md">
          Placeholder content
        </Flex>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
    </Field>
  );
}
`}));function S(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:h,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`field-primitives`,children:`Field primitives`}),`
`,(0,w.jsx)(t.p,{children:`Composable primitives (Field, FieldLabel, FieldGroup, FieldError) for building form fields`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`Composition primitives.`}),` The field components (TextField, NumberField, DateField, Select, RadioGroup, CheckboxGroup) compose these internally — reach for those first. These primitives are also the building blocks for custom composite fields, e.g. an input and a select sharing one bordered box.`]}),`
`,(0,w.jsx)(t.p,{children:`The field decoration is split into granular, composable pieces so the same structure is shared across every field:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`Field`})}),` — pure layout. A `,(0,w.jsx)(t.code,{children:`Flex`}),` column with the standard field gap that stacks the label, control, description, and error.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`FieldLabel`})}),` — wraps React Aria `,(0,w.jsx)(t.code,{children:`Label`}),` and renders an optional required indicator (`,(0,w.jsx)(t.code,{children:`*`}),`).`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`FieldGroup`})}),` — the presentational bordered/elevated control box (a React Aria `,(0,w.jsx)(t.code,{children:`Group`}),`). Used only by "boxed" fields (TextField, NumberField, Select, DateField).`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`Input`})}),` / `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`TextArea`})}),` — the normalized fill controls (React Aria `,(0,w.jsx)(t.code,{children:`Input`}),`/`,(0,w.jsx)(t.code,{children:`TextArea`}),` given antares spacing via `,(0,w.jsx)(t.code,{children:`Box`}),`).`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`FieldDescription`})}),` — wraps the antares `,(0,w.jsx)(t.code,{children:`Text`}),` with `,(0,w.jsx)(t.code,{children:`slot="description"`}),` for the helper text. Renders nothing when empty.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`FieldError`})}),` — a thin wrapper over React Aria `,(0,w.jsx)(t.code,{children:`FieldError`}),`. Renders the field's validation messages by default and nothing when valid.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`FieldLabel`}),`, `,(0,w.jsx)(t.code,{children:`FieldDescription`}),`, and `,(0,w.jsx)(t.code,{children:`FieldError`}),` each render `,(0,w.jsx)(t.code,{children:`null`}),` when they have no content, so callers pass `,(0,w.jsx)(t.code,{children:`label`}),` / `,(0,w.jsx)(t.code,{children:`description`}),` / `,(0,w.jsx)(t.code,{children:`errorMessage`}),` straight through without guarding.`]}),`
`,(0,w.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,w.jsx)(t.h3,{id:`fieldgroup-props`,children:`FieldGroup props`}),`
`,(0,w.jsx)(a,{of:f}),`
`,(0,w.jsx)(t.h3,{id:`basic-example`,children:`Basic example`}),`
`,(0,w.jsx)(i,{of:l,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,w.jsxs)(t.p,{children:[`A boxed field composes the primitives inside its React Aria field wrapper. Use
`,(0,w.jsx)(t.code,{children:`Field as={...}`}),` to merge the field wrapper and the layout column into a single
element:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-text`,children:`Field as={RACTextField}                   ← field wrapper + layout column (one element)
├── FieldLabel                            ← when label provided (+ required indicator)
├── FieldGroup                            ← the bordered Group; styles inner controls via CSS
│   └── {children}                        ← Input, Button, DateInput, etc.
├── FieldDescription                      ← when description provided
└── FieldError                            ← renders validation messages when invalid
`})}),`
`,(0,w.jsxs)(t.p,{children:[`A field without a box (RadioGroup / CheckboxGroup) composes `,(0,w.jsx)(t.code,{children:`Field`}),` + `,(0,w.jsx)(t.code,{children:`FieldLabel`}),` + `,(0,w.jsx)(t.code,{children:`FieldError`}),` and omits `,(0,w.jsx)(t.code,{children:`FieldGroup`}),`.`]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`FieldGroup`}),` is purely presentational — it renders the styled `,(0,w.jsx)(t.code,{children:`Group`}),` and holds no React Aria context. The surrounding field wires value, disabled, and validation state into its controls.`]}),`
`,(0,w.jsx)(t.h3,{id:`positioning-controls-inside-the-group`,children:`Positioning controls inside the group`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`FieldGroup`}),` makes `,(0,w.jsx)(t.strong,{children:`no assumptions`}),` about its children — each control declares its position with the `,(0,w.jsx)(t.code,{children:`edge`}),` prop (on `,(0,w.jsx)(t.code,{children:`Input`}),`, `,(0,w.jsx)(t.code,{children:`TextArea`}),`, `,(0,w.jsx)(t.code,{children:`FieldButton`}),`, `,(0,w.jsx)(t.code,{children:`FieldSelect`}),`), which the group's CSS keys off to round the box's outer corners:`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:(0,w.jsx)(t.code,{children:`edge`})}),(0,w.jsx)(t.th,{children:`Put it on…`}),(0,w.jsx)(t.th,{children:`Effect`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`"start"`})}),(0,w.jsxs)(t.td,{children:[`the control at the `,(0,w.jsx)(t.strong,{children:`start`}),` edge`]}),(0,w.jsx)(t.td,{children:`rounds the start corners to the group`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`"middle"`})}),(0,w.jsx)(t.td,{children:`a control between two others`}),(0,w.jsx)(t.td,{children:`no rounding (interior)`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`"end"`})}),(0,w.jsxs)(t.td,{children:[`the control at the `,(0,w.jsx)(t.strong,{children:`end`}),` edge`]}),(0,w.jsx)(t.td,{children:`rounds the end corners to the group`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.em,{children:`(omitted)`})}),(0,w.jsxs)(t.td,{children:[`a `,(0,w.jsx)(t.strong,{children:`lone`}),` control filling the box`]}),(0,w.jsx)(t.td,{children:`rounds both edges`})]})]})]}),`
`,(0,w.jsxs)(t.p,{children:[`A lone control (TextField input, Select trigger) omits `,(0,w.jsx)(t.code,{children:`edge`}),` and rounds both sides; a stepper row puts `,(0,w.jsx)(t.code,{children:`edge="start"`}),` on the leading button, `,(0,w.jsx)(t.code,{children:`edge="end"`}),` on the trailing one, and `,(0,w.jsx)(t.code,{children:`edge="middle"`}),` on the input. Decorative, transparent adornments (an icon or unit text) need no `,(0,w.jsx)(t.code,{children:`edge`}),`. (`,(0,w.jsx)(t.code,{children:`edge`}),` maps to internal `,(0,w.jsx)(t.code,{children:`data-field-edge`}),` markers; the CSS keys off those rather than positional `,(0,w.jsx)(t.code,{children:`:first-child`}),` selectors, which break when a control wraps its frame in a provider element.)`]}),`
`,(0,w.jsx)(t.h3,{id:`states`,children:`States`}),`
`,(0,w.jsxs)(t.p,{children:[`The states `,(0,w.jsx)(t.strong,{children:`disabled`}),`, `,(0,w.jsx)(t.strong,{children:`readonly`}),`, and `,(0,w.jsx)(t.strong,{children:`invalid`}),` are applied by the field wrapper (e.g. TextField, NumberField, Select). The group reflects them via data attributes on the group.`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`State`}),(0,w.jsx)(t.th,{children:`CSS Selector`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`disabled — Applied when the field wrapper is disabled.`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-disabled]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`invalid — Applied when the field wrapper is invalid (e.g. validation failed).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-invalid]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`focus — Whether an element within the group has keyboard focus (for focus-ring styling).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-focused]`})})]})]})]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`leading-control`,children:`Leading control`}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(t.h3,{id:`trailing-control`,children:`Trailing control`}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(t.h3,{id:`icon-accessories`,children:`Icon accessories`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),m(),_(),y(),x()}))();export{C as default};