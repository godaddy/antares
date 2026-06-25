import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-BrWVZjPO.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-sVt-8Hv1.js";import{t as c}from"./mdx-react-shim-68NuDidp.js";import{CustomAnchor as l,Default as u,Props as d,WithCloseButton as f,n as p,t as m}from"./popover.stories-BM70dTN3.js";var h,g=e((()=>{h=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>This is the popover content!</Popover>
    </PopoverTrigger>
  );
}
`})),_,v=e((()=>{_=`import { Popover, Box, Flex, Button } from '@godaddy/antares';
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
}
`})),y,b=e((()=>{y=`import { Popover, PopoverTrigger, Button, Text } from '@godaddy/antares';

export function WithCloseButtonExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover showCloseButton header={<Text>Content to show next to the close button</Text>}>
        This is the popover content!
      </Popover>
    </PopoverTrigger>
  );
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:p,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`popover`,children:`Popover`}),`
`,(0,C.jsx)(t.p,{children:`The Popover component is an overlay element positioned relative to a trigger element.`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsxs)(t.p,{children:[`Use it with `,(0,C.jsx)(t.code,{children:`<PopoverTrigger>`}),`, which wraps both the popover content and an interactive
trigger element (for example, a `,(0,C.jsx)(t.code,{children:`Button`}),`).`]}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,C.jsxs)(t.p,{children:[`To position a popover relative to a different element than its trigger, use the
`,(0,C.jsx)(t.code,{children:`triggerRef`}),` and `,(0,C.jsx)(t.code,{children:`isOpen`}),` props instead of `,(0,C.jsx)(t.code,{children:`<PopoverTrigger>`}),`.
`,(0,C.jsx)(t.code,{children:`onOpenChange`}),` is called when the user opens or closes the popover.`]}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`close-button-and-header`,children:`Close Button and Header`}),`
`,(0,C.jsxs)(t.p,{children:[`To show a close button in the popover header, use the `,(0,C.jsx)(t.code,{children:`showCloseButton`}),` prop.`]}),`
`,(0,C.jsxs)(t.p,{children:[`You can also use the `,(0,C.jsx)(t.code,{children:`header`}),` prop to render content alongside the close button.
This is useful for displaying a title or other header content without overlapping
the close button.`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsx)(t.p,{children:`Popover width is determined by its content, and it’s recommended to keep it under 400px.`})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),m(),g(),v(),b()}))();export{S as default};