import{i as e}from"./preload-helper-B4cZKGJ2.js";import{F as t}from"./iframe-BTg95-r4.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-YryIlabG.js";import{t as c}from"./mdx-react-shim-D6QiFl3e.js";import{CustomAnchor as l,Default as u,Props as d,TooltipTriggerProps as f,n as p,t as m}from"./tooltip.stories-C01P7KIh.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:p,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`tooltip`,children:`Tooltip`}),`
`,(0,_.jsx)(t.p,{children:`The Tooltip component displays a description of an element on hover or focus.`}),`
`,(0,_.jsx)(t.p,{children:`Tooltips appear after a short delay when hovering, and immediately when the element receives focus.
Once a tooltip has been shown, subsequent tooltips appear without delay.`}),`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.code,{children:`TooltipTrigger`}),` wraps a focusable element and a `,(0,_.jsx)(t.code,{children:`<Tooltip>`}),`, handling hover/focus state and positioning automatically.`]}),`
`,(0,_.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`overlay`}),` elevation panel positioned relative to its trigger, with an optional arrow`]}),`
`,(0,_.jsx)(t.li,{children:`Flips and shifts to stay in the viewport`}),`
`,(0,_.jsx)(t.li,{children:`Configurable open and close delays`}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[`Use it with `,(0,_.jsx)(t.code,{children:`TooltipTrigger`}),`, which wraps both the tooltip content and a focusable element such as a `,(0,_.jsx)(t.code,{children:`Button`}),`. The tooltip appears on hover and focus.`]}),`
`,(0,_.jsx)(i,{of:u,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

export function DefaultExample(props: {
  tooltipTriggerProps?: Partial<TooltipTriggerProps>;
  tooltipProps?: Partial<TooltipProps>;
}) {
  return (
    <TooltipTrigger {...props.tooltipTriggerProps}>
      <Button variant="primary">Hover me</Button>
      <Tooltip {...props.tooltipProps}>This is the tooltip content!</Tooltip>
    </TooltipTrigger>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,_.jsxs)(t.p,{children:[`To position a tooltip relative to a different focusable element, use the `,(0,_.jsx)(t.code,{children:`triggerRef`}),` prop. `,(0,_.jsx)(t.code,{children:`TooltipTrigger`}),` still handles showing and hiding on hover and focus.`]}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { Tooltip, TooltipTrigger, Box, Flex, Button } from '@godaddy/antares';
import { useRef } from 'react';

export function CustomAnchorExample() {
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex gap="sm" alignItems="center">
      <TooltipTrigger>
        <Button variant="primary">Hover me</Button>
        <Tooltip triggerRef={triggerRef}>Tooltip positioned relative to the box</Tooltip>
      </TooltipTrigger>

      <Box elevation="card" padding="sm" ref={triggerRef}>
        Tooltip appears here
      </Box>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,_.jsxs)(t.p,{children:[(0,_.jsx)(t.code,{children:`className`}),` and `,(0,_.jsx)(t.code,{children:`style`}),` apply to the tooltip panel.`]}),`
`,(0,_.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,_.jsxs)(t.table,{children:[(0,_.jsx)(t.thead,{children:(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.th,{children:`Key`}),(0,_.jsx)(t.th,{children:`Action`})]})}),(0,_.jsxs)(t.tbody,{children:[(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.td,{children:(0,_.jsx)(t.code,{children:`Tab`})}),(0,_.jsx)(t.td,{children:`Moves focus to the focusable element and shows the tooltip`})]}),(0,_.jsxs)(t.tr,{children:[(0,_.jsx)(t.td,{children:(0,_.jsx)(t.code,{children:`Escape`})}),(0,_.jsx)(t.td,{children:`Closes the tooltip`})]})]})]}),`
`,(0,_.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[`The tooltip uses `,(0,_.jsx)(t.code,{children:`role="tooltip"`}),` and is associated with its focusable element via `,(0,_.jsx)(t.code,{children:`aria-describedby`})]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsx)(t.li,{children:`Keep tooltip content short and informative.`}),`
`,(0,_.jsx)(t.li,{children:`Tooltips are not shown on touch screen interactions. Ensure your UI is usable without tooltips.`}),`
`,(0,_.jsxs)(t.li,{children:[`Do not place interactive content inside tooltips. Use a `,(0,_.jsx)(t.code,{children:`Popover`}),` instead.`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-tsx`,children:`<TooltipTrigger>
  <Button />
  <Tooltip placement="bottom" />
</TooltipTrigger>
`})}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`Tooltip`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`TooltipTrigger`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:f})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),m()}))();export{g as default};