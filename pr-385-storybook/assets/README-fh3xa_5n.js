import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,l as r,n as i,s as a,u as o}from"./blocks-DrzUE4cn.js";import{i as s,r as c}from"./react-BXJ34t_g.js";import{i as l,n as u,r as d,t as f}from"./text-area.stories-CsCceTFl.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...s(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`textarea`,children:`TextArea`}),`
`,(0,h.jsx)(t.p,{children:`Multiline text control for use inside a field.`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.code,{children:`TextArea`}),` is the multiline control inside a field, not a field on its own. Prefer `,(0,h.jsx)(t.code,{children:`TextField`}),` as the parent; see that component for fuller examples.`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`TextArea inside TextField.`}),`
`,(0,h.jsx)(r,{of:f,inline:!0}),`
`,(0,h.jsx)(n,{code:`import { Label, TextArea, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <TextArea placeholder="Enter your comment" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`<TextField>
  <Label>Comment</Label>
  <TextArea placeholder="Enter your comment" />
</TextField>
`})}),`
`,(0,h.jsx)(t.h3,{id:`textarea-1`,children:`TextArea`}),`
`,(0,h.jsx)(i,{of:u})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),c(),o(),d()})))()}g();export{m as default};