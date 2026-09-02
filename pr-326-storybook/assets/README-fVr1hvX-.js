import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DGW9Ha8k.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bsyba9RX.js";import{t as c}from"./mdx-react-shim-mSeRT3c4.js";import{t as l}from"./runtime-CCpseHws.js";import{Composed as u,Controlled as d,Default as f,Disabled as p,Form as m,Invalid as h,Multiple as g,Props as _,Sizes as v,n as y,t as b}from"./select.stories-noIzAVAU.js";function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:y,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`select`,children:`Select`}),`
`,(0,C.jsx)(t.p,{children:`Select is a dropdown for picking one or more values from a list of options. It renders a labeled trigger and a popover listbox, supports single and multiple selection, and submits naturally inside a form.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Composable interior`}),`: Pass `,(0,C.jsx)(t.code,{children:`Label`}),`, the `,(0,C.jsx)(t.code,{children:`SelectItem`}),`s, and optional `,(0,C.jsx)(t.code,{children:`Text`}),` / `,(0,C.jsx)(t.code,{children:`FieldError`}),`; the field adds the trigger and wraps the items in a popover, keeping the order you wrote. Write a `,(0,C.jsx)(t.code,{children:`Group`}),`, `,(0,C.jsx)(t.code,{children:`Button`}),`, `,(0,C.jsx)(t.code,{children:`SelectValue`}),`, `,(0,C.jsx)(t.code,{children:`Popover`}),`, `,(0,C.jsx)(t.code,{children:`Content`}),`, and `,(0,C.jsx)(t.code,{children:`ListBox`}),` interior of your own to replace either part`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,C.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,C.jsx)(t.code,{children:`value`}),` and `,(0,C.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,C.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,C.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,C.jsx)(t.code,{children:`FieldError`}),` and `,(0,C.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Form integration`}),`: Set `,(0,C.jsx)(t.code,{children:`name`}),` and the value submits as part of a native `,(0,C.jsx)(t.code,{children:`<form>`}),` (multiple values submit as repeated entries)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria Select for accessibility, keyboard navigation, and typeahead`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsxs)(t.p,{children:[`Minimal usage with a `,(0,C.jsx)(t.code,{children:`Label`}),`, items, and a placeholder.`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Label, Select, SelectItem, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Coffee</Label>
      <Text slot="description">Select your favorite coffee</Text>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`value`}),` and `,(0,C.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { useState } from 'react';
import { Label, Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

export function ControlledExample() {
  const [value, setValue] = useState<SelectKey | null>('latte');

  return (
    <>
      <Select placeholder="Pick a drink" value={value} onChange={setValue}>
        <Label>Coffee</Label>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>
      <Text>
        <strong>Value:</strong> {String(value ?? '(none)')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`multiple`,children:`Multiple`}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,C.jsx)(t.code,{children:`value`}),` is an array of keys.`]}),`
`,(0,C.jsx)(i,{of:g,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { useState } from 'react';
import { Label, Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

export function MultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select placeholder="Pick one or more" selectionMode="multiple" value={value} onChange={setValue}>
        <Label>Coffees you like</Label>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>
      <Text>
        <strong>Selected:</strong> {value.length === 0 ? '(none)' : value.join(', ')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`isInvalid`}),` with a `,(0,C.jsx)(t.code,{children:`FieldError`}),` for validation feedback.`]}),`
`,(0,C.jsx)(i,{of:h,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { FieldError, Label, Select, SelectItem } from '@godaddy/antares';

export function InvalidExample() {
  return (
    <Select placeholder="Pick a drink" isInvalid isRequired>
      <Label>Coffee</Label>
      <FieldError>Please choose a drink</FieldError>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`isDisabled`}),` to prevent interaction.`]}),`
`,(0,C.jsx)(i,{of:p,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Label, Select, SelectItem } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Select defaultValue="latte" isDisabled>
      <Label>Coffee</Label>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`form`,children:`Form`}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`name`}),` to submit the value with a native `,(0,C.jsx)(t.code,{children:`<form>`}),`. Multiple-mode values submit as repeated entries with the same `,(0,C.jsx)(t.code,{children:`name`}),`.`]}),`
`,(0,C.jsx)(i,{of:m,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { useState, type FormEvent } from 'react';
import { Box, Button, FieldError, Flex, Label, Select, SelectItem, Text } from '@godaddy/antares';

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
        <FieldError>Please select an item in the list.</FieldError>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select name="extras" placeholder="Pick any extras" selectionMode="multiple">
        <Label>Extras</Label>
        <SelectItem id="oat-milk">Oat milk</SelectItem>
        <SelectItem id="extra-shot">Extra shot</SelectItem>
        <SelectItem id="vanilla">Vanilla syrup</SelectItem>
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
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Compare the supported `,(0,C.jsx)(t.code,{children:`md`}),` and `,(0,C.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,C.jsx)(i,{of:v,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Flex, Label, Select, SelectItem } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select placeholder="Pick a drink">
        <Label>Coffee (md)</Label>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select placeholder="Pick a drink" size="sm">
        <Label>Coffee (sm)</Label>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,C.jsx)(t.p,{children:`Write the whole interior yourself instead of letting the field fill it in, for full control over
the trigger and popover.`}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{code:`import {
  Content,
  Button,
  FieldError,
  Group,
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
      <Group alignItems="center">
        <Button slot="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
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
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`Select`}),` component accepts the following props:`]}),`
`,(0,C.jsx)(a,{of:_})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),l(),b()}))();export{S as default};