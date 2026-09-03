import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-i-sywOoz.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-9nqB_1nh.js";import{t as c}from"./mdx-react-shim-C1HkEgPv.js";import{t as l}from"./runtime-CCpseHws.js";import{Controlled as u,Default as d,Disabled as f,FormatOptions as p,HideStepper as m,Invalid as h,Props as g,Sizes as _,TextSteppers as v,ValueScale as y,n as b,t as x}from"./number-field.stories-D1ame774.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`numberfield`,children:`NumberField`}),`
`,(0,w.jsx)(t.p,{children:`NumberField is a composed numeric input with min/max/step and optional increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages.`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Composable interior`}),`: Pass `,(0,w.jsx)(t.code,{children:`Label`}),`, `,(0,w.jsx)(t.code,{children:`Text slot="description"`}),`, and `,(0,w.jsx)(t.code,{children:`FieldError`}),`; the field adds a `,(0,w.jsx)(t.code,{children:`Group`}),` of stepper `,(0,w.jsx)(t.code,{children:`Button`}),`s around the `,(0,w.jsx)(t.code,{children:`Input`}),`, keeping the order you wrote. Write a bare `,(0,w.jsx)(t.code,{children:`Input`}),` for a plain numeric input, or a `,(0,w.jsx)(t.code,{children:`Group`}),` of your own to change the steppers`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Steppers`}),`: Empty `,(0,w.jsx)(t.code,{children:`slot="decrement"`}),` / `,(0,w.jsx)(t.code,{children:`slot="increment"`}),` buttons get icons and `,(0,w.jsx)(t.code,{children:`variant="control"`}),` from context. Omit steppers for a plain numeric input`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Value scale`}),`: `,(0,w.jsx)(t.code,{children:`minValue`}),`, `,(0,w.jsx)(t.code,{children:`maxValue`}),`, `,(0,w.jsx)(t.code,{children:`step`}),`, and `,(0,w.jsx)(t.code,{children:`formatOptions`}),` configure the numeric behavior`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,w.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,w.jsx)(t.code,{children:`FieldError`}),` and `,(0,w.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsxs)(t.p,{children:[`Minimal usage with a `,(0,w.jsx)(t.code,{children:`Label`}),`, min/max, and stepper `,(0,w.jsx)(t.code,{children:`Button`}),`s.`]}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, NumberField, type NumberFieldProps } from '@godaddy/antares';

export function DefaultExample({ defaultValue = 0 }: Pick<NumberFieldProps, 'defaultValue'> = {}) {
  return (
    <NumberField defaultValue={defaultValue} minValue={0} maxValue={100}>
      <Label>Quantity</Label>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import { Label, NumberField, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField minValue={0} maxValue={100} value={value} onChange={setValue}>
        <Label>Quantity</Label>
      </NumberField>
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,w.jsx)(t.code,{children:`FieldError`}),` for validation feedback.`]}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { FieldError, Label, NumberField } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <NumberField minValue={0} maxValue={100} isInvalid isRequired>
      <Label>Quantity</Label>
      <FieldError>Please enter a value between 0 and 100</FieldError>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, NumberField } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <NumberField defaultValue={42} minValue={0} maxValue={100} isDisabled>
      <Label>Quantity</Label>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`hide-stepper`,children:`Hide Stepper`}),`
`,(0,w.jsxs)(t.p,{children:[`Compose without stepper `,(0,w.jsx)(t.code,{children:`Button`}),`s for a plain numeric input.`]}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Input, Label, NumberField, Text } from '@godaddy/antares';

export function HideStepperExample() {
  return (
    <NumberField minValue={0} maxValue={100}>
      <Label>Quantity</Label>
      <Input placeholder="0" />
      <Text slot="description">Enter a value between 0 and 100.</Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`value-scale`,children:`Value Scale`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`minValue`}),`, `,(0,w.jsx)(t.code,{children:`maxValue`}),`, and `,(0,w.jsx)(t.code,{children:`step`}),` to set the allowed values. Steps are calculated from the minimum value.`]}),`
`,(0,w.jsx)(i,{of:y,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, NumberField, Text } from '@godaddy/antares';

export function ValueScaleExample() {
  return (
    <NumberField minValue={2} maxValue={20} step={3}>
      <Label>Step value</Label>
      <Text slot="description">
        Steps are from the minimum: minValue={'{2}'}, step={'{3}'} gives 2, 5, 8, 11, …
      </Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`format-options-numbering-system`,children:`Format options (numbering system)`}),`
`,(0,w.jsxs)(t.p,{children:[`By default, NumberField displays the value using the numbering system for the user's locale. Use the `,(0,w.jsx)(t.code,{children:`formatOptions`}),` prop to override the numbering system by setting the Unicode numbering system locale extension.`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Input, Label, NumberField, Text } from '@godaddy/antares';

const devanagariFormatOptions = Intl.NumberFormat('hi-IN-u-nu-deva').resolvedOptions();

export function FormatOptionsExample() {
  return (
    <NumberField value={1024} formatOptions={devanagariFormatOptions}>
      <Label>Number (Devanagari)</Label>
      <Input />
      <Text slot="description">
        By default, NumberField uses the user's locale. Use formatOptions to override with a Unicode numbering system
        locale extension (e.g. nu-deva).
      </Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Compare the supported `,(0,w.jsx)(t.code,{children:`md`}),` and `,(0,w.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,w.jsx)(i,{of:_,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Label, NumberField } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField minValue={0} maxValue={100}>
        <Label>Quantity (md)</Label>
      </NumberField>
      <NumberField minValue={0} maxValue={100} size="sm">
        <Label>Quantity (sm)</Label>
      </NumberField>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`text-steppers`,children:`Text Steppers`}),`
`,(0,w.jsxs)(t.p,{children:[`Compose with `,(0,w.jsx)(t.code,{children:`children`}),` to replace the stepper icons with your own content, such as text.`]}),`
`,(0,w.jsx)(i,{of:v,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

export function TextSteppersExample() {
  return (
    <NumberField defaultValue={1} minValue={0}>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement">decrement</Button>
        <Input />
        <Button slot="increment">increment</Button>
      </Group>
      <Text slot="description">Use decrement and increment to change the value.</Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`NumberField`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(a,{of:g})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};