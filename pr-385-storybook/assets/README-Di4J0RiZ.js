import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,l as r,n as i,s as a,u as o}from"./blocks-DrzUE4cn.js";import{i as s,r as c}from"./react-BXJ34t_g.js";import{i as l,n as u,r as d,t as f}from"./input.stories-BqXf5HJz.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...s(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`input`,children:`Input`}),`
`,(0,h.jsx)(t.p,{children:`Single-line text control for use inside a field.`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.code,{children:`Input`}),` is the single-line control inside a field, not a field on its own. Prefer `,(0,h.jsx)(t.code,{children:`TextField`}),` or `,(0,h.jsx)(t.code,{children:`NumberField`}),` as the parent; see those components for fuller examples.`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`Input inside TextField.`}),`
`,(0,h.jsx)(r,{of:f,inline:!0}),`
`,(0,h.jsx)(n,{code:`import { Input, Label, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`<TextField>
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
</TextField>
`})}),`
`,(0,h.jsx)(t.h3,{id:`input-1`,children:`Input`}),`
`,(0,h.jsx)(i,{of:u})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),c(),o(),d()})))()}g();export{m as default};