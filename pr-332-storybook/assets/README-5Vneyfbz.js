import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./select.stories-BAdzsi5D.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:d,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`select`,children:`Select`}),`
`,(0,S.jsx)(t.p,{children:`Select is a dropdown for picking one or more values from a list of options. It renders a labeled trigger and a popover listbox, supports single and multiple selection, and submits naturally inside a form.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Composable interior`}),`: Compose `,(0,S.jsx)(t.code,{children:`Label`}),`, a `,(0,S.jsx)(t.code,{children:`Button slot="trigger"`}),`, `,(0,S.jsx)(t.code,{children:`SelectOptions`}),`, and optional `,(0,S.jsx)(t.code,{children:`Text`}),` / `,(0,S.jsx)(t.code,{children:`FieldError`}),`. Nothing is added for you, and what you write keeps the order you wrote it in`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Trigger and options`}),`: An empty `,(0,S.jsx)(t.code,{children:`Button slot="trigger"`}),` renders the selected value and a chevron from the field. `,(0,S.jsx)(t.code,{children:`SelectOptions`}),` is the list in the popover the Select opens: it takes `,(0,S.jsx)(t.code,{children:`ListBox`}),` props (including `,(0,S.jsx)(t.code,{children:`items`}),` with a render function for a dynamic collection) plus `,(0,S.jsx)(t.code,{children:`popoverProps`}),` for the overlay. Write `,(0,S.jsx)(t.code,{children:`Popover`}),`, `,(0,S.jsx)(t.code,{children:`Content`}),`, and `,(0,S.jsx)(t.code,{children:`ListBox`}),` yourself to replace the whole overlay`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Composed in another field`}),`: Use `,(0,S.jsx)(t.code,{children:`variant="control"`}),` to sit inside another field's `,(0,S.jsx)(t.code,{children:`Group`}),`, as a country-code select beside a phone `,(0,S.jsx)(t.code,{children:`Input`})]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,S.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,S.jsx)(t.code,{children:`value`}),` and `,(0,S.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,S.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,S.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,S.jsx)(t.code,{children:`FieldError`}),` and `,(0,S.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Form integration`}),`: Set `,(0,S.jsx)(t.code,{children:`name`}),` and the value submits as part of a native `,(0,S.jsx)(t.code,{children:`<form>`}),` (multiple values submit as repeated entries)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria Select for accessibility, keyboard navigation, and typeahead`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`Minimal usage with a `,(0,S.jsx)(t.code,{children:`Label`}),`, items, and a placeholder.`]}),`
`,(0,S.jsx)(a,{of:g,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, Label, Select, SelectItem, SelectOptions, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Coffee</Label>
      <Button slot="trigger" />
      <Text slot="description">Select your favorite coffee</Text>
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </SelectOptions>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`value`}),` and `,(0,S.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, Label, Select, SelectItem, SelectOptions, Text, type SelectKey } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState<SelectKey | null>('latte');

  return (
    <>
      <Select placeholder="Pick a drink" value={value} onChange={setValue}>
        <Label>Coffee</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
          <SelectItem id="americano">Americano</SelectItem>
          <SelectItem id="mocha">Mocha</SelectItem>
        </SelectOptions>
      </Select>
      <Text>
        <strong>Value:</strong> {String(value ?? '(none)')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`multiple`,children:`Multiple`}),`
`,(0,S.jsxs)(t.p,{children:[`Set `,(0,S.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,S.jsx)(t.code,{children:`value`}),` is an array of keys.`]}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, Label, Select, SelectItem, SelectOptions, Text, type SelectKey } from '@godaddy/antares';

export function MultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select placeholder="Pick one or more" selectionMode="multiple" value={value} onChange={setValue}>
        <Label>Coffees you like</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
          <SelectItem id="americano">Americano</SelectItem>
          <SelectItem id="mocha">Mocha</SelectItem>
        </SelectOptions>
      </Select>
      <Text>
        <strong>Selected:</strong> {value.length === 0 ? '(none)' : value.join(', ')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,S.jsx)(t.code,{children:`FieldError`}),` for validation feedback.`]}),`
`,(0,S.jsx)(a,{of:h,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, FieldError, Label, Select, SelectItem, SelectOptions } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <Select placeholder="Pick a drink" isInvalid isRequired>
      <Label>Coffee</Label>
      <Button slot="trigger" />
      <FieldError>Please choose a drink</FieldError>
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </SelectOptions>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`isDisabled`}),` to prevent interaction.`]}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, Label, Select, SelectItem, SelectOptions } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Select defaultValue="latte" isDisabled>
      <Label>Coffee</Label>
      <Button slot="trigger" />
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </SelectOptions>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`form`,children:`Form`}),`
`,(0,S.jsxs)(t.p,{children:[`Set `,(0,S.jsx)(t.code,{children:`name`}),` to submit the value with a native `,(0,S.jsx)(t.code,{children:`<form>`}),`. Multiple-mode values submit as repeated entries with the same `,(0,S.jsx)(t.code,{children:`name`}),`.`]}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState, type FormEvent } from 'react';
import { Box, Button, FieldError, Flex, Label, Select, SelectItem, SelectOptions, Text } from '@godaddy/antares';

export function FormExample() {
  const [submitted, setSubmitted] = useState<Record<string, string | string[]> | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries: Record<string, string | string[]> = {};
    for (const [key, value] of data.entries()) {
      const stringValue = String(value);
      const existing = entries[key];
      if (existing === undefined) {
        entries[key] = stringValue;
      } else if (Array.isArray(existing)) {
        entries[key] = [...existing, stringValue];
      } else {
        entries[key] = [existing, stringValue];
      }
    }
    setSubmitted(entries);
  }

  return (
    <Flex as="form" direction="column" gap="md" onSubmit={handleSubmit}>
      <Select name="drink" placeholder="Pick a drink" isRequired>
        <Label>Drink</Label>
        <Button slot="trigger" />
        <FieldError>Please select an item in the list.</FieldError>
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
        </SelectOptions>
      </Select>
      <Select name="extras" placeholder="Pick any extras" selectionMode="multiple">
        <Label>Extras</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="oat-milk">Oat milk</SelectItem>
          <SelectItem id="extra-shot">Extra shot</SelectItem>
          <SelectItem id="vanilla">Vanilla syrup</SelectItem>
        </SelectOptions>
      </Select>
      <Flex gap="sm">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="minimal" onPress={() => setSubmitted(null)}>
          Reset
        </Button>
      </Flex>
      {submitted && (
        <Box padding="md" elevation="card" rounding="lg">
          <Text>
            <strong>Submitted:</strong> {JSON.stringify(submitted)}
          </Text>
        </Box>
      )}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`Compare the supported `,(0,S.jsx)(t.code,{children:`md`}),` and `,(0,S.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, Flex, Label, Select, SelectItem, SelectOptions } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select placeholder="Pick a drink">
        <Label>Coffee (md)</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
        </SelectOptions>
      </Select>
      <Select placeholder="Pick a drink" size="sm">
        <Label>Coffee (sm)</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
        </SelectOptions>
      </Select>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,S.jsxs)(t.p,{children:[`Write the trigger and the overlay yourself instead of composing `,(0,S.jsx)(t.code,{children:`SelectOptions`}),`, for full control
over the popover and the list.`]}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import {
  Button,
  Content,
  FieldError,
  Icon,
  Label,
  ListBox,
  Popover,
  Select,
  SelectItem,
  SelectValue,
  Text
} from '@godaddy/antares';

export function ComposedExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Drink</Label>
      <Button slot="trigger">
        <SelectValue />
        <Icon icon="chevron-down" />
      </Button>
      <Text slot="description">Choose your favorite drink</Text>
      <FieldError />
      <Popover hideArrow>
        <Content blockPadding="xs" inlinePadding="0">
          <ListBox>
            <SelectItem id="espresso">Espresso</SelectItem>
            <SelectItem id="latte">Latte</SelectItem>
            <SelectItem id="tea">Tea</SelectItem>
          </ListBox>
        </Content>
      </Popover>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Select>
  <Label />
  <Button slot="trigger" />
  <Text slot="description" />
  <SelectOptions>
    <SelectItem />
  </SelectOptions>
  <FieldError />
</Select>
`})}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`Select`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(o,{of:u})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),y()})))()}C();export{x as default};