import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{i as l,n as u,r as d,t as f}from"./field-error.stories-J2w1mZ_9.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:d,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`fielderror`,children:`FieldError`}),`
`,(0,h.jsx)(t.p,{children:`Validation message for a field. Renders only when the field is invalid.`}),`
`,(0,h.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[`Shown when the parent field is invalid (`,(0,h.jsx)(t.code,{children:`isInvalid`}),` or native constraint validation).`]}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`FieldError renders when the field is invalid.`}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { FieldError, Group, Input, Label, TextField } from '@godaddy/antares';

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
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),l()})))()}g();export{m as default};