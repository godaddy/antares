import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{i as l,n as u,r as d,t as f}from"./heading.stories-BVE8zKYj.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:d,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`heading`,children:`Heading`}),`
`,(0,h.jsx)(t.p,{children:`Semantic h1-h6 heading. Use slot="title" inside a Modal or Dialog to name the overlay.`}),`
`,(0,h.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[`Renders `,(0,h.jsx)(t.code,{children:`h1`}),`-`,(0,h.jsx)(t.code,{children:`h6`}),` from the `,(0,h.jsx)(t.code,{children:`level`}),` prop (default `,(0,h.jsx)(t.code,{children:`3`}),`).`]}),`
`,(0,h.jsxs)(t.li,{children:[(0,h.jsx)(t.code,{children:`slot="title"`}),` inside a `,(0,h.jsx)(t.code,{children:`Modal`}),` or `,(0,h.jsx)(t.code,{children:`Dialog`}),` sets the accessible name.`]}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.code,{children:`Heading`}),` renders a semantic `,(0,h.jsx)(t.code,{children:`h1`}),`-`,(0,h.jsx)(t.code,{children:`h6`}),` element via the `,(0,h.jsx)(t.code,{children:`level`}),` prop.
Inside a `,(0,h.jsx)(t.code,{children:`Modal`}),`/`,(0,h.jsx)(t.code,{children:`Dialog`}),`, add `,(0,h.jsx)(t.code,{children:`slot="title"`}),` and it labels the dialog automatically.`]}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { Flex, Heading } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),l()})))()}g();export{m as default};