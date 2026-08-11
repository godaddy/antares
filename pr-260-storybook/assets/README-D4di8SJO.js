import{i as e}from"./preload-helper-DPdjVz-1.js";import{y as t}from"./iframe-qL9mcE4L.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DSR22tbX.js";import{t as c}from"./mdx-react-shim-DjBjCRlJ.js";import{Default as l,FieldGroupIconAccessories as u,FieldGroupLeadingControl as d,FieldGroupTrailingControl as f,GroupProps as p,TelephoneField as m,n as h,t as g}from"./field.stories-lpw5vIGZ.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:g,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`field-primitives`,children:`Field primitives`}),`
`,(0,y.jsx)(t.p,{children:`Composable primitives (Field, FieldLabel, FieldGroup, FieldError) for building form fields`}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`Composition primitives.`}),` The field components (TextField, NumberField, DateField, Select, RadioGroup, CheckboxGroup) compose these internally — reach for those first. These primitives are also the building blocks for custom composite fields, e.g. an input and a select sharing one bordered box.`]}),`
`,(0,y.jsx)(t.p,{children:`The field decoration is split into granular, composable pieces so the same structure is shared across every field:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`Field`})}),` — stacks a field's label, control, description, and error in one consistently spaced column (pure layout — a `,(0,y.jsx)(t.code,{children:`Flex`}),` column with the standard field gap).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldLabel`})}),` — names the field and flags whether it's required (wraps React Aria `,(0,y.jsx)(t.code,{children:`Label`}),`, rendering an optional `,(0,y.jsx)(t.code,{children:`*`}),` indicator).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldGroup`})}),` — the bordered box that visually unites a field's controls and reflects their shared focus, disabled, and invalid state. Used only by "boxed" fields (TextField, NumberField, Select, DateField); presentationally it is a React Aria `,(0,y.jsx)(t.code,{children:`Group`}),`.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldInput`})}),` — the single-line control the user types into (a normalized React Aria `,(0,y.jsx)(t.code,{children:`Input`}),` given antares spacing via `,(0,y.jsx)(t.code,{children:`Box`}),`).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldTextArea`})}),` — the multiline control the user types into (a normalized React Aria `,(0,y.jsx)(t.code,{children:`TextArea`}),` given antares spacing via `,(0,y.jsx)(t.code,{children:`Box`}),`).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldButton`})}),` — an actionable control placed inside the box, such as the NumberField steppers or a search submit (a click target within the group).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldTrigger`})}),` — a full-width value-display button inside the box that opens an overlay (used by Select and DatePicker): a value area plus a trailing icon, laid out across the group. `,(0,y.jsx)(t.code,{children:`variant="select"`}),` is transparent and input-like; `,(0,y.jsx)(t.code,{children:`variant="control"`}),` is a filled segment inside a shared group.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldDescription`})}),` — helper text that explains the field; renders nothing when empty (wraps the antares `,(0,y.jsx)(t.code,{children:`Text`}),` with `,(0,y.jsx)(t.code,{children:`slot="description"`}),`).`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:(0,y.jsx)(t.code,{children:`FieldError`})}),` — surfaces the field's validation messages when it is invalid, and nothing when valid (a thin wrapper over React Aria `,(0,y.jsx)(t.code,{children:`FieldError`}),`).`]}),`
`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.code,{children:`FieldLabel`}),`, `,(0,y.jsx)(t.code,{children:`FieldDescription`}),`, and `,(0,y.jsx)(t.code,{children:`FieldError`}),` each render `,(0,y.jsx)(t.code,{children:`null`}),` when they have no content, so callers pass `,(0,y.jsx)(t.code,{children:`label`}),` / `,(0,y.jsx)(t.code,{children:`description`}),` / `,(0,y.jsx)(t.code,{children:`errorMessage`}),` straight through without guarding.`]}),`
`,(0,y.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,y.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,y.jsxs)(t.p,{children:[`A boxed field composes the primitives inside its React Aria field wrapper. Use
`,(0,y.jsx)(t.code,{children:`Field as={...}`}),` to merge the field wrapper and the layout column into a single
element:`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-text`,children:`Field as={AriaTextField}                  ← field wrapper + layout column (one element)
├── FieldLabel                            ← when label provided (+ required indicator)
├── FieldGroup                            ← the bordered Group; styles inner controls via CSS
│   └── {children}                        ← FieldInput, FieldButton, DateInput, etc.
├── FieldDescription                      ← when description provided
└── FieldError                            ← renders validation messages when invalid
`})}),`
`,(0,y.jsxs)(t.p,{children:[`A field without a box (RadioGroup / CheckboxGroup) composes `,(0,y.jsx)(t.code,{children:`Field`}),` + `,(0,y.jsx)(t.code,{children:`FieldLabel`}),` + `,(0,y.jsx)(t.code,{children:`FieldError`}),` and omits `,(0,y.jsx)(t.code,{children:`FieldGroup`}),`.`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.code,{children:`FieldGroup`}),` is purely presentational — it renders the styled `,(0,y.jsx)(t.code,{children:`Group`}),` and holds no React Aria context. The surrounding field wires value, disabled, and validation state into its controls.`]}),`
`,(0,y.jsx)(t.h3,{id:`positioning-controls-inside-the-group`,children:`Positioning controls inside the group`}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.code,{children:`FieldGroup`}),` rounds its outer corners from DOM order: the group's CSS rounds the start corners of its `,(0,y.jsx)(t.strong,{children:`first child`}),` and the end corners of its `,(0,y.jsx)(t.strong,{children:`last child`}),`, so controls are seamless inside and rounded only at the box edges. Author children in visual order and the rounding follows — no per-control positioning prop. A lone control (a TextField input, a Select trigger) is both first and last, so it rounds both edges. The rules are RTL-safe (they use logical `,(0,y.jsx)(t.code,{children:`start`}),`/`,(0,y.jsx)(t.code,{children:`end`}),` corners).`]}),`
`,(0,y.jsx)(t.h3,{id:`states`,children:`States`}),`
`,(0,y.jsxs)(t.p,{children:[`The states `,(0,y.jsx)(t.strong,{children:`disabled`}),`, `,(0,y.jsx)(t.strong,{children:`readonly`}),`, and `,(0,y.jsx)(t.strong,{children:`invalid`}),` are applied by the field wrapper (e.g. TextField, NumberField, Select). The group reflects them via data attributes on the group.`]}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`State`}),(0,y.jsx)(t.th,{children:`CSS Selector`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:`disabled — Applied when the field wrapper is disabled.`}),(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`[data-disabled]`})})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:`invalid — Applied when the field wrapper is invalid (e.g. validation failed).`}),(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`[data-invalid]`})})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:`focus — Whether an element within the group has keyboard focus (for focus-ring styling).`}),(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`[data-focused]`})})]})]})]}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsx)(t.p,{children:`Composes the presentational field primitives (Field, FieldLabel, FieldGroup,
FieldDescription) into a minimal boxed field, showing how the group and its
position markers are assembled. The fill is a static placeholder - real value,
focus, and validation behavior is wired up by the field components (TextField,
NumberField, Select).`}),`
`,(0,y.jsx)(i,{of:l,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Field, FieldDescription, FieldGroup, FieldLabel, Flex } from '@godaddy/antares';

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

export function DefaultExample({ className, description, isDisabled, isRequired, label }: FieldGroupBasicProps) {
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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`leading-control`,children:`Leading control`}),`
`,(0,y.jsx)(t.p,{children:`A field group with a leading control before the input area.`}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Flex,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupLeadingControlExample(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <FieldButton aria-label="Country code">Click Me</FieldButton>
        <Flex as="span" flex={1} alignItems="center" padding="md">
          Placeholder content
        </Flex>
      </FieldGroup>
      <FieldDescription>Enter your phone number</FieldDescription>
    </Field>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`trailing-control`,children:`Trailing control`}),`
`,(0,y.jsx)(t.p,{children:`A field group with an input and a trailing action control.`}),`
`,(0,y.jsx)(i,{of:f,inline:!0}),`
`,(0,y.jsx)(r,{code:`import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldInput,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupTrailingControlExample(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>
      <FieldGroup gap="sm" {...props}>
        <FieldInput placeholder="Type..." />
        <FieldButton aria-label="Search">Search</FieldButton>
      </FieldGroup>
      <FieldDescription>Search by keyword</FieldDescription>
    </Field>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`icon-accessories`,children:`Icon accessories`}),`
`,(0,y.jsx)(t.p,{children:`A field group with leading icon and trailing action accessories.`}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import {
  Field,
  FieldButton,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Flex,
  Icon,
  FieldInput,
  type FieldGroupProps
} from '@godaddy/antares';

export function FieldGroupIconAccessoriesExample(props: FieldGroupProps) {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldGroup {...props}>
        <Flex as="span" alignItems="center" inlinePaddingStart="sm">
          <Icon icon="star" />
        </Flex>
        <FieldInput placeholder="Email" />
        <FieldButton aria-label="Verify email address">Verify</FieldButton>
      </FieldGroup>
      <FieldDescription>Enter your email address</FieldDescription>
    </Field>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`telephone-field`,children:`Telephone field`}),`
`,(0,y.jsx)(t.p,{children:`A telephone number input paired with a country-code select.`}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import {
  AriaTextField,
  Field,
  FieldDescription,
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldSelect,
  SelectItem
} from '@godaddy/antares';

export function TelephoneFieldExample() {
  return (
    <Field as={AriaTextField} autoComplete="tel-national" inputMode="tel" type="tel">
      <FieldLabel>Phone number</FieldLabel>
      <FieldGroup>
        <FieldSelect aria-label="Country code" defaultValue="us">
          <SelectItem id="us">US +1</SelectItem>
          <SelectItem id="mx">MX +52</SelectItem>
          <SelectItem id="gb">GB +44</SelectItem>
        </FieldSelect>
        <FieldInput placeholder="555-555-5555" />
      </FieldGroup>
      <FieldDescription>We'll only call about your order.</FieldDescription>
    </Field>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`FieldGroup`}),` component has the following props:`]}),`
`,(0,y.jsx)(a,{of:p})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),h()}))();export{v as default};