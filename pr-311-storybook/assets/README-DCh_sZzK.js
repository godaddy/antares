import{i as e}from"./preload-helper-DtDH9nEa.js";import{y as t}from"./iframe-0kZRusTl.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BlhAj9i2.js";import{t as c}from"./mdx-react-shim-CVs2vK84.js";import{CustomAnchor as l,Default as u,Props as d,n as f,t as p}from"./tooltip.stories-CTv7nI7d.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`tooltip`,children:`Tooltip`}),`
`,(0,g.jsx)(t.p,{children:`The Tooltip component displays a description of an element on hover or focus.`}),`
`,(0,g.jsx)(t.p,{children:`Tooltips appear after a short delay when hovering, and immediately when the element receives focus.
Once a tooltip has been shown, subsequent tooltips appear without delay.`}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsxs)(t.p,{children:[`Use it with `,(0,g.jsx)(t.code,{children:`TooltipTrigger`}),`, which wraps both the tooltip content and a focusable element such as a `,(0,g.jsx)(t.code,{children:`Button`}),`. The tooltip appears on hover and focus.`]}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
`,(0,g.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,g.jsxs)(t.p,{children:[`To position a tooltip relative to a different focusable element, use the `,(0,g.jsx)(t.code,{children:`triggerRef`}),` prop. `,(0,g.jsx)(t.code,{children:`TooltipTrigger`}),` still handles showing and hiding on hover and focus.`]}),`
`,(0,g.jsx)(i,{of:l,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Tooltip, TooltipTrigger, Box, Flex, Button } from '@godaddy/antares';
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
`,(0,g.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,g.jsxs)(t.table,{children:[(0,g.jsx)(t.thead,{children:(0,g.jsxs)(t.tr,{children:[(0,g.jsx)(t.th,{children:`Key`}),(0,g.jsx)(t.th,{children:`Description`})]})}),(0,g.jsxs)(t.tbody,{children:[(0,g.jsxs)(t.tr,{children:[(0,g.jsx)(t.td,{children:`Tab`}),(0,g.jsx)(t.td,{children:`Moves focus to the focusable element and shows the tooltip`})]}),(0,g.jsxs)(t.tr,{children:[(0,g.jsx)(t.td,{children:`Escape`}),(0,g.jsx)(t.td,{children:`Closes the tooltip`})]})]})]}),`
`,(0,g.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`The tooltip uses `,(0,g.jsx)(t.code,{children:`role="tooltip"`}),` and is associated with its focusable element via `,(0,g.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsx)(t.li,{children:`Keep tooltip content short and informative.`}),`
`,(0,g.jsx)(t.li,{children:`Tooltips are not shown on touch screen interactions. Ensure your UI is usable without tooltips.`}),`
`,(0,g.jsxs)(t.li,{children:[`Do not place interactive content inside tooltips. Use a `,(0,g.jsx)(t.code,{children:`Popover`}),` instead.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),p()}))();export{h as default};