import{i as e}from"./preload-helper-C3N-5HIY.js";import{F as t}from"./iframe-CPok8W3g.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Dcue1xIi.js";import{t as c}from"./mdx-react-shim-DTpKBfoh.js";import{t as l}from"./runtime-jVSrQ8Uf.js";import{Default as u,Props as d,n as f,t as p}from"./text-area.stories-B3NFWgUO.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`textarea`,children:`TextArea`}),`
`,(0,g.jsx)(t.p,{children:`Multiline text control for use inside a field.`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`TextArea`}),` is the multiline control inside a field, not a field on its own. Prefer `,(0,g.jsx)(t.code,{children:`TextField`}),` as the parent; see that component for fuller examples.`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<TextField>
  <Label>Comment</Label>
  <TextArea placeholder="Enter your comment" />
</TextField>
`})}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`TextArea inside TextField.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Label, TextArea, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <TextArea placeholder="Enter your comment" />
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),p()}))();export{h as default};