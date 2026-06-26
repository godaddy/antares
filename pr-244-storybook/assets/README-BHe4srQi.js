import{i as e}from"./preload-helper-D_yoP-vb.js";import{y as t}from"./iframe-DFJFfto3.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C6715OeW.js";import{t as c}from"./mdx-react-shim-CirHBfrt.js";import{Basic as l,Controlled as u,Disabled as d,FormatOptions as f,HideStepper as p,Invalid as m,Props as h,ValueScale as g,n as _,t as v}from"./number-field.stories-CFoh_D8a.js";var y,b=e((()=>{y=`import { NumberField, type NumberFieldProps } from '@godaddy/antares';

export function NumberFieldBasicExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}
`})),x,S=e((()=>{x=`import { useState } from 'react';
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
}
`})),C,w=e((()=>{C=`import { NumberField } from '@godaddy/antares';

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
}
`})),T,E=e((()=>{T=`import { NumberField } from '@godaddy/antares';

export function NumberFieldDisabledExample() {
  return <NumberField label="Quantity" defaultValue={42} minValue={0} maxValue={100} isDisabled />;
}
`})),D,O=e((()=>{D=`import { NumberField } from '@godaddy/antares';

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
}
`})),k,A=e((()=>{k=`import { NumberField } from '@godaddy/antares';

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
}
`})),j,M=e((()=>{j=`import { NumberField } from '@godaddy/antares';

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
}
`}));function N(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o,{of:_,name:`Overview`}),`
`,(0,F.jsx)(t.h1,{id:`numberfield`,children:`NumberField`}),`
`,(0,F.jsx)(t.p,{children:`NumberField is a numeric input with optional label, description, error message, min/max/step, and increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages.`}),`
`,(0,F.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,F.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,F.jsx)(t.p,{children:`The NumberField component accepts the following props:`}),`
`,(0,F.jsx)(a,{of:h}),`
`,(0,F.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,F.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,F.jsx)(t.p,{children:`Minimal usage with label, placeholder, and min/max.`}),`
`,(0,F.jsx)(r,{language:`tsx`,code:y}),`
`,(0,F.jsx)(i,{of:l,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`value`}),` and `,(0,F.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:x}),`
`,(0,F.jsx)(i,{of:u,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`isInvalid`}),` with `,(0,F.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:C}),`
`,(0,F.jsx)(i,{of:m,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:T}),`
`,(0,F.jsx)(i,{of:d,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`hide-stepper`,children:`Hide stepper`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`hideStepper`}),` to show only the input without +/- buttons.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:D}),`
`,(0,F.jsx)(i,{of:p,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`value-scale`,children:`Value scale`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`minValue`}),`, `,(0,F.jsx)(t.code,{children:`maxValue`}),`, and `,(0,F.jsx)(t.code,{children:`step`}),` to set the allowed values. Steps are calculated from the minimum value.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:k}),`
`,(0,F.jsx)(i,{of:g,inline:!0}),`
`,(0,F.jsx)(t.h3,{id:`format-options-numbering-system`,children:`Format options (numbering system)`}),`
`,(0,F.jsxs)(t.p,{children:[`By default, NumberField displays the value using the numbering system for the user's locale. Use the `,(0,F.jsx)(t.code,{children:`formatOptions`}),` prop to override the numbering system by setting the `,(0,F.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem#adding_a_numbering_system_via_the_locale_string`,rel:`nofollow`,children:`Unicode numbering system locale extension`}),`.`]}),`
`,(0,F.jsx)(r,{language:`tsx`,code:j}),`
`,(0,F.jsx)(i,{of:f,inline:!0}),`
`,(0,F.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,F.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,F.jsx)(t.p,{children:`When focus is in the input (and the field is not read-only), keyboard behavior follows common spinbutton-style conventions:`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[(0,F.jsx)(t.strong,{children:`Arrow Up`}),` / `,(0,F.jsx)(t.strong,{children:`Arrow Down`}),` (or `,(0,F.jsx)(t.strong,{children:`Up`}),` / `,(0,F.jsx)(t.strong,{children:`Down`}),`): increase or decrease by `,(0,F.jsx)(t.code,{children:`step`})]}),`
`,(0,F.jsxs)(t.li,{children:[(0,F.jsx)(t.strong,{children:`Page Up`}),` / `,(0,F.jsx)(t.strong,{children:`Page Down`}),`: larger increase or decrease when supported`]}),`
`,(0,F.jsxs)(t.li,{children:[(0,F.jsx)(t.strong,{children:`Home`}),` / `,(0,F.jsx)(t.strong,{children:`End`}),`: jump to `,(0,F.jsx)(t.code,{children:`minValue`}),` or `,(0,F.jsx)(t.code,{children:`maxValue`}),` when those props are set`]}),`
`]}),`
`,(0,F.jsxs)(t.p,{children:[`Stepper buttons are real buttons and follow standard button keyboard activation. Use `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`incrementAriaLabel`})}),` and `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`decrementAriaLabel`})}),` when the default labels are not enough in your locale or UI.`]}),`
`,(0,F.jsx)(t.h3,{id:`aria-and-labeling`,children:`ARIA and labeling`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`The input is associated with the visible label and optional description and error content for assistive technologies.`}),`
`,(0,F.jsxs)(t.li,{children:[`Invalid and required states are exposed to assistive technologies when you use `,(0,F.jsx)(t.code,{children:`isInvalid`}),`, `,(0,F.jsx)(t.code,{children:`errorMessage`}),`, and `,(0,F.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Set `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`isWheelDisabled`})}),` if the value should not change when the user scrolls with a pointer wheel while the field is focused.`]}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`best-practices`,children:`Best practices`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[`Pair `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`isInvalid`})}),` with `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`errorMessage`})}),` so users get both visual and programmatic feedback.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Remember valid steps start from `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`minValue`})}),`.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Use `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`isDisabled`})}),` when the value cannot be changed; use `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`isReadOnly`})}),` when the value should be visible but not editable. Do not use them interchangeably.`]}),`
`,(0,F.jsxs)(t.li,{children:[`For currency or units, ensure `,(0,F.jsx)(t.strong,{children:(0,F.jsx)(t.code,{children:`formatOptions`})}),` (and locale) match what users are allowed to type.`]}),`
`]})]})}function P(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(N,{...e})}):N(e)}var F;e((()=>{F=t(),c(),s(),v(),b(),S(),w(),E(),O(),A(),M()}))();export{P as default};