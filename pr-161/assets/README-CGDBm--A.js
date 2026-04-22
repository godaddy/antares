import{j as o}from"./iframe-D1ffrKFu.js";import{useMDXComponents as s}from"./index-B7Lx40or.js";import{M as p,A as l,a as i,S as r}from"./blocks-DaRZYqHF.js";import{S as a,P as c,D as d,C as h}from"./tooltip.stories-CbFmLT_4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cz8KgIep.js";import"./index-DC1oEnzR.js";import"./index-D91JL73M.js";import"./index-DrFu-skq.js";import"./index-BbUvCD9w.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BsrDOxBB.js";import"./Text-CYik-koF.js";import"./mergeProps-BFkBPHEy.js";import"./SSRProvider-5SE_QYD0.js";import"./useObjectRef-FUzBHnK5.js";import"./Hidden-Ds9aLZls.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DjoWph75.js";import"./usePress-CJ8xRG1Q.js";import"./utils-CI_GmkcR.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BLSsIPav.js";import"./useHover-B4f6Gwa8.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BDrIvBmB.js";import"./useFocusWithin-_h8ZI5Z0.js";import"./index-LHoSfUJf.js";import"./index-2sLDUdqB.js";import"./index-C8lvV3V9.js";import"./slots-0Wmv7Gqa.js";import"./index-Dft_e07c.js";import"./index-CLj43KZG.js";import"./index-DC3wLLlB.js";import"./index-Dikb04ab.js";import"./create-external-store-TtP3UJpK.js";import"./index-DfEThKL1.js";import"./client-CezRlg0L.js";import"./index-DqPRp8Zx.js";import"./index-OXA1L8XB.js";import"./OverlayArrow-I_e55obL.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-4kPObwin.js";import"./useControlledState-BF2iBaHH.js";import"./context-9ff_JYXl.js";import"./PortalProvider-BERmTsfN.js";import"./index-CHHK_ehi.js";import"./index-CFR0wif_.js";const m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
`]})]})}function co(e={}){const{wrapper:t}={...s(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(n,{...e})}):n(e)}export{co as default};
