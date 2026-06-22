import{i as e}from"./preload-helper-Dcqo6Rym.js";import{y as t}from"./iframe-DWFHbJPR.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-Ci4sVu2X.js";import{t as s}from"./mdx-react-shim-BddsuBqR.js";import{Props as c,n as l,t as u}from"./field-error.stories-DFEN1XK7.js";var d,f=e((()=>{d=`import { FieldError, type FieldErrorProps } from '@bento/field-error';
/* v8 ignore next */
import React from 'react';

export function DefaultExample(args: FieldErrorProps) {
  return <FieldError {...args}>This field is required</FieldError>;
}
`}));function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:u,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`fielderror`,children:`FieldError`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`@bento/field-error`}),` package provides the `,(0,h.jsx)(t.code,{children:`FieldError`}),` component, which is used to display error messages in form primitives, such as `,(0,h.jsx)(t.code,{children:`RadioGroup`}),` or `,(0,h.jsx)(t.code,{children:`CheckboxGroup`}),`. It is meant to be used in conjunction with form controls such as the `,(0,h.jsx)(t.code,{children:`RadioGroup`}),` or `,(0,h.jsx)(t.code,{children:`CheckboxGroup`}),` primitives.`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/field-error
`})}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,h.jsx)(t.code,{children:`FieldError`}),` component:`]}),`
`,(0,h.jsx)(i,{of:c}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsxs)(t.p,{children:[`A simple usage of the `,(0,h.jsx)(t.code,{children:`FieldError`}),` component. The error message is only displayed when `,(0,h.jsx)(t.code,{children:`isInvalid`}),` is `,(0,h.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,h.jsx)(r,{language:`tsx`,code:d})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),s(),o(),l(),f()}))();export{m as default};