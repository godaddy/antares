import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-CNDmUKd7.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-OKPNOdlK.js";import{t as c}from"./mdx-react-shim-CgwinoHn.js";import{CustomAnchor as l,Default as u,Props as d,n as f,t as p}from"./tooltip.stories-YMjh63_P.js";var m,h=e((()=>{m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
}
`})),g,_=e((()=>{g=`import { Tooltip, TooltipTrigger, Box, Flex, Button } from '@godaddy/antares';
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
}
`}));function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:f,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`tooltip`,children:`Tooltip`}),`
`,(0,b.jsx)(t.p,{children:`The Tooltip component displays a description of an element on hover or focus.`}),`
`,(0,b.jsx)(t.p,{children:`Tooltips appear after a short delay when hovering, and immediately when the element receives focus.
Once a tooltip has been shown, subsequent tooltips appear without delay.`}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:d}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,b.jsxs)(t.p,{children:[`Use it with `,(0,b.jsx)(t.code,{children:`<TooltipTrigger>`}),`, which wraps both the tooltip content and a focusable
element (for example, a `,(0,b.jsx)(t.code,{children:`Button`}),`). The tooltip appears on hover and focus.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(t.h3,{id:`custom-anchor`,children:`Custom Anchor`}),`
`,(0,b.jsxs)(t.p,{children:[`To position a tooltip relative to a different focusable element, use the
`,(0,b.jsx)(t.code,{children:`triggerRef`}),` prop. The `,(0,b.jsx)(t.code,{children:`TooltipTrigger`}),` still handles showing/hiding on hover/focus.`]}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Key`}),(0,b.jsx)(t.th,{children:`Description`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:`Tab`}),(0,b.jsx)(t.td,{children:`Moves focus to the focusable element and shows the tooltip`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:`Escape`}),(0,b.jsx)(t.td,{children:`Closes the tooltip`})]})]})]}),`
`,(0,b.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`The tooltip uses `,(0,b.jsx)(t.code,{children:`role="tooltip"`}),` and is associated with its focusable element via `,(0,b.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`Keep tooltip content short and informative.`}),`
`,(0,b.jsx)(t.li,{children:`Tooltips are not shown on touch screen interactions. Ensure your UI is usable without tooltips.`}),`
`,(0,b.jsxs)(t.li,{children:[`Do not place interactive content inside tooltips. Use a `,(0,b.jsx)(t.code,{children:`Popover`}),` instead.`]}),`
`]})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),p(),h(),_()}))();export{y as default};