import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DGW9Ha8k.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bsyba9RX.js";import{t as c}from"./mdx-react-shim-mSeRT3c4.js";import{t as l}from"./runtime-CCpseHws.js";import{Adornments as u,Controlled as d,Controls as f,Default as p,Disabled as m,Invalid as h,Multiline as g,Props as _,Sizes as v,TelephoneField as y,n as b,t as x}from"./text-field.stories-CE1z37bX.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`textfield`,children:`TextField`}),`
`,(0,w.jsx)(t.p,{children:`TextField is a composed single-line or multiline text input. Use it in forms for short answers (email, search, name) or longer content (comments).`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Composable interior`}),`: Compose `,(0,w.jsx)(t.code,{children:`Label`}),`, `,(0,w.jsx)(t.code,{children:`Input`}),` or `,(0,w.jsx)(t.code,{children:`TextArea`}),`, `,(0,w.jsx)(t.code,{children:`Text slot="description"`}),`, and `,(0,w.jsx)(t.code,{children:`FieldError`}),`. Omitting `,(0,w.jsx)(t.code,{children:`Group`}),` leaves the control as a direct field child with box chrome. Use an explicit `,(0,w.jsx)(t.code,{children:`Group`}),` for controls or adornments`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Adornments`}),`: Fixed text or icons before or after the input (e.g. `,(0,w.jsx)(t.code,{children:`$`}),`, `,(0,w.jsx)(t.code,{children:`.00`}),`, `,(0,w.jsx)(t.code,{children:`px`}),`) are composed inside `,(0,w.jsx)(t.code,{children:`Group`}),`, positioned by source order`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Controls`}),`: A `,(0,w.jsx)(t.code,{children:`Button slot="control"`}),` beside the input is an interactive affix; it picks up field chrome from context`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,w.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Multiline`}),`: Compose a `,(0,w.jsx)(t.code,{children:`TextArea`}),` instead of an `,(0,w.jsx)(t.code,{children:`Input`}),` for multiline entry`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,w.jsx)(t.code,{children:`FieldError`}),` and `,(0,w.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsxs)(t.p,{children:[`Minimal usage: a `,(0,w.jsx)(t.code,{children:`Label`}),` and an `,(0,w.jsx)(t.code,{children:`Input`}),`.`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Input, Label, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import { Input, Label, Text, TextField } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <>
      <TextField value={value} onChange={setValue}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,w.jsx)(t.code,{children:`FieldError`}),` for validation feedback.`]}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { FieldError, Input, Label, TextField } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <TextField isInvalid isRequired>
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Input, Label, TextField } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <TextField defaultValue="Disabled value" isDisabled>
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`adornments`,children:`Adornments`}),`
`,(0,w.jsxs)(t.p,{children:[`Fixed text before and after the input, such as currency. Leading and trailing content is
composed inside the `,(0,w.jsx)(t.code,{children:`Group`}),` and its position comes from source order.`]}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Group, Input, Label, Text, TextField } from '@godaddy/antares';

export function AdornmentsExample() {
  return (
    <TextField>
      <Label>Amount</Label>
      <Group>
        <Flex as="span" alignItems="center" inlinePaddingStart="md">
          $
        </Flex>
        <Input placeholder="0.00" />
        <Flex as="span" alignItems="center" inlinePaddingEnd="md">
          .00
        </Flex>
      </Group>
      <Text slot="description">Compose fixed text before and after the input (e.g. currency).</Text>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`multiline`,children:`Multiline`}),`
`,(0,w.jsxs)(t.p,{children:[`Compose a `,(0,w.jsx)(t.code,{children:`TextArea`}),` instead of an `,(0,w.jsx)(t.code,{children:`Input`}),` for multiline entry.`]}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, TextArea, TextField, type TextFieldProps } from '@godaddy/antares';

export function MultilineExample({ value }: Pick<TextFieldProps, 'value'> = {}) {
  return (
    <TextField value={value}>
      <Label>Comment</Label>
      <TextArea placeholder="Enter your comment" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Compare the supported `,(0,w.jsx)(t.code,{children:`md`}),` and `,(0,w.jsx)(t.code,{children:`sm`}),` visual sizes, plain and with an icon plus control button.
Set `,(0,w.jsx)(t.code,{children:`size`}),` on `,(0,w.jsx)(t.code,{children:`TextField`}),` so the input and `,(0,w.jsx)(t.code,{children:`Button slot="control"`}),` share the same size.`]}),`
`,(0,w.jsx)(i,{of:v,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Button, Flex, Group, Icon, Input, Label, TextField } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Email (md)</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <TextField size="sm">
        <Label>Email (sm)</Label>
        <Input placeholder="you@example.com" />
      </TextField>

      <TextField>
        <Label>Email with icon (md)</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
            Verify
          </Button>
        </Group>
      </TextField>

      <TextField size="sm">
        <Label>Email with icon (sm)</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="sm">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
            Verify
          </Button>
        </Group>
      </TextField>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controls-and-icons`,children:`Controls and icons`}),`
`,(0,w.jsxs)(t.p,{children:[`Put a control or an icon beside the input. A `,(0,w.jsx)(t.code,{children:`Button slot="control"`}),` is an
interactive affix; static content is wrapped in a `,(0,w.jsx)(t.code,{children:`Flex as="span"`}),` to center it and give it a gutter.`]}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Button, Flex, Group, Icon, Input, Label, Text, TextField } from '@godaddy/antares';

export function ControlsExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Image</Label>
        <Group>
          <Button slot="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
      </TextField>

      <TextField>
        <Label>Email</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
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
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`TextField`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(a,{of:_})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};