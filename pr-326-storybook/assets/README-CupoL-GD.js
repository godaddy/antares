import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-Biz6xSrB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-VhroJ_WZ.js";import{t as c}from"./mdx-react-shim-AbUrKz4h.js";import{t as l}from"./runtime-CCpseHws.js";import{Default as u,Props as d,n as f,t as p}from"./text-area.stories-DoEXWUPL.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`textarea`,children:`TextArea`}),`
`,(0,g.jsx)(t.p,{children:`Multiline text control for use inside a Group. Field injects field chrome via TextAreaContext.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Fills remaining space in a `,(0,g.jsx)(t.code,{children:`Group`}),`.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Pair with `,(0,g.jsx)(t.code,{children:`TextField`}),` and `,(0,g.jsx)(t.code,{children:`Group`}),` when composing. `,(0,g.jsx)(t.code,{children:`TextField`}),` also accepts `,(0,g.jsx)(t.code,{children:`multiline`}),` for the common case.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`TextArea fills a Group inside TextField. Field injects chrome.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Group, Label, TextArea, TextField } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <Group>
        <TextArea placeholder="Enter your comment" />
      </Group>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),p()}))();export{h as default};