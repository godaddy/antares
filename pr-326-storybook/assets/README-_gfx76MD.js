import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-Biz6xSrB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-VhroJ_WZ.js";import{t as c}from"./mdx-react-shim-AbUrKz4h.js";import{t as l}from"./runtime-CCpseHws.js";import{Composed as u,ComposedState as d,CustomOption as f,Default as p,Props as m,SelectControlled as h,SelectDisabled as g,SelectForm as _,SelectInvalid as v,SelectMultiple as y,SelectSizes as b,n as x,t as S}from"./select.stories-C3G-xNfy.js";function C(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:x,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`select`,children:`Select`}),`
`,(0,T.jsx)(t.p,{children:`Select is a dropdown for picking one or more values from a list of options. It renders a labeled trigger and a popover listbox, supports single and multiple selection, and submits naturally inside a form.`}),`
`,(0,T.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Composable interior`}),`: Replace the default layout with Antares components, or with a function when the interior needs the Select state`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,T.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,T.jsx)(t.code,{children:`value`}),` and `,(0,T.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,T.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,T.jsx)(t.code,{children:`isInvalid`}),` with `,(0,T.jsx)(t.code,{children:`errorMessage`}),` and `,(0,T.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Form integration`}),`: Set `,(0,T.jsx)(t.code,{children:`name`}),` and the value submits as part of a native `,(0,T.jsx)(t.code,{children:`<form>`}),` (multiple values submit as repeated entries)`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria Select for accessibility, keyboard navigation, and typeahead`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsx)(t.p,{children:`Minimal usage with a label and a placeholder.`}),`
`,(0,T.jsx)(i,{of:p,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

export function DefaultExample(props: Omit<SelectProps<object>, 'children'> = {}) {
  return (
    <Select label="Coffee" placeholder="Pick a drink" description="Select your favorite coffee" {...props}>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`select-controlled`,children:`Select Controlled`}),`
`,(0,T.jsxs)(t.p,{children:[`Use `,(0,T.jsx)(t.code,{children:`value`}),` and `,(0,T.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,T.jsx)(i,{of:h,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState } from 'react';
import { Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

export function SelectControlledExample() {
  const [value, setValue] = useState<SelectKey | null>('latte');

  return (
    <>
      <Select label="Coffee" placeholder="Pick a drink" value={value} onChange={setValue}>
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
`,(0,T.jsx)(t.h3,{id:`select-multiple`,children:`Select Multiple`}),`
`,(0,T.jsxs)(t.p,{children:[`Set `,(0,T.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,T.jsx)(t.code,{children:`value`}),` is an array of keys.`]}),`
`,(0,T.jsx)(i,{of:y,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState } from 'react';
import { Select, SelectItem, Text, type SelectKey } from '@godaddy/antares';

export function SelectMultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select
        label="Coffees you like"
        placeholder="Pick one or more"
        selectionMode="multiple"
        value={value}
        onChange={setValue}
      >
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
`,(0,T.jsx)(t.h3,{id:`select-invalid`,children:`Select Invalid`}),`
`,(0,T.jsxs)(t.p,{children:[`Use `,(0,T.jsx)(t.code,{children:`isInvalid`}),` with `,(0,T.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,T.jsx)(i,{of:v,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Select, SelectItem } from '@godaddy/antares';

export function SelectInvalidExample() {
  return (
    <Select label="Coffee" placeholder="Pick a drink" errorMessage="Please choose a drink" isInvalid isRequired>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`select-disabled`,children:`Select Disabled`}),`
`,(0,T.jsxs)(t.p,{children:[`Use `,(0,T.jsx)(t.code,{children:`isDisabled`}),` to prevent interaction.`]}),`
`,(0,T.jsx)(i,{of:g,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Select, SelectItem } from '@godaddy/antares';

export function SelectDisabledExample() {
  return (
    <Select label="Coffee" defaultValue="latte" isDisabled>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`select-form`,children:`Select Form`}),`
`,(0,T.jsxs)(t.p,{children:[`Set `,(0,T.jsx)(t.code,{children:`name`}),` to submit the value with a native `,(0,T.jsx)(t.code,{children:`<form>`}),`. Multiple-mode values submit as repeated entries with the same `,(0,T.jsx)(t.code,{children:`name`}),`.`]}),`
`,(0,T.jsx)(i,{of:_,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState, type FormEvent } from 'react';
import { Box, Button, Flex, Select, SelectItem, Text } from '@godaddy/antares';

export function SelectFormExample() {
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
      <Select name="drink" label="Drink" placeholder="Pick a drink" isRequired>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select name="extras" label="Extras" placeholder="Pick any extras" selectionMode="multiple">
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
`,(0,T.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,T.jsxs)(t.p,{children:[`Compare the supported `,(0,T.jsx)(t.code,{children:`md`}),` and `,(0,T.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,T.jsx)(i,{of:b,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select label="Coffee (md)" placeholder="Pick a drink">
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select label="Coffee (sm)" placeholder="Pick a drink" size="sm">
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,T.jsx)(t.p,{children:`Compose the interior out of Antares components when the default layout is not enough.
Select renders your children as-is instead of building its own layout.`}),`
`,(0,T.jsx)(i,{of:u,inline:!0}),`
`,(0,T.jsx)(r,{code:`import {
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
        <Button variant="trigger">
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
`,(0,T.jsx)(t.h3,{id:`composed-with-state`,children:`Composed with state`}),`
`,(0,T.jsxs)(t.p,{children:[`Pass a function when the interior needs the Select state. It receives `,(0,T.jsx)(t.code,{children:`isOpen`}),`,
`,(0,T.jsx)(t.code,{children:`isInvalid`}),`, and the rest of the render props.`]}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsx)(r,{code:`import {
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

export function ComposedStateExample() {
  return (
    <Select placeholder="Pick a drink">
      {function renderInterior({ isOpen }) {
        return (
          <>
            <Label>Drink</Label>
            <Group alignItems="center">
              <Button variant="trigger">
                <SelectValue />
                <Icon icon="chevron-down" />
              </Button>
            </Group>
            <Text slot="description">{isOpen ? 'Use the arrow keys to browse' : 'Choose your favorite drink'}</Text>
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
          </>
        );
      }}
    </Select>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`custom-option`,children:`Custom option`}),`
`,(0,T.jsx)(t.p,{children:`Option components may wrap SelectItem and still use Select's default layout.`}),`
`,(0,T.jsx)(i,{of:f,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Select, SelectItem, type SelectItemProps } from '@godaddy/antares';

function CountryOption(props: SelectItemProps) {
  return <SelectItem {...props} />;
}

export function CustomOptionExample() {
  return (
    <Select label="Country" placeholder="Pick a country">
      <CountryOption id="us">United States</CountryOption>
      <CountryOption id="mx">Mexico</CountryOption>
      <CountryOption id="gb">United Kingdom</CountryOption>
    </Select>
  );
}`,language:`tsx`}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.code,{children:`children`}),` accepts three shapes:`]}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsxs)(t.strong,{children:[(0,T.jsx)(t.code,{children:`SelectItem`}),` options.`]}),` Select renders the label, trigger, messages, and popover listbox around them.`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`A composed interior.`}),` Pass Antares components (`,(0,T.jsx)(t.code,{children:`Label`}),`, `,(0,T.jsx)(t.code,{children:`Group`}),`, `,(0,T.jsx)(t.code,{children:`Button`}),`, `,(0,T.jsx)(t.code,{children:`SelectValue`}),`, `,(0,T.jsx)(t.code,{children:`Popover`}),`,
`,(0,T.jsx)(t.code,{children:`Content`}),`, `,(0,T.jsx)(t.code,{children:`ListBox`}),`, `,(0,T.jsx)(t.code,{children:`Text`}),`, `,(0,T.jsx)(t.code,{children:`FieldError`}),`) and Select renders them as-is instead of its default layout.
`,(0,T.jsx)(t.code,{children:`SelectValue`}),` displays the current selection inside a `,(0,T.jsx)(t.code,{children:`Button variant="trigger"`}),`.`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`A function returning that interior.`}),` Use this when the interior needs the Select state: it receives
`,(0,T.jsx)(t.code,{children:`isOpen`}),`, `,(0,T.jsx)(t.code,{children:`isInvalid`}),`, and the rest of the render props.`]}),`
`]}),`
`,(0,T.jsx)(t.p,{children:`Select recognizes a composed interior by seeing one of those components as a direct child. If you
wrap them in your own component or an element, use the function form so there is nothing to detect.`}),`
`,(0,T.jsxs)(t.p,{children:[`Use `,(0,T.jsx)(t.code,{children:`variant="control"`}),` when Select shares a `,(0,T.jsx)(t.code,{children:`Group`}),` owned by another field, such as a currency Select
inside a TextField. This explicitly omits Select's own field shell. The default variant renders a complete field.`]}),`
`,(0,T.jsxs)(t.p,{children:[`Option components may wrap `,(0,T.jsx)(t.code,{children:`SelectItem`}),`. Select passes unrecognized children to its ListBox, whose collection
builder resolves the wrapped items.`]}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`Select`}),` component accepts the following props:`]}),`
`,(0,T.jsx)(a,{of:m})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),l(),S()}))();export{w as default};