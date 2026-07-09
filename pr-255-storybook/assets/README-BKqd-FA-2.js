import{i as e}from"./preload-helper-C4CHD4He.js";import{y as t}from"./iframe-bNecAKq-.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BW7SWIem.js";import{t as c}from"./mdx-react-shim-CAnnfOBh.js";import{Adornments as l,Basic as u,Controlled as d,Disabled as f,Invalid as p,Multiline as m,Props as h,n as g,t as _}from"./text-field.stories-C70CVh1y.js";var v,y=e((()=>{v=`import { TextField } from '@godaddy/antares';

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
}
`})),b,x=e((()=>{b=`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldBasic(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}
`})),S,C=e((()=>{S=`import { useState } from 'react';
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
}
`})),w,T=e((()=>{w=`import { TextField } from '@godaddy/antares';

export function TextFieldDisabledExample() {
  return <TextField label="Name" placeholder="Enter your name" defaultValue="Disabled value" isDisabled />;
}
`})),E,D=e((()=>{E=`import { TextField } from '@godaddy/antares';

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
}
`})),O,k=e((()=>{O=`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldMultilineExample(props: TextFieldProps) {
  return <TextField label="Comment" placeholder="Enter your comment" multiline {...props} />;
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`textfield`,children:`TextField`}),`
`,(0,M.jsx)(t.p,{children:`TextField is a single-line or multiline text input with optional label, description, and error message. Use it in forms for short answers (email, search, name) or longer content (comments). It supports optional leading and trailing text adornments (e.g. currency or units).`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Label, description, error`}),`: Optional label, helper text, and error message with proper accessibility`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Adornments`}),`: Optional `,(0,M.jsx)(t.code,{children:`leadingText`}),` and `,(0,M.jsx)(t.code,{children:`trailingText`}),` for fixed text before or after the input (e.g. `,(0,M.jsx)(t.code,{children:`$`}),`, `,(0,M.jsx)(t.code,{children:`.00`}),`, `,(0,M.jsx)(t.code,{children:`px`}),`)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,M.jsx)(t.code,{children:`value`}),` and `,(0,M.jsx)(t.code,{children:`onChange`}),` for controlled state, or `,(0,M.jsx)(t.code,{children:`defaultValue`}),` for uncontrolled`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Multiline`}),`: Set `,(0,M.jsx)(t.code,{children:`multiline`}),` to render a textarea instead of a single-line input`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Validation states`}),`: Use `,(0,M.jsx)(t.code,{children:`isInvalid`}),` with `,(0,M.jsx)(t.code,{children:`errorMessage`}),` and `,(0,M.jsx)(t.code,{children:`isDisabled`}),` for validation and disabled state`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria TextField for accessibility and behavior`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(t.p,{children:`The TextField component accepts the following props:`}),`
`,(0,M.jsx)(a,{of:h}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,M.jsx)(t.p,{children:`Minimal usage with label and placeholder.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`value`}),` and `,(0,M.jsx)(t.code,{children:`onChange`}),` for controlled state.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`invalid`,children:`Invalid`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isInvalid`}),` with `,(0,M.jsx)(t.code,{children:`errorMessage`}),` for validation feedback.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isDisabled`}),` to prevent input.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`adornments`,children:`Adornments`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`leadingText`}),` and `,(0,M.jsx)(t.code,{children:`trailingText`}),` for fixed text before and after the input (e.g. currency).`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`multiline`,children:`Multiline`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`multiline`}),` to render a textarea.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(i,{of:m,inline:!0})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};