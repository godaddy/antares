import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DnUz_dMH.js";import{a as l,i as u,n as d,r as f,t as p}from"./heading.stories-MKtm3w_D.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:u,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`heading`,children:`Heading`}),`
`,(0,g.jsx)(t.p,{children:`Semantic h1-h6 heading. Use slot="title" inside a Modal or Dialog to name the overlay.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Renders `,(0,g.jsx)(t.code,{children:`h1`}),`-`,(0,g.jsx)(t.code,{children:`h6`}),` from the `,(0,g.jsx)(t.code,{children:`level`}),` prop (default `,(0,g.jsx)(t.code,{children:`3`}),`). The level never changes the visual size.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Without `,(0,g.jsx)(t.code,{children:`size`}),`, takes the heading tier of the surrounding `,(0,g.jsx)(t.code,{children:`SizeProvider`}),`.
`,(0,g.jsx)(t.code,{children:`size`}),` picks a step on the heading ramp (`,(0,g.jsx)(t.code,{children:`xs`}),` to `,(0,g.jsx)(t.code,{children:`2xl`}),`).`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`emphasis`}),` picks a feedback color and changes only the color.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`slot="title"`}),` inside a `,(0,g.jsx)(t.code,{children:`Modal`}),` or `,(0,g.jsx)(t.code,{children:`Dialog`}),` sets the accessible name, and takes the overlay's
title tier, one step above the heading tier.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`Heading`}),` renders a semantic `,(0,g.jsx)(t.code,{children:`h1`}),`-`,(0,g.jsx)(t.code,{children:`h6`}),` element via the `,(0,g.jsx)(t.code,{children:`level`}),` prop.
Inside a `,(0,g.jsx)(t.code,{children:`Modal`}),`/`,(0,g.jsx)(t.code,{children:`Dialog`}),`, add `,(0,g.jsx)(t.code,{children:`slot="title"`}),` and it labels the dialog automatically.`]}),`
`,(0,g.jsx)(a,{of:p,inline:!0}),`
`,(0,g.jsx)(i,{code:`import { Flex, Heading } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`level`}),` sets the semantics and `,(0,g.jsx)(t.code,{children:`size`}),` sets the look, so the two never have to match. Without
`,(0,g.jsx)(t.code,{children:`size`}),`, a heading takes the size scope's heading tier at any level.`]}),`
`,(0,g.jsx)(a,{of:f,inline:!0}),`
`,(0,g.jsx)(i,{code:`import { Flex, Heading } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={2} size="2xl">
        Level 2, 2xl
      </Heading>
      <Heading level={2} size="sm">
        Level 2, sm
      </Heading>
      <Heading level={4} size="xl">
        Level 4, xl
      </Heading>
      <Heading level={4}>Level 4, default tier</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(t.h3,{id:`heading-1`,children:`Heading`}),`
`,(0,g.jsx)(o,{of:d})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=t(),n(),c(),l()})))()}_();export{h as default};