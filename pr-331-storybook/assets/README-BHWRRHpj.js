import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D20fQPfa.js";import{a as l,i as u,n as d,o as f,r as p,s as m,t as h}from"./popover.stories-B0JOqaDE.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`popover`,children:`Popover`}),`
`,(0,v.jsx)(t.p,{children:`The Popover component is an overlay element positioned relative to a trigger element.`}),`
`,(0,v.jsxs)(t.p,{children:[(0,v.jsx)(t.code,{children:`PopoverTrigger`}),` wraps a trigger button and a `,(0,v.jsx)(t.code,{children:`<Popover>`}),`, handling open state and positioning automatically.
Based on RAC `,(0,v.jsx)(t.code,{children:`DialogTrigger`}),`. To anchor a popover to an element it doesn't wrap, pass `,(0,v.jsx)(t.code,{children:`triggerRef`}),` instead.`]}),`
`,(0,v.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsxs)(t.p,{children:[`Use it with `,(0,v.jsx)(t.code,{children:`<PopoverTrigger>`}),`, which wraps both the popover content and an interactive trigger element (for example, a `,(0,v.jsx)(t.code,{children:`Button`}),`).`]}),`
`,(0,v.jsx)(a,{of:d,inline:!0}),`
`,(0,v.jsx)(i,{code:`import { Content, Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,(0,v.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,v.jsxs)(t.p,{children:[`To position a popover relative to a different element than its trigger, use the `,(0,v.jsx)(t.code,{children:`triggerRef`}),` and `,(0,v.jsx)(t.code,{children:`isOpen`}),` props instead of `,(0,v.jsx)(t.code,{children:`<PopoverTrigger>`}),`. `,(0,v.jsx)(t.code,{children:`onOpenChange`}),` is called when the user opens or closes the popover.`]}),`
`,(0,v.jsx)(a,{of:h,inline:!0}),`
`,(0,v.jsx)(i,{code:`import { Popover, Box, Content, Flex, Button } from '@godaddy/antares';
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
`,(0,v.jsx)(t.h3,{id:`title-and-close-button`,children:`Title and Close Button`}),`
`,(0,v.jsxs)(t.p,{children:[`Add a `,(0,v.jsx)(t.code,{children:`Heading slot="title"`}),` and a `,(0,v.jsx)(t.code,{children:`CloseButton`}),` for a titled, dismissible popover. The heading
also gives the dialog its accessible name.`]}),`
`,(0,v.jsx)(a,{of:l,inline:!0}),`
`,(0,v.jsx)(i,{code:`import { Button, CloseButton, Content, Heading, Popover, PopoverTrigger } from '@godaddy/antares';

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
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,v.jsxs)(t.table,{children:[(0,v.jsx)(t.thead,{children:(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.th,{children:`Key`}),(0,v.jsx)(t.th,{children:`Action`})]})}),(0,v.jsxs)(t.tbody,{children:[(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.td,{children:(0,v.jsx)(t.code,{children:`Enter/Space`})}),(0,v.jsx)(t.td,{children:`Opens the popover from its trigger`})]}),(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.td,{children:(0,v.jsx)(t.code,{children:`Escape`})}),(0,v.jsx)(t.td,{children:`Closes the popover`})]})]})]}),`
`,(0,v.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`role="dialog"`}),` is applied automatically by the underlying React Aria `,(0,v.jsx)(t.code,{children:`Dialog`})]}),`
`,(0,v.jsxs)(t.li,{children:[`A `,(0,v.jsx)(t.code,{children:`Heading slot="title"`}),` labels the dialog via `,(0,v.jsx)(t.code,{children:`aria-labelledby`}),`. Without one, a popover inside
a `,(0,v.jsx)(t.code,{children:`PopoverTrigger`}),` falls back to being labelled by its trigger; standing alone with
`,(0,v.jsx)(t.code,{children:`triggerRef`}),` it needs an explicit `,(0,v.jsx)(t.code,{children:`aria-label`})]}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[`Pass an `,(0,v.jsx)(t.code,{children:`aria-label`}),` when anchoring with `,(0,v.jsx)(t.code,{children:`triggerRef`}),` instead of wrapping a `,(0,v.jsx)(t.code,{children:`PopoverTrigger`}),`,
since there is no trigger to borrow the name from.`]}),`
`,(0,v.jsx)(t.li,{children:`Popover width is determined by its content, and it's recommended to keep it under 400px.`}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-tsx`,children:`<PopoverTrigger>
  <Button />
  <Popover>
    <Heading slot="title" />
    <CloseButton />
    <Content />
    {/* ... */}
  </Popover>
</PopoverTrigger>
`})}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`Popover`}),` component accepts the following props:`]}),`
`,(0,v.jsx)(o,{of:u}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`PopoverTrigger`}),` component accepts the following props:`]}),`
`,(0,v.jsx)(o,{of:p})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=t(),n(),c(),f()})))()}y();export{_ as default};