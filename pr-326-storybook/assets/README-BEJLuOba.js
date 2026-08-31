import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-BLS6BX1Y.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CixjKK6c.js";import{t as c}from"./mdx-react-shim-Bf9L6_sS.js";import{t as l}from"./runtime-CCpseHws.js";import{Default as u,NumberFieldControlled as d,NumberFieldDisabled as f,NumberFieldFormatOptions as p,NumberFieldHideStepper as m,NumberFieldInvalid as h,NumberFieldSizes as g,NumberFieldValueScale as _,Props as v,TextSteppers as y,n as b,t as x}from"./number-field.stories-MCw2R2gr.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`numberfield`,children:`NumberField`}),`
`,(0,w.jsx)(t.p,{children:`NumberField is a numeric input with optional label, description, error message, min/max/step, and increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages.`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Steppers`}),`: Increment and decrement buttons, or `,(0,w.jsx)(t.code,{children:`hideStepper`}),` for a plain numeric input`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Composition`}),`: To customize the interior (for example text steppers instead of `,(0,w.jsx)(t.code,{children:`-`}),` and `,(0,w.jsx)(t.code,{children:`+`}),` icons), pass `,(0,w.jsx)(t.code,{children:`children`}),` and compose `,(0,w.jsx)(t.code,{children:`Label`}),`, `,(0,w.jsx)(t.code,{children:`Group`}),`, `,(0,w.jsx)(t.code,{children:`Input`}),`, and `,(0,w.jsx)(t.code,{children:`Button`})]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`Minimal usage with label, placeholder, and min/max.`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField, type NumberFieldProps } from '@godaddy/antares';

export function DefaultExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`number-field-controlled`,children:`Number Field Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
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
`,(0,w.jsx)(t.h3,{id:`number-field-invalid`,children:`Number Field Invalid`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with `,(0,w.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`number-field-disabled`,children:`Number Field Disabled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

export function NumberFieldDisabledExample() {
  return <NumberField label="Quantity" defaultValue={42} minValue={0} maxValue={100} isDisabled />;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`number-field-hide-stepper`,children:`Number Field Hide Stepper`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`hideStepper`}),` to show only the input without +/- buttons.`]}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`number-field-value-scale`,children:`Number Field Value Scale`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`minValue`}),`, `,(0,w.jsx)(t.code,{children:`maxValue`}),`, and `,(0,w.jsx)(t.code,{children:`step`}),` to set the allowed values. Steps are calculated from the minimum value.`]}),`
`,(0,w.jsx)(i,{of:_,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`format-options-numbering-system`,children:`Format options (numbering system)`}),`
`,(0,w.jsxs)(t.p,{children:[`By default, NumberField displays the value using the numbering system for the user's locale. Use the `,(0,w.jsx)(t.code,{children:`formatOptions`}),` prop to override the numbering system by setting the Unicode numbering system locale extension.`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { NumberField } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`number-field-sizes`,children:`Number Field Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Compare the supported `,(0,w.jsx)(t.code,{children:`md`}),` and `,(0,w.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, NumberField } from '@godaddy/antares';

export function NumberFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField label="Quantity (md)" placeholder="0" minValue={0} maxValue={100} />
      <NumberField label="Quantity (sm)" placeholder="0" minValue={0} maxValue={100} size="sm" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`text-steppers`,children:`Text Steppers`}),`
`,(0,w.jsxs)(t.p,{children:[`Compose with `,(0,w.jsx)(t.code,{children:`children`}),` to replace the stepper icons with your own content, such as text.`]}),`
`,(0,w.jsx)(i,{of:y,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

export function TextSteppersExample() {
  return (
    <NumberField defaultValue={1} minValue={0}>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" variant="control">
          decrement
        </Button>
        <Input />
        <Button slot="increment" variant="control">
          increment
        </Button>
      </Group>
      <Text slot="description">Use decrement and increment to change the value.</Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,w.jsx)(t.p,{children:`When focus is in the input (and the field is not read-only), keyboard behavior follows common spinbutton-style conventions:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Arrow Up`}),` / `,(0,w.jsx)(t.strong,{children:`Arrow Down`}),` (or `,(0,w.jsx)(t.strong,{children:`Up`}),` / `,(0,w.jsx)(t.strong,{children:`Down`}),`): increase or decrease by `,(0,w.jsx)(t.code,{children:`step`})]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Page Up`}),` / `,(0,w.jsx)(t.strong,{children:`Page Down`}),`: larger increase or decrease when supported`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Home`}),` / `,(0,w.jsx)(t.strong,{children:`End`}),`: jump to `,(0,w.jsx)(t.code,{children:`minValue`}),` or `,(0,w.jsx)(t.code,{children:`maxValue`}),` when those props are set`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`Stepper buttons are real buttons and follow standard button keyboard activation. Use `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`incrementAriaLabel`})}),` and `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`decrementAriaLabel`})}),` when the default labels are not enough in your locale or UI.`]}),`
`,(0,w.jsx)(t.h3,{id:`aria-and-labeling`,children:`ARIA and labeling`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsx)(t.li,{children:`The input is associated with the visible label and optional description and error content for assistive technologies.`}),`
`,(0,w.jsxs)(t.li,{children:[`Invalid and required states are exposed to assistive technologies when you use `,(0,w.jsx)(t.code,{children:`isInvalid`}),`, `,(0,w.jsx)(t.code,{children:`errorMessage`}),`, and `,(0,w.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Set `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`isWheelDisabled`})}),` if the value should not change when the user scrolls with a pointer wheel while the field is focused.`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`best-practices`,children:`Best practices`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[`Pair `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`isInvalid`})}),` with `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`errorMessage`})}),` so users get both visual and programmatic feedback.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Remember valid steps start from `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`minValue`})}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Use `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`isDisabled`})}),` when the value cannot be changed; use `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`isReadOnly`})}),` when the value should be visible but not editable. Do not use them interchangeably.`]}),`
`,(0,w.jsxs)(t.li,{children:[`For currency or units, ensure `,(0,w.jsx)(t.strong,{children:(0,w.jsx)(t.code,{children:`formatOptions`})}),` (and locale) match what users are allowed to type.`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`When `,(0,w.jsx)(t.code,{children:`children`}),` is passed, `,(0,w.jsx)(t.code,{children:`NumberField`}),` is composed. Use `,(0,w.jsx)(t.code,{children:`variant="control"`}),` with `,(0,w.jsx)(t.code,{children:`slot="decrement"`}),` and `,(0,w.jsx)(t.code,{children:`slot="increment"`}),` on Button so the steppers still change the value. A composed `,(0,w.jsx)(t.code,{children:`Group`}),` inherits `,(0,w.jsx)(t.code,{children:`size`}),` and `,(0,w.jsx)(t.code,{children:`isDisabled`}),` from the field, so set them on `,(0,w.jsx)(t.code,{children:`NumberField`}),` and leave the interior to the markup.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<NumberField>
  <Label />
  <Group>
    <Button slot="decrement" variant="control" />
    <Input />
    <Button slot="increment" variant="control" />
  </Group>
  <Text slot="description" />
  <FieldError />
</NumberField>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`NumberField`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(a,{of:v})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};