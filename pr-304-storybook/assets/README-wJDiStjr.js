import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D_rQDTTD.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./text-field.stories-CMWdTLbh.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`textfield`,children:`TextField`}),`
`,(0,x.jsx)(t.p,{children:`TextField is a single-line or multiline text input with optional label, description, and error message. Use it in forms for short answers (email, search, name) or longer content (comments). It supports optional leading and trailing text adornments (e.g. currency or units).`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Adornments`}),`: Optional `,(0,x.jsx)(t.code,{children:`leadingText`}),` and `,(0,x.jsx)(t.code,{children:`trailingText`}),` for fixed text before or after the input (e.g. `,(0,x.jsx)(t.code,{children:`$`}),`, `,(0,x.jsx)(t.code,{children:`.00`}),`, `,(0,x.jsx)(t.code,{children:`px`}),`)`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,x.jsx)(t.code,{children:`value`}),` and `,(0,x.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,x.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Multiline`}),`: Set `,(0,x.jsx)(t.code,{children:`multiline`}),` to render a textarea instead of a single-line input`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,x.jsx)(t.code,{children:`isInvalid`}),` with `,(0,x.jsx)(t.code,{children:`errorMessage`}),` and `,(0,x.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria TextField for accessibility and behavior`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Minimal usage with label and placeholder.`}),`
`,(0,x.jsx)(a,{of:_,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function DefaultExample(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`text-field-controlled`,children:`Text Field Controlled`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`value`}),` and `,(0,x.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
import { Text, TextField } from '@godaddy/antares';

export function TextFieldControlledExample() {
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
`,(0,x.jsx)(t.h3,{id:`text-field-invalid`,children:`Text Field Invalid`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`isInvalid`}),` with `,(0,x.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,x.jsx)(a,{of:m,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { TextField } from '@godaddy/antares';

export function TextFieldInvalidExample() {
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
`,(0,x.jsx)(t.h3,{id:`text-field-disabled`,children:`Text Field Disabled`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { TextField } from '@godaddy/antares';

export function TextFieldDisabledExample() {
  return <TextField label="Name" placeholder="Enter your name" defaultValue="Disabled value" isDisabled />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`text-field-adornments`,children:`Text Field Adornments`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`leadingText`}),` and `,(0,x.jsx)(t.code,{children:`trailingText`}),` for fixed text before and after the input, such as currency.`]}),`
`,(0,x.jsx)(a,{of:h,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { TextField } from '@godaddy/antares';

export function TextFieldAdornmentsExample() {
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
`,(0,x.jsx)(t.h3,{id:`text-field-multiline`,children:`Text Field Multiline`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`multiline`}),` to render a textarea.`]}),`
`,(0,x.jsx)(a,{of:g,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldMultilineExample(props: TextFieldProps) {
  return <TextField label="Comment" placeholder="Enter your comment" multiline {...props} />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,x.jsxs)(t.p,{children:[`Compare the supported `,(0,x.jsx)(t.code,{children:`md`}),` and `,(0,x.jsx)(t.code,{children:`sm`}),` visual sizes.`]}),`
`,(0,x.jsx)(a,{of:u,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Flex, TextField } from '@godaddy/antares';

export function TextFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField label="Email (md)" placeholder="you@example.com" />
      <TextField label="Email (sm)" placeholder="you@example.com" size="sm" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`TextField`}),` component accepts the following props:`]}),`
`,(0,x.jsx)(o,{of:p})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),f()})))()}S();export{b as default};