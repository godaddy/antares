import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-Dc8dXhNl.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BmXUzL5y.js";import{t as c}from"./mdx-react-shim-B5zvPZBD.js";import{t as l}from"./runtime-BXZUr_13.js";import{Default as u,Props as d,Sizes as f,n as p,t as m}from"./heading.stories-BHIX0wSF.js";function h(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:m,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`heading`,children:`Heading`}),`
`,(0,_.jsx)(t.p,{children:`Semantic h1-h6 heading. Use slot="title" inside a Modal or Dialog to name the overlay.`}),`
`,(0,_.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[`Renders `,(0,_.jsx)(t.code,{children:`h1`}),`-`,(0,_.jsx)(t.code,{children:`h6`}),` from the `,(0,_.jsx)(t.code,{children:`level`}),` prop (default `,(0,_.jsx)(t.code,{children:`3`}),`). The level never changes the visual size.`]}),`
`,(0,_.jsxs)(t.li,{children:[`Without `,(0,_.jsx)(t.code,{children:`size`}),`, takes the heading tier of the surrounding `,(0,_.jsx)(t.a,{href:`../size-scope/README.mdx`,children:`SizeScope`}),`.
`,(0,_.jsx)(t.code,{children:`size`}),` picks a step on the heading ramp (`,(0,_.jsx)(t.code,{children:`xs`}),` to `,(0,_.jsx)(t.code,{children:`2xl`}),`).`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`emphasis`}),` picks a feedback color and changes only the color.`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`slot="title"`}),` inside a `,(0,_.jsx)(t.code,{children:`Modal`}),` or `,(0,_.jsx)(t.code,{children:`Dialog`}),` sets the accessible name, and takes the overlay's
title tier, one step above the heading tier.`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.code,{children:`Heading`}),` renders a semantic `,(0,_.jsx)(t.code,{children:`h1`}),`-`,(0,_.jsx)(t.code,{children:`h6`}),` element via the `,(0,_.jsx)(t.code,{children:`level`}),` prop.
Inside a `,(0,_.jsx)(t.code,{children:`Modal`}),`/`,(0,_.jsx)(t.code,{children:`Dialog`}),`, add `,(0,_.jsx)(t.code,{children:`slot="title"`}),` and it labels the dialog automatically.`]}),`
`,(0,_.jsx)(i,{of:u,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Flex, Heading } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.code,{children:`level`}),` sets the semantics and `,(0,_.jsx)(t.code,{children:`size`}),` sets the look, so the two never have to match. Without
`,(0,_.jsx)(t.code,{children:`size`}),`, a heading takes the size scope's heading tier at any level.`]}),`
`,(0,_.jsx)(i,{of:f,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Flex, Heading } from '@godaddy/antares';

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
      <Heading level={4}>Level 4, inherited tier</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(t.h3,{id:`heading-1`,children:`Heading`}),`
`,(0,_.jsx)(a,{of:d})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),l(),p()}))();export{g as default};