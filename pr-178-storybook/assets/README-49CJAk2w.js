import{j as o}from"./iframe-CAbq4aYF.js";import{u as s,M as p,A as l,a as i,S as r}from"./blocks-DxjHSUbH.js";import{S as a,P as c,D as d,C as h}from"./tooltip.stories-VPaHavT0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCYc_8W4.js";import"./index-BAC-w0_0.js";import"./index-CJKSGwSi.js";import"./index-BGvGIymk.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BwbrtNjS.js";import"./Text-CF-1lucW.js";import"./mergeProps-CxoBR0Wp.js";import"./SSRProvider-BDs7FidF.js";import"./useObjectRef-vFUtg9iP.js";import"./Hidden-0fEPAlFT.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Ce81FXAj.js";import"./usePress-k6vAFEo3.js";import"./utils-DbDVSxSh.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CV79qB0a.js";import"./useHover-IfzRq24Y.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DeoTNIgl.js";import"./useFocusWithin-BzFBAnFb.js";import"./index-POZ24sC9.js";import"./index-Cp-br9gi.js";import"./index-DPCM9ZP2.js";import"./slots-DzUcJUQF.js";import"./index-C95mVXLk.js";import"./index-CLj43KZG.js";import"./index-W9EF0LaN.js";import"./index-DrDS5V5n.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dsb2hqQV.js";import"./client-CiCKFlRr.js";import"./index-BAeqBeCx.js";import"./index-BdBYLajN.js";import"./OverlayArrow-CcJi7Ksk.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C04V_RQx.js";import"./useControlledState-B6sYslo4.js";import"./context-EVg7bFls.js";import"./PortalProvider-dPcjPGpE.js";import"./index-DpZKnoh9.js";import"./index-UnCTxyX7.js";import"./index-DMSo-IG0.js";const m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
`,x=`import { Tooltip, TooltipTrigger, Box, Flex, Button } from '@godaddy/antares';
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
`;function n(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(p,{of:a,name:"Overview"}),`
`,o.jsx(t.h1,{id:"tooltip",children:"Tooltip"}),`
`,o.jsx(t.p,{children:"The Tooltip component displays a description of an element on hover or focus."}),`
`,o.jsx(t.p,{children:`Tooltips appear after a short delay when hovering, and immediately when the element receives focus.
Once a tooltip has been shown, subsequent tooltips appear without delay.`}),`
`,o.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,o.jsx(t.pre,{children:o.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,o.jsx(t.h2,{id:"props",children:"Props"}),`
`,o.jsx(l,{of:c}),`
`,o.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,o.jsx(t.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,o.jsxs(t.p,{children:["Use it with ",o.jsx(t.code,{children:"<TooltipTrigger>"}),`, which wraps both the tooltip content and a focusable
element (for example, a `,o.jsx(t.code,{children:"Button"}),"). The tooltip appears on hover and focus."]}),`
`,o.jsx(i,{of:d,inline:!0}),`
`,o.jsx(r,{language:"tsx",code:m}),`
`,o.jsx(t.h3,{id:"custom-anchor",children:"Custom Anchor"}),`
`,o.jsxs(t.p,{children:[`To position a tooltip relative to a different focusable element, use the
`,o.jsx(t.code,{children:"triggerRef"})," prop. The ",o.jsx(t.code,{children:"TooltipTrigger"})," still handles showing/hiding on hover/focus."]}),`
`,o.jsx(i,{of:h,inline:!0}),`
`,o.jsx(r,{language:"tsx",code:x}),`
`,o.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,o.jsx(t.h3,{id:"keyboard",children:"Keyboard"}),`
`,o.jsxs(t.table,{children:[o.jsx(t.thead,{children:o.jsxs(t.tr,{children:[o.jsx(t.th,{children:"Key"}),o.jsx(t.th,{children:"Description"})]})}),o.jsxs(t.tbody,{children:[o.jsxs(t.tr,{children:[o.jsx(t.td,{children:"Tab"}),o.jsx(t.td,{children:"Moves focus to the focusable element and shows the tooltip"})]}),o.jsxs(t.tr,{children:[o.jsx(t.td,{children:"Escape"}),o.jsx(t.td,{children:"Closes the tooltip"})]})]})]}),`
`,o.jsx(t.h3,{id:"aria",children:"ARIA"}),`
`,o.jsxs(t.ul,{children:[`
`,o.jsxs(t.li,{children:["The tooltip uses ",o.jsx(t.code,{children:'role="tooltip"'})," and is associated with its focusable element via ",o.jsx(t.code,{children:"aria-describedby"}),"."]}),`
`]}),`
`,o.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,o.jsxs(t.ul,{children:[`
`,o.jsx(t.li,{children:"Keep tooltip content short and informative."}),`
`,o.jsx(t.li,{children:"Tooltips are not shown on touch screen interactions. Ensure your UI is usable without tooltips."}),`
`,o.jsxs(t.li,{children:["Do not place interactive content inside tooltips. Use a ",o.jsx(t.code,{children:"Popover"})," instead."]}),`
`]})]})}function ao(e={}){const{wrapper:t}={...s(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(n,{...e})}):n(e)}export{ao as default};
