import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DYvKcwiX.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Cy4eS4_o.js";import{t as c}from"./mdx-react-shim-Cd0-5OE-.js";import{t as l}from"./runtime-CCpseHws.js";import{Adornments as u,Controlled as d,Controls as f,Default as p,Disabled as m,Invalid as h,Multiline as g,Props as _,Sizes as v,TelephoneField as y,n as b,t as x}from"./text-field.stories-Damep1zR.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`textfield`,children:`TextField`}),`
`,(0,w.jsx)(t.p,{children:`TextField is a single-line or multiline text input with optional label, description, and error message. Use it in forms for short answers (email, search, name) or longer content (comments). It supports optional leading and trailing text adornments (e.g. currency or units).`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Adornments`}),`: Optional `,(0,w.jsx)(t.code,{children:`leadingText`}),` and `,(0,w.jsx)(t.code,{children:`trailingText`}),` for fixed text before or after the input (e.g. `,(0,w.jsx)(t.code,{children:`$`}),`, `,(0,w.jsx)(t.code,{children:`.00`}),`, `,(0,w.jsx)(t.code,{children:`px`}),`)`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,w.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Multiline`}),`: Set `,(0,w.jsx)(t.code,{children:`multiline`}),` to render a textarea instead of a single-line input`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with `,(0,w.jsx)(t.code,{children:`errorMessage`}),` and `,(0,w.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Composition`}),`: For custom interiors (leading/trailing controls, icons, nested Select), pass `,(0,w.jsx)(t.code,{children:`children`}),` and compose `,(0,w.jsx)(t.code,{children:`Label`}),`, `,(0,w.jsx)(t.code,{children:`Group`}),`, `,(0,w.jsx)(t.code,{children:`Input`}),`, `,(0,w.jsx)(t.code,{children:`Button`}),`, and `,(0,w.jsx)(t.code,{children:`Select`})]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`Minimal usage with label and placeholder.`}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function DefaultExample(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import { Text, TextField } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <>
      <TextField label="Email" placeholder="you@example.com" value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with `,(0,w.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { TextField } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <TextField
      label="Email"
      placeholder="you@example.com"
      errorMessage="Please enter a valid email address"
      isInvalid
      isRequired
    />
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { TextField } from '@godaddy/antares';

export function DisabledExample() {
  return <TextField label="Name" placeholder="Enter your name" defaultValue="Disabled value" isDisabled />;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`adornments`,children:`Adornments`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`leadingText`}),` and `,(0,w.jsx)(t.code,{children:`trailingText`}),` for fixed text before and after the input, such as currency.`]}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { TextField } from '@godaddy/antares';

export function AdornmentsExample() {
  return (
    <TextField
      description="Use leadingText and trailingText to show fixed text before and after the input (e.g. currency)."
      label="Amount"
      leadingText="$"
      placeholder="0.00"
      trailingText=".00"
    />
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`multiline`,children:`Multiline`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`multiline`}),` to render a textarea.`]}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function MultilineExample(props: TextFieldProps) {
  return <TextField label="Comment" placeholder="Enter your comment" multiline {...props} />;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Compare the supported `,(0,w.jsx)(t.code,{children:`md`}),` and `,(0,w.jsx)(t.code,{children:`sm`}),` visual sizes. Set `,(0,w.jsx)(t.code,{children:`size`}),` on `,(0,w.jsx)(t.code,{children:`TextField`}),`; a composed `,(0,w.jsx)(t.code,{children:`Group`}),` inherits it.`]}),`
`,(0,w.jsx)(i,{of:v,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, TextField } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField label="Email (md)" placeholder="you@example.com" />
      <TextField label="Email (sm)" placeholder="you@example.com" size="sm" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controls-and-icons`,children:`Controls and icons`}),`
`,(0,w.jsxs)(t.p,{children:[`Compose with `,(0,w.jsx)(t.code,{children:`children`}),` to put a control or an icon beside the input. `,(0,w.jsx)(t.code,{children:`leadingText`}),` and
`,(0,w.jsx)(t.code,{children:`trailingText`}),` are for fixed text only.`]}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Button, Flex, Group, Icon, Input, Label, Text, TextField } from '@godaddy/antares';

export function ControlsExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Image</Label>
        <Group>
          <Button variant="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
      </TextField>

      <TextField>
        <Label>Email</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="sm">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" variant="control">
            Verify
          </Button>
        </Group>
        <Text slot="description">Enter your email address</Text>
      </TextField>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`telephone-field`,children:`Telephone Field`}),`
`,(0,w.jsx)(t.p,{children:`Compose a telephone number input paired with a country-code select.`}),`
`,(0,w.jsx)(i,{of:y,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Group, Input, Label, Select, SelectItem, Text, TextField } from '@godaddy/antares';

export function TelephoneFieldExample() {
  return (
    <TextField autoComplete="tel-national" inputMode="tel" type="tel">
      <Label>Phone number</Label>
      <Group>
        <Select aria-label="Country code" defaultValue="us" variant="control">
          <SelectItem id="us">US +1</SelectItem>
          <SelectItem id="mx">MX +52</SelectItem>
          <SelectItem id="gb">GB +44</SelectItem>
        </Select>
        <Input placeholder="555-555-5555" />
      </Group>
      <Text slot="description">We'll only call about your order.</Text>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`When `,(0,w.jsx)(t.code,{children:`children`}),` is passed, `,(0,w.jsx)(t.code,{children:`TextField`}),` is composed. A composed `,(0,w.jsx)(t.code,{children:`Group`}),` inherits `,(0,w.jsx)(t.code,{children:`size`}),` and `,(0,w.jsx)(t.code,{children:`isDisabled`}),` from the field, so set them on `,(0,w.jsx)(t.code,{children:`TextField`}),` and leave the interior to the markup.`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<TextField>
  <Label />
  <Group>
    <Select variant="control" />
    <Input /> {/* or <TextArea /> */}
    <Button variant="control" />
  </Group>
  <Text slot="description" />
  <FieldError />
</TextField>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`TextField`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(a,{of:_})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};