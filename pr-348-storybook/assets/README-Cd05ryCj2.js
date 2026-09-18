import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-CGoVW9BK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Drngl9sn.js";import{t as c}from"./mdx-react-shim-Bl9Gsb4H.js";import{t as l}from"./runtime-BXZUr_13.js";import{Default as u,Props as d,n as f,t as p}from"./label.stories-ChL7HDMY.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`label`,children:`Label`}),`
`,(0,g.jsx)(t.p,{children:`Names a form field. The required asterisk appears when the field is required.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsx)(t.li,{children:`Associates the visible name with the field control.`}),`
`,(0,g.jsxs)(t.li,{children:[`Typography participant: consumes field defaults, then interface size, then standalone `,(0,g.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Uses a distinct medium-weight treatment. Explicit `,(0,g.jsx)(t.code,{children:`size`}),` and `,(0,g.jsx)(t.code,{children:`emphasis`}),` override independently.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Field CSS adds the required asterisk when the field root is `,(0,g.jsx)(t.code,{children:`isRequired`}),`. That is not a Label prop.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsxs)(t.p,{children:[`Label names a field. The required asterisk comes from Field CSS when the root is `,(0,g.jsx)(t.code,{children:`isRequired`}),`.`]}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

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
`,(0,g.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,g.jsxs)(t.p,{children:[`Label retains the existing label intents for family (`,(0,g.jsx)(t.code,{children:`--ux-15ks663`}),`), weight (`,(0,g.jsx)(t.code,{children:`--ux-aarlu5`}),`),
line height (`,(0,g.jsx)(t.code,{children:`--ux-h93mi7`}),`), and variation (`,(0,g.jsx)(t.code,{children:`--ux-1qg0ofw`}),`). Default weight is 500 and line height
is 1.375. TextField uses this same treatment for its Label.`]}),`
`,(0,g.jsxs)(t.p,{children:[`The six sizes map to existing global font-size tokens: `,(0,g.jsx)(t.code,{children:`xs`}),` -> `,(0,g.jsx)(t.code,{children:`--font-size-010`}),`, `,(0,g.jsx)(t.code,{children:`sm`}),` -> `,(0,g.jsx)(t.code,{children:`020`}),`,
`,(0,g.jsx)(t.code,{children:`md`}),` -> `,(0,g.jsx)(t.code,{children:`040`}),`, `,(0,g.jsx)(t.code,{children:`lg`}),` -> `,(0,g.jsx)(t.code,{children:`050`}),`, `,(0,g.jsx)(t.code,{children:`xl`}),` -> `,(0,g.jsx)(t.code,{children:`060`}),`, and `,(0,g.jsx)(t.code,{children:`2xl`}),` -> `,(0,g.jsx)(t.code,{children:`070`}),`. Their fallback values are
0.6875, 0.75, 0.875, 1, 1.125, and 1.25rem; `,(0,g.jsx)(t.code,{children:`md`}),` also retains the `,(0,g.jsx)(t.code,{children:`--ux-16aixzc`}),` fallback.`]}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(t.h3,{id:`label-1`,children:`Label`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),p()}))();export{h as default};