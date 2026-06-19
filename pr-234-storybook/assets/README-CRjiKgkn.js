import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-CRgdf9dv.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-GFy_nu_3.js";import{t as c}from"./mdx-react-shim-onz8FZyT.js";import{Basic as l,IconAccessories as u,LeadingControl as d,Props as f,TrailingControl as p,n as m,t as h}from"./field.stories-BtRag4xd.js";var g,_=e((()=>{g=`import { Field, FieldButton, FieldDescription, FieldGroup, FieldLabel, Input, type FieldGroupProps } from '../src';

export function FieldGroupTrailingControl(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <Input placeholder="Type..." data-field-group-start />
        <FieldButton aria-label="Search" data-field-group-end>
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
        <Flex as="span" alignItems="center" inlinePaddingStart="sm" data-field-group-start>
          <Icon icon="star" />
        </Flex>
        <Input placeholder="Email" />
        <FieldButton aria-label="Verify email address" data-field-group-end>
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
`}));function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:h,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`field-primitives`,children:`Field primitives`}),`
`,(0,w.jsx)(t.p,{children:`Composable internal primitives (Field, FieldLabel, FieldGroup, FieldError) for building form fields`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`Internal primitives.`}),` These are intended for internal use only. Use the public field components (TextField, NumberField, DateField, Select, RadioGroup, CheckboxGroup) instead; they compose these primitives internally.`]}),`
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
`,(0,w.jsxs)(t.p,{children:[`A boxed field composes the primitives inside its React Aria field wrapper. For
non-generic wrappers (TextField, NumberField, DateField) use `,(0,w.jsx)(t.code,{children:`Field as={...}`}),` to merge
the field wrapper and the layout column into a single element:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-text`,children:`Field as={RACTextField}                   ← field wrapper + layout column (one element)
├── FieldLabel                            ← when label provided (+ required indicator)
├── FieldGroup                            ← the bordered Group; styles inner controls via CSS
│   └── {children}                        ← Input, Button, DateInput, etc.
├── FieldDescription                      ← when description provided
└── FieldError                            ← renders validation messages when invalid
`})}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`Select`}),` is generic (`,(0,w.jsx)(t.code,{children:`Select<T, M>`}),`) — polymorphic `,(0,w.jsx)(t.code,{children:`as`}),` drops the type parameter, so it
nests instead: `,(0,w.jsx)(t.code,{children:`<RACSelect><Field>…</Field></RACSelect>`}),`.`]}),`
`,(0,w.jsxs)(t.p,{children:[`A field without a box (RadioGroup / CheckboxGroup) composes `,(0,w.jsx)(t.code,{children:`Field`}),` + `,(0,w.jsx)(t.code,{children:`FieldLabel`}),` + `,(0,w.jsx)(t.code,{children:`FieldError`}),` and omits `,(0,w.jsx)(t.code,{children:`FieldGroup`}),`.`]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`FieldGroup`}),` is purely presentational — it renders the styled `,(0,w.jsx)(t.code,{children:`Group`}),` and holds no React Aria context. The surrounding field wires value, disabled, and validation state into its controls.`]}),`
`,(0,w.jsx)(t.h3,{id:`marking-controls-inside-the-group`,children:`Marking controls inside the group`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`FieldGroup`}),` makes `,(0,w.jsx)(t.strong,{children:`no assumptions`}),` about its children — the field declares each child's position with a data attribute, and the group's CSS keys off them (rather than positional `,(0,w.jsx)(t.code,{children:`:first-child`}),` / tag selectors). Every marker strips the child's native border so the group reads as one control:`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Put it on…`}),(0,w.jsx)(t.th,{children:`Effect`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-field-group-start`})}),(0,w.jsxs)(t.td,{children:[`the element at the `,(0,w.jsx)(t.strong,{children:`start`}),` edge`]}),(0,w.jsx)(t.td,{children:`strips the border, rounds the start corners to the group, squares the end`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-field-group-middle`})}),(0,w.jsx)(t.td,{children:`the fill control (e.g. the input)`}),(0,w.jsx)(t.td,{children:`strips the border`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-field-group-end`})}),(0,w.jsxs)(t.td,{children:[`the element at the `,(0,w.jsx)(t.strong,{children:`end`}),` edge`]}),(0,w.jsx)(t.td,{children:`strips the border, rounds the end corners to the group, squares the start`})]})]})]}),`
`,(0,w.jsxs)(t.p,{children:[`A lone control (TextField input, Select trigger) carries `,(0,w.jsx)(t.strong,{children:`both`}),` `,(0,w.jsx)(t.code,{children:`start`}),` and `,(0,w.jsx)(t.code,{children:`end`}),`, so it rounds on both sides; a stepper row puts `,(0,w.jsx)(t.code,{children:`start`}),` on the leading button, `,(0,w.jsx)(t.code,{children:`end`}),` on the trailing one, and `,(0,w.jsx)(t.code,{children:`middle`}),` on the input. Squaring the inner corner matters because controls like `,(0,w.jsx)(t.code,{children:`Button`}),` are rounded by default, so an edge button would otherwise bulge past its neighbor.`]}),`
`,(0,w.jsx)(t.h3,{id:`states`,children:`States`}),`
`,(0,w.jsxs)(t.p,{children:[`The states `,(0,w.jsx)(t.strong,{children:`disabled`}),`, `,(0,w.jsx)(t.strong,{children:`readonly`}),`, and `,(0,w.jsx)(t.strong,{children:`invalid`}),` are applied by the field wrapper (e.g. TextField, NumberField, Select). The group reflects them via data attributes on the group.`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`State`}),(0,w.jsx)(t.th,{children:`CSS Selector`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`disabled — Applied when the field wrapper is disabled.`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-disabled]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`invalid — Applied when the field wrapper is invalid (e.g. validation failed).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-invalid]`})})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:`focus — Whether an element within the group has keyboard focus (for focus-ring styling).`}),(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`[data-focus-visible]`})})]})]})]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`leading-control`,children:`Leading control`}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(t.h3,{id:`trailing-control`,children:`Trailing control`}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(t.h3,{id:`icon-accessories`,children:`Icon accessories`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),m(),_(),y(),x()}))();export{C as default};