import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{a as l,c as u,d,f,i as p,l as m,n as h,o as g,r as _,s as v,t as y,u as b}from"./number-field.stories-lL5D9xoP.js";function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{of:f,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`numberfield`,children:`NumberField`}),`
`,(0,C.jsx)(t.p,{children:`NumberField is a composed numeric input with min/max/step and optional increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Composable interior`}),`: Compose `,(0,C.jsx)(t.code,{children:`Label`}),`, the control, `,(0,C.jsx)(t.code,{children:`Text slot="description"`}),`, and `,(0,C.jsx)(t.code,{children:`FieldError`}),`. Nothing is added for you, and what you write keeps the order you wrote it in`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Steppers`}),`: A stepper is a `,(0,C.jsx)(t.code,{children:`Group`}),` holding `,(0,C.jsx)(t.code,{children:`Button slot="decrement"`}),`, an `,(0,C.jsx)(t.code,{children:`Input`}),`, and `,(0,C.jsx)(t.code,{children:`Button slot="increment"`}),`. Left empty, each button takes its icon, `,(0,C.jsx)(t.code,{children:`variant="control"`}),`, and `,(0,C.jsx)(t.code,{children:`size`}),` from the field, so no icon imports are needed. Compose a bare `,(0,C.jsx)(t.code,{children:`Input`}),` instead for a plain numeric input`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Value scale`}),`: `,(0,C.jsx)(t.code,{children:`minValue`}),`, `,(0,C.jsx)(t.code,{children:`maxValue`}),`, `,(0,C.jsx)(t.code,{children:`step`}),`, and `,(0,C.jsx)(t.code,{children:`formatOptions`}),` configure the numeric behavior`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,C.jsx)(t.code,{children:`value`}),` and `,(0,C.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,C.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,C.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,C.jsx)(t.code,{children:`FieldError`}),` and `,(0,C.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsxs)(t.p,{children:[`Minimal usage with a `,(0,C.jsx)(t.code,{children:`Label`}),`, min/max, and stepper `,(0,C.jsx)(t.code,{children:`Button`}),`s.`]}),`
`,(0,C.jsx)(a,{of:h,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, Group, Input, Label, NumberField, type NumberFieldProps } from '@godaddy/antares';

export function DefaultExample({ defaultValue = 0 }: Pick<NumberFieldProps, 'defaultValue'> = {}) {
  return (
    <NumberField defaultValue={defaultValue} minValue={0} maxValue={100}>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`value`}),` and `,(0,C.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,C.jsx)(a,{of:y,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { useState } from 'react';
import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField minValue={0} maxValue={100} value={value} onChange={setValue}>
        <Label>Quantity</Label>
        <Group>
          <Button slot="decrement" />
          <Input />
          <Button slot="increment" />
        </Group>
      </NumberField>
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,C.jsx)(t.code,{children:`FieldError`}),` for validation feedback.`]}),`
`,(0,C.jsx)(a,{of:g,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, FieldError, Group, Input, Label, NumberField } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <NumberField minValue={0} maxValue={100} isInvalid isRequired>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
      <FieldError>Please enter a value between 0 and 100</FieldError>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,C.jsx)(a,{of:_,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, Group, Input, Label, NumberField } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <NumberField defaultValue={42} minValue={0} maxValue={100} isDisabled>
      <Label>Quantity</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`hide-stepper`,children:`Hide Stepper`}),`
`,(0,C.jsxs)(t.p,{children:[`Compose without stepper `,(0,C.jsx)(t.code,{children:`Button`}),`s for a plain numeric input.`]}),`
`,(0,C.jsx)(a,{of:l,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Input, Label, NumberField, Text } from '@godaddy/antares';

export function HideStepperExample() {
  return (
    <NumberField minValue={0} maxValue={100}>
      <Label>Quantity</Label>
      <Input placeholder="0" />
      <Text slot="description">Enter a value between 0 and 100.</Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`value-scale`,children:`Value Scale`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`minValue`}),`, `,(0,C.jsx)(t.code,{children:`maxValue`}),`, and `,(0,C.jsx)(t.code,{children:`step`}),` to set the allowed values. Steps are calculated from the minimum value.`]}),`
`,(0,C.jsx)(a,{of:b,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

export function ValueScaleExample() {
  return (
    <NumberField minValue={2} maxValue={20} step={3}>
      <Label>Step value</Label>
      <Group>
        <Button slot="decrement" />
        <Input />
        <Button slot="increment" />
      </Group>
      <Text slot="description">
        Steps are from the minimum: minValue={'{2}'}, step={'{3}'} gives 2, 5, 8, 11, …
      </Text>
    </NumberField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`format-options-numbering-system`,children:`Format options (numbering system)`}),`
`,(0,C.jsxs)(t.p,{children:[`By default, NumberField displays the value using the numbering system for the user's locale. Use the `,(0,C.jsx)(t.code,{children:`formatOptions`}),` prop to override the numbering system by setting the Unicode numbering system locale extension.`]}),`
`,(0,C.jsx)(a,{of:p,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Input, Label, NumberField, Text } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Compare the supported `,(0,C.jsx)(t.code,{children:`md`}),` and `,(0,C.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,C.jsx)(a,{of:u,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, Flex, Group, Input, Label, NumberField } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField minValue={0} maxValue={100}>
        <Label>Quantity (md)</Label>
        <Group>
          <Button slot="decrement" />
          <Input />
          <Button slot="increment" />
        </Group>
      </NumberField>
      <NumberField minValue={0} maxValue={100} size="sm">
        <Label>Quantity (sm)</Label>
        <Group>
          <Button slot="decrement" />
          <Input />
          <Button slot="increment" />
        </Group>
      </NumberField>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`text-steppers`,children:`Text Steppers`}),`
`,(0,C.jsxs)(t.p,{children:[`Compose with `,(0,C.jsx)(t.code,{children:`children`}),` to replace the stepper icons with your own content, such as text.`]}),`
`,(0,C.jsx)(a,{of:m,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Button, Group, Input, Label, NumberField, Text } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`<NumberField>
  <Label />
  <Group>
    <Button slot="decrement" />
    <Input />
    <Button slot="increment" />
  </Group>
  {/* or a bare <Input /> for a plain numeric input */}
  <Text slot="description" />
  <FieldError />
</NumberField>
`})}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`NumberField`}),` component accepts the following props:`]}),`
`,(0,C.jsx)(o,{of:v})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;function w(){return(w=e((()=>{C=t(),n(),c(),d()})))()}w();export{S as default};