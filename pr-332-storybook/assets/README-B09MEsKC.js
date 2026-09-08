import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{i as l,n as u,r as d,t as f}from"./label.stories-Cmq1Wh94.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`label`,children:`Label`}),`
`,(0,h.jsx)(t.p,{children:`Names a form field. The required asterisk appears when the field is required.`}),`
`,(0,h.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsx)(t.li,{children:`Associates the visible name with the field control.`}),`
`,(0,h.jsxs)(t.li,{children:[`Field CSS adds the required asterisk when the field root is `,(0,h.jsx)(t.code,{children:`isRequired`}),`. That is not a Label prop.`]}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsxs)(t.p,{children:[`Label names a field. The required asterisk comes from Field CSS when the root is `,(0,h.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField isRequired>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),d()})))()}g();export{m as default};