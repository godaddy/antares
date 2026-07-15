import{i as e}from"./preload-helper-DPdjVz-1.js";import{y as t}from"./iframe-DLDhSgc9.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BV1GVmsi.js";import{t as c}from"./mdx-react-shim-DbafqrXx.js";import{Basic as l,Controlled as u,Disabled as d,Invalid as f,Props as p,Sizes as m,n as h,t as g}from"./telephone-field.stories-BQuEGOX_.js";var _,v=e((()=>{_=`import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldBasicExample() {
  return (
    <TelephoneField
      label="Phone number"
      placeholder="555-555-5555"
      defaultCountry="us"
      countryLabel="Country code"
      description="We'll only call about your order."
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
      <SelectItem id="gb">GB +44</SelectItem>
    </TelephoneField>
  );
}
`})),y,b=e((()=>{y=`import { useState } from 'react';
import { SelectItem, Text, TelephoneField, type SelectKey } from '@godaddy/antares';

export function TelephoneFieldControlledExample() {
  const [country, setCountry] = useState<SelectKey | null>('us');
  const [value, setValue] = useState('');

  return (
    <>
      <TelephoneField
        label="Phone number"
        placeholder="555-555-5555"
        countryLabel="Country code"
        country={country}
        onCountryChange={setCountry}
        value={value}
        onChange={setValue}
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
        <SelectItem id="gb">GB +44</SelectItem>
      </TelephoneField>
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}
`})),x,S=e((()=>{x=`import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldInvalidExample() {
  return (
    <TelephoneField
      label="Phone number"
      defaultCountry="us"
      countryLabel="Country code"
      defaultValue="555"
      isInvalid
      isRequired
      errorMessage="Enter a valid phone number."
      description="We'll only call about your order."
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
    </TelephoneField>
  );
}
`})),C,w=e((()=>{C=`import { SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldDisabledExample() {
  return (
    <TelephoneField
      label="Phone number"
      defaultCountry="us"
      countryLabel="Country code"
      defaultValue="555-555-5555"
      isDisabled
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
    </TelephoneField>
  );
}
`})),T,E=e((()=>{T=`import { Flex, SelectItem, TelephoneField } from '@godaddy/antares';

export function TelephoneFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TelephoneField
        label="Phone number (md)"
        defaultCountry="us"
        countryLabel="Country code"
        placeholder="555-555-5555"
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
      </TelephoneField>
      <TelephoneField
        label="Phone number (sm)"
        defaultCountry="us"
        countryLabel="Country code"
        placeholder="555-555-5555"
        size="sm"
      >
        <SelectItem id="us">US +1</SelectItem>
        <SelectItem id="mx">MX +52</SelectItem>
      </TelephoneField>
    </Flex>
  );
}
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:h,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`telephonefield`,children:`TelephoneField`}),`
`,(0,k.jsx)(t.p,{children:`TelephoneField pairs a country/dial-code picker with a phone number input inside one bordered field, for capturing an international phone number.`}),`
`,(0,k.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Country picker + phone input`}),`: A country/dial-code `,(0,k.jsx)(t.code,{children:`Select`}),` and a phone number input share one bordered field`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,k.jsx)(t.code,{children:`country`}),`/`,(0,k.jsx)(t.code,{children:`onCountryChange`}),` and `,(0,k.jsx)(t.code,{children:`value`}),`/`,(0,k.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,k.jsx)(t.code,{children:`defaultCountry`}),`/`,(0,k.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,k.jsx)(t.code,{children:`isInvalid`}),` with `,(0,k.jsx)(t.code,{children:`errorMessage`}),` and `,(0,k.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Raw values, no formatting`}),`: The phone number is the exact string the user typed — TelephoneField applies no masking or E.164 formatting, so combine `,(0,k.jsx)(t.code,{children:`country`}),` and `,(0,k.jsx)(t.code,{children:`value`}),` however the consuming form or backend expects`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.strong,{children:`Composable options`}),`: Country options are plain `,(0,k.jsx)(t.code,{children:`SelectItem`}),` children, so callers control the exact list and label of supported countries`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(t.p,{children:`The TelephoneField component accepts the following props:`}),`
`,(0,k.jsx)(a,{of:p}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,k.jsx)(t.p,{children:`Minimal usage with a label, a default country, and a placeholder.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(i,{of:l,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`country`}),`/`,(0,k.jsx)(t.code,{children:`onCountryChange`}),` and `,(0,k.jsx)(t.code,{children:`value`}),`/`,(0,k.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`isInvalid`}),` with `,(0,k.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`isDisabled`}),` to prevent interaction with both the country picker and the phone input.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C}),`
`,(0,k.jsx)(i,{of:d,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,k.jsxs)(t.p,{children:[`Set `,(0,k.jsx)(t.code,{children:`size="sm"`}),` for a more compact field.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(i,{of:m,inline:!0}),`
`,(0,k.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[`The country picker gets its own accessible name from `,(0,k.jsx)(t.code,{children:`countryLabel`}),`, since it has no visible label of its own — always pass one, localized for your UI`]}),`
`,(0,k.jsxs)(t.li,{children:[`For anything else the country picker needs (`,(0,k.jsx)(t.code,{children:`aria-describedby`}),`, `,(0,k.jsx)(t.code,{children:`aria-labelledby`}),`, `,(0,k.jsx)(t.code,{children:`id`}),`, …), pass `,(0,k.jsx)(t.code,{children:`countryProps`}),`, which is spread onto its underlying `,(0,k.jsx)(t.code,{children:`FieldSelect`})]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`label`}),`, `,(0,k.jsx)(t.code,{children:`description`}),`, and `,(0,k.jsx)(t.code,{children:`errorMessage`}),` are associated with the field automatically`]}),`
`,(0,k.jsxs)(t.li,{children:[`Built on React Aria's `,(0,k.jsx)(t.code,{children:`TextField`}),` and `,(0,k.jsx)(t.code,{children:`Select`}),`, giving full keyboard support: `,(0,k.jsx)(t.code,{children:`Tab`}),` moves between the country picker and the phone input, `,(0,k.jsx)(t.code,{children:`Enter`}),`/`,(0,k.jsx)(t.code,{children:`Space`}),` opens the country picker, and arrow keys/typeahead navigate its options`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`isDisabled`}),` and `,(0,k.jsx)(t.code,{children:`isInvalid`}),` are reflected with `,(0,k.jsx)(t.code,{children:`aria-disabled`}),`/`,(0,k.jsx)(t.code,{children:`data-disabled`}),` and `,(0,k.jsx)(t.code,{children:`aria-invalid`}),`/`,(0,k.jsx)(t.code,{children:`data-invalid`}),` on both segments`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[`Keep country option labels short and consistent (e.g. always `,(0,k.jsx)(t.code,{children:`<ISO code> +<dial code>`}),`) so the trigger stays readable at both `,(0,k.jsx)(t.code,{children:`md`}),` and `,(0,k.jsx)(t.code,{children:`sm`}),` sizes`]}),`
`,(0,k.jsxs)(t.li,{children:[`Pair `,(0,k.jsx)(t.code,{children:`isInvalid`}),` with a specific `,(0,k.jsx)(t.code,{children:`errorMessage`}),` (e.g. "Enter a valid phone number") rather than a generic one`]}),`
`,(0,k.jsxs)(t.li,{children:[`Validate and format the combined `,(0,k.jsx)(t.code,{children:`country`}),` + `,(0,k.jsx)(t.code,{children:`value`}),` where the number is consumed (on submit, or server-side) — TelephoneField intentionally does not mask or format as the user types`]}),`
`]})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),g(),v(),b(),S(),w(),E()}))();export{O as default};