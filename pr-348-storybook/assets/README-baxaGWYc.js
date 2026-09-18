import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-CGoVW9BK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Drngl9sn.js";import{t as c}from"./mdx-react-shim-Bl9Gsb4H.js";import{t as l}from"./runtime-BXZUr_13.js";import{Default as u,Props as d,n as f,t as p}from"./heading.stories-v2D3SWkI.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:p,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`heading`,children:`Heading`}),`
`,(0,g.jsx)(t.p,{children:`Semantic h1-h6 heading. Use slot="title" inside a Modal or Dialog to name the overlay.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Renders `,(0,g.jsx)(t.code,{children:`h1`}),`-`,(0,g.jsx)(t.code,{children:`h6`}),` from the `,(0,g.jsx)(t.code,{children:`level`}),` prop, semantic context, then default `,(0,g.jsx)(t.code,{children:`3`}),`.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Typography participant: consumes slot defaults, then interface size, then standalone `,(0,g.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`level`}),` never changes visual size. Explicit six-tier `,(0,g.jsx)(t.code,{children:`size`}),` overrides the inherited tier.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`emphasis`}),` changes color independently of typography.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`slot="title"`}),` inside a `,(0,g.jsx)(t.code,{children:`Modal`}),` or `,(0,g.jsx)(t.code,{children:`Dialog`}),` sets the accessible name.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.code,{children:`Heading`}),` renders a semantic `,(0,g.jsx)(t.code,{children:`h1`}),`-`,(0,g.jsx)(t.code,{children:`h6`}),` element via the `,(0,g.jsx)(t.code,{children:`level`}),` prop.
Inside a `,(0,g.jsx)(t.code,{children:`Modal`}),`/`,(0,g.jsx)(t.code,{children:`Dialog`}),`, add `,(0,g.jsx)(t.code,{children:`slot="title"`}),` and it labels the dialog automatically.`]}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Flex, Heading } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,g.jsxs)(t.p,{children:[`The `,(0,g.jsx)(t.code,{children:`--font-heading-*`}),` tokens control `,(0,g.jsx)(t.code,{children:`family`}),`, `,(0,g.jsx)(t.code,{children:`weight`}),`, `,(0,g.jsx)(t.code,{children:`line-height`}),`, `,(0,g.jsx)(t.code,{children:`variation`}),`, and
`,(0,g.jsx)(t.code,{children:`size-{xs,sm,md,lg,xl,2xl}`}),`. Native HTML headings do not receive Antares typography.`]}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(t.h3,{id:`heading-1`,children:`Heading`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),f()}))();export{h as default};