import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{i as l,n as u,r as d,t as f}from"./text-area.stories-Dj8eJQ9l.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`textarea`,children:`TextArea`}),`
`,(0,h.jsx)(t.p,{children:`Multiline text control for use inside a field.`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.code,{children:`TextArea`}),` is the multiline control inside a field, not a field on its own. Prefer `,(0,h.jsx)(t.code,{children:`TextField`}),` as the parent; see that component for fuller examples.`]}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`<TextField>
  <Label>Comment</Label>
  <TextArea placeholder="Enter your comment" />
</TextField>
`})}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`TextArea inside TextField.`}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { Label, TextArea, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <TextArea placeholder="Enter your comment" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),d()})))()}g();export{m as default};