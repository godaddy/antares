import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DYvKcwiX.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Cy4eS4_o.js";import{t as c}from"./mdx-react-shim-Cd0-5OE-.js";import{t as l}from"./runtime-CCpseHws.js";import{Default as u,Props as d,n as f,t as p}from"./field-error.stories-BmTxqcD5.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:p,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`fielderror`,children:`FieldError`}),`
`,(0,g.jsx)(t.p,{children:`Validation message for a field. Renders only when the field is invalid.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Shown when the parent field is invalid (`,(0,g.jsx)(t.code,{children:`isInvalid`}),` or native constraint validation).`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`Group`}),` reads `,(0,g.jsx)(t.code,{children:`FieldErrorContext`}),` to paint invalid chrome. Do not put classNames on that context.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`FieldError renders when the field is invalid.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { FieldError, Group, Input, Label, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField isInvalid isRequired>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),f()}))();export{h as default};