import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D_rQDTTD.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./popover.stories-By_EkZSX.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:f,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`popover`,children:`Popover`}),`
`,(0,_.jsx)(t.p,{children:`The Popover component is an overlay element positioned relative to a trigger element.`}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[`Use it with `,(0,_.jsx)(t.code,{children:`<PopoverTrigger>`}),`, which wraps both the popover content and an interactive trigger element (for example, a `,(0,_.jsx)(t.code,{children:`Button`}),`).`]}),`
`,(0,_.jsx)(a,{of:d,inline:!0}),`
`,(0,_.jsx)(i,{code:`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>This is the popover content!</Popover>
    </PopoverTrigger>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,_.jsxs)(t.p,{children:[`To position a popover relative to a different element than its trigger, use the `,(0,_.jsx)(t.code,{children:`triggerRef`}),` and `,(0,_.jsx)(t.code,{children:`isOpen`}),` props instead of `,(0,_.jsx)(t.code,{children:`<PopoverTrigger>`}),`. `,(0,_.jsx)(t.code,{children:`onOpenChange`}),` is called when the user opens or closes the popover.`]}),`
`,(0,_.jsx)(a,{of:m,inline:!0}),`
`,(0,_.jsx)(i,{code:`import { Popover, Box, Flex, Button } from '@godaddy/antares';
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

      <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
        Popover content!
      </Popover>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`close-button-and-header`,children:`Close Button and Header`}),`
`,(0,_.jsxs)(t.p,{children:[`Use `,(0,_.jsx)(t.code,{children:`showCloseButton`}),` to show a close button in the popover header. Use the `,(0,_.jsx)(t.code,{children:`header`}),` prop to render content alongside it.`]}),`
`,(0,_.jsx)(a,{of:u,inline:!0}),`
`,(0,_.jsx)(i,{code:`import { Popover, PopoverTrigger, Button, Text } from '@godaddy/antares';

export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover showCloseButton header={<Text>Content to show next to the close button</Text>}>
        This is the popover content!
      </Popover>
    </PopoverTrigger>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,_.jsx)(t.p,{children:`Popover width is determined by its content, and it’s recommended to keep it under 400px.`}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(o,{of:p})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=t(),n(),c(),l()})))()}v();export{g as default};