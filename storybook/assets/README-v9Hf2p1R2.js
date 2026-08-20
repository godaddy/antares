import{i as e}from"./preload-helper-B4cZKGJ2.js";import{F as t}from"./iframe-PmOoQ7OU.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-pZyRD4f8.js";import{t as c}from"./mdx-react-shim-Bn-F9Fr7.js";import{Default as l,NumberFieldControlled as u,NumberFieldDisabled as d,NumberFieldFormatOptions as f,NumberFieldHideStepper as p,NumberFieldInvalid as m,NumberFieldSizes as h,NumberFieldValueScale as g,Props as _,n as v,t as y}from"./number-field.stories-1bJUhqkk.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`numberfield`,children:`NumberField`}),`
`,(0,S.jsx)(t.p,{children:`NumberField is a numeric input with optional label, description, error message, min/max/step, and increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages.`}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Minimal usage with label, placeholder, and min/max.`}),`
`,(0,S.jsx)(i,{of:l,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField, type NumberFieldProps } from '@godaddy/antares';

export function DefaultExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-controlled`,children:`Number Field Controlled`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`value`}),` and `,(0,S.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { NumberField, Text } from '@godaddy/antares';

export function NumberFieldControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField label="Quantity" minValue={0} maxValue={100} value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-invalid`,children:`Number Field Invalid`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`isInvalid`}),` with `,(0,S.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

export function NumberFieldInvalidExample() {
  return (
    <NumberField
      label="Quantity"
      minValue={0}
      maxValue={100}
      errorMessage="Please enter a value between 0 and 100"
      isInvalid
      isRequired
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-disabled`,children:`Number Field Disabled`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

export function NumberFieldDisabledExample() {
  return <NumberField label="Quantity" defaultValue={42} minValue={0} maxValue={100} isDisabled />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-hide-stepper`,children:`Number Field Hide Stepper`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`hideStepper`}),` to show only the input without +/- buttons.`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

export function NumberFieldHideStepperExample() {
  return (
    <NumberField
      label="Quantity"
      description="Enter a value between 0 and 100."
      placeholder="0"
      minValue={0}
      maxValue={100}
      hideStepper
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-value-scale`,children:`Number Field Value Scale`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`minValue`}),`, `,(0,S.jsx)(t.code,{children:`maxValue`}),`, and `,(0,S.jsx)(t.code,{children:`step`}),` to set the allowed values. Steps are calculated from the minimum value.`]}),`
`,(0,S.jsx)(i,{of:g,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

export function NumberFieldValueScaleExample() {
  return (
    <NumberField
      label="Step value"
      description="Steps are from the minimum: minValue={2}, step={3} gives 2, 5, 8, 11, …"
      placeholder="2"
      minValue={2}
      maxValue={20}
      step={3}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`format-options-numbering-system`,children:`Format options (numbering system)`}),`
`,(0,S.jsxs)(t.p,{children:[`By default, NumberField displays the value using the numbering system for the user's locale. Use the `,(0,S.jsx)(t.code,{children:`formatOptions`}),` prop to override the numbering system by setting the Unicode numbering system locale extension.`]}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

const devanagariFormatOptions = Intl.NumberFormat('hi-IN-u-nu-deva').resolvedOptions();

export function NumberFieldFormatOptionsExample() {
  return (
    <NumberField
      label="Number (Devanagari)"
      description="By default, NumberField uses the user's locale. Use formatOptions to override with a Unicode numbering system locale extension (e.g. nu-deva)."
      hideStepper
      value={1024}
      formatOptions={devanagariFormatOptions}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`number-field-sizes`,children:`Number Field Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`Compare the supported `,(0,S.jsx)(t.code,{children:`md`}),` and `,(0,S.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Flex, NumberField } from '@godaddy/antares';

export function NumberFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField label="Quantity (md)" placeholder="0" minValue={0} maxValue={100} />
      <NumberField label="Quantity (sm)" placeholder="0" minValue={0} maxValue={100} size="sm" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,S.jsx)(t.p,{children:`When focus is in the input (and the field is not read-only), keyboard behavior follows common spinbutton-style conventions:`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Arrow Up`}),` / `,(0,S.jsx)(t.strong,{children:`Arrow Down`}),` (or `,(0,S.jsx)(t.strong,{children:`Up`}),` / `,(0,S.jsx)(t.strong,{children:`Down`}),`): increase or decrease by `,(0,S.jsx)(t.code,{children:`step`})]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Page Up`}),` / `,(0,S.jsx)(t.strong,{children:`Page Down`}),`: larger increase or decrease when supported`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Home`}),` / `,(0,S.jsx)(t.strong,{children:`End`}),`: jump to `,(0,S.jsx)(t.code,{children:`minValue`}),` or `,(0,S.jsx)(t.code,{children:`maxValue`}),` when those props are set`]}),`
`]}),`
`,(0,S.jsxs)(t.p,{children:[`Stepper buttons are real buttons and follow standard button keyboard activation. Use `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`incrementAriaLabel`})}),` and `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`decrementAriaLabel`})}),` when the default labels are not enough in your locale or UI.`]}),`
`,(0,S.jsx)(t.h3,{id:`aria-and-labeling`,children:`ARIA and labeling`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`The input is associated with the visible label and optional description and error content for assistive technologies.`}),`
`,(0,S.jsxs)(t.li,{children:[`Invalid and required states are exposed to assistive technologies when you use `,(0,S.jsx)(t.code,{children:`isInvalid`}),`, `,(0,S.jsx)(t.code,{children:`errorMessage`}),`, and `,(0,S.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Set `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`isWheelDisabled`})}),` if the value should not change when the user scrolls with a pointer wheel while the field is focused.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Pair `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`isInvalid`})}),` with `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`errorMessage`})}),` so users get both visual and programmatic feedback.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Remember valid steps start from `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`minValue`})}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`isDisabled`})}),` when the value cannot be changed; use `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`isReadOnly`})}),` when the value should be visible but not editable. Do not use them interchangeably.`]}),`
`,(0,S.jsxs)(t.li,{children:[`For currency or units, ensure `,(0,S.jsx)(t.strong,{children:(0,S.jsx)(t.code,{children:`formatOptions`})}),` (and locale) match what users are allowed to type.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`NumberField`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:_})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),y()}))();export{x as default};