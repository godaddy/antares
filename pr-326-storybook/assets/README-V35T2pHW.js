import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-JXj9PTpo.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DtlOBjFJ.js";import{t as c}from"./mdx-react-shim-AwHuqFBt.js";import{t as l}from"./runtime-CCpseHws.js";import{CustomAnchor as u,Default as d,PopoverTriggerProps as f,Props as p,WithCloseButton as m,n as h,t as g}from"./popover.stories-DcUqF5aR.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`popover`,children:`Popover`}),`
`,(0,y.jsx)(t.p,{children:`The Popover component is an overlay element positioned relative to a trigger element.`}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.code,{children:`PopoverTrigger`}),` wraps a trigger button and a `,(0,y.jsx)(t.code,{children:`<Popover>`}),`, handling open state and positioning automatically.
Based on RAC `,(0,y.jsx)(t.code,{children:`DialogTrigger`}),`. To anchor a popover to an element it doesn't wrap, pass `,(0,y.jsx)(t.code,{children:`triggerRef`}),` instead.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsxs)(t.p,{children:[`Use it with `,(0,y.jsx)(t.code,{children:`<PopoverTrigger>`}),`, which wraps both the popover content and an interactive trigger element (for example, a `,(0,y.jsx)(t.code,{children:`Button`}),`).`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Content, Popover, PopoverTrigger, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>
        <Content>This is the popover content!</Content>
      </Popover>
    </PopoverTrigger>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,y.jsxs)(t.p,{children:[`To position a popover relative to a different element than its trigger, use the `,(0,y.jsx)(t.code,{children:`triggerRef`}),` and `,(0,y.jsx)(t.code,{children:`isOpen`}),` props instead of `,(0,y.jsx)(t.code,{children:`<PopoverTrigger>`}),`. `,(0,y.jsx)(t.code,{children:`onOpenChange`}),` is called when the user opens or closes the popover.`]}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Popover, Box, Content, Flex, Button } from '@godaddy/antares';
import { useRef, useState } from 'react';

export function CustomAnchorExample() {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex gap="sm" alignItems="center">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open Popover
      </Button>

      <Box elevation="card" ref={triggerRef}>
        Popover will be positioned relative to me
      </Box>

      <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen} aria-label="Popover">
        <Content>Popover content!</Content>
      </Popover>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`title-and-close-button`,children:`Title and Close Button`}),`
`,(0,y.jsxs)(t.p,{children:[`Add a `,(0,y.jsx)(t.code,{children:`Heading slot="title"`}),` and a `,(0,y.jsx)(t.code,{children:`CloseButton`}),` for a titled, dismissible popover. The heading
also gives the dialog its accessible name.`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Button, CloseButton, Content, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>
        <Heading slot="title">Popover title</Heading>
        <CloseButton />
        <Content>This is the popover content!</Content>
      </Popover>
    </PopoverTrigger>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Key`}),(0,y.jsx)(t.th,{children:`Action`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`Enter/Space`})}),(0,y.jsx)(t.td,{children:`Opens the popover from its trigger`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`Escape`})}),(0,y.jsx)(t.td,{children:`Closes the popover`})]})]})]}),`
`,(0,y.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`role="dialog"`}),` is applied automatically by the underlying React Aria `,(0,y.jsx)(t.code,{children:`Dialog`})]}),`
`,(0,y.jsxs)(t.li,{children:[`A `,(0,y.jsx)(t.code,{children:`Heading slot="title"`}),` labels the dialog via `,(0,y.jsx)(t.code,{children:`aria-labelledby`}),`. Without one, a popover inside
a `,(0,y.jsx)(t.code,{children:`PopoverTrigger`}),` falls back to being labelled by its trigger; standing alone with
`,(0,y.jsx)(t.code,{children:`triggerRef`}),` it needs an explicit `,(0,y.jsx)(t.code,{children:`aria-label`})]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[`Pass an `,(0,y.jsx)(t.code,{children:`aria-label`}),` when anchoring with `,(0,y.jsx)(t.code,{children:`triggerRef`}),` instead of wrapping a `,(0,y.jsx)(t.code,{children:`PopoverTrigger`}),`,
since there is no trigger to borrow the name from.`]}),`
`,(0,y.jsx)(t.li,{children:`Popover width is determined by its content, and it's recommended to keep it under 400px.`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`<PopoverTrigger>
  <Button />
  <Popover>
    <Heading slot="title" />
    <CloseButton />
    <Content />
    {/* ... */}
  </Popover>
</PopoverTrigger>
`})}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`Popover`}),` component accepts the following props:`]}),`
`,(0,y.jsx)(a,{of:p}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`PopoverTrigger`}),` component accepts the following props:`]}),`
`,(0,y.jsx)(a,{of:f})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),l(),g()}))();export{v as default};