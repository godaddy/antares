import{i as e}from"./preload-helper-DC4ZmUQl.js";import{y as t}from"./iframe-CWhXmSnF.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-wWTpXXcY.js";import{t as c}from"./mdx-react-shim-3Txel1EJ.js";import{Basic as l,Controlled as u,Disabled as d,Form as f,Invalid as p,Multiple as m,Props as h,n as g,t as _}from"./select.stories-C-U4yLqS.js";var v,y=e((()=>{v=`import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

export function SelectBasic(props: Omit<SelectProps<object>, 'children'> = {}) {
  return (
    <Select label="Coffee" placeholder="Pick a drink" description="Select your favorite coffee" {...props}>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
`})),b,x=e((()=>{b=`import { useState } from 'react';
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
}
`})),S,C=e((()=>{S=`import { Select, SelectItem } from '@godaddy/antares';

export function SelectDisabledExample() {
  return (
    <Select label="Coffee" defaultValue="latte" isDisabled>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}
`})),w,T=e((()=>{w=`import { useState, type FormEvent } from 'react';
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
}
`})),E,D=e((()=>{E=`import { Select, SelectItem } from '@godaddy/antares';

export function SelectInvalidExample() {
  return (
    <Select label="Coffee" placeholder="Pick a drink" errorMessage="Please choose a drink" isInvalid isRequired>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}
`})),O,k=e((()=>{O=`import { useState } from 'react';
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
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`select`,children:`Select`}),`
`,(0,M.jsx)(t.p,{children:`Select is a dropdown for picking one or more values from a list of options. It renders a labeled trigger and a popover listbox, supports single and multiple selection, and submits naturally inside a form.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,M.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,M.jsx)(t.code,{children:`value`}),` and `,(0,M.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,M.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,M.jsx)(t.code,{children:`isInvalid`}),` with `,(0,M.jsx)(t.code,{children:`errorMessage`}),` and `,(0,M.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Form integration`}),`: Set `,(0,M.jsx)(t.code,{children:`name`}),` and the value submits as part of a native `,(0,M.jsx)(t.code,{children:`<form>`}),` (multiple values submit as repeated entries)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria Select for accessibility, keyboard navigation, and typeahead`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(t.p,{children:`The Select component accepts the following props:`}),`
`,(0,M.jsx)(a,{of:h}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,M.jsx)(t.p,{children:`Minimal usage with a label and a placeholder.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`value`}),` and `,(0,M.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`multiple`,children:`Multiple`}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,M.jsx)(t.code,{children:`value`}),` is an array of keys.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(i,{of:m,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isInvalid`}),` with `,(0,M.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isDisabled`}),` to prevent interaction.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`form`,children:`Form`}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`name`}),` to submit the value with a native `,(0,M.jsx)(t.code,{children:`<form>`}),`. Multiple-mode values submit as repeated entries with the same `,(0,M.jsx)(t.code,{children:`name`}),`.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(i,{of:f,inline:!0})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};