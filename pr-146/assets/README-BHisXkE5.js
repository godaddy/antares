import{j as o}from"./iframe-vAMiyBja.js";import{useMDXComponents as s}from"./index-BG9nnvlg.js";import{M as p,A as l,a as i,S as r}from"./blocks-h4P0AtdT.js";import{S as a,P as c,D as d,C as h}from"./tooltip.stories-CUOqjqbA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D9Gk02QT.js";import"./index-JJFMoKTb.js";import"./index-BKGFVB75.js";import"./index-DrFu-skq.js";import"./index-DErHqRvC.js";import"./index-DOyRur-9.js";import"./clsx-_25EvAcD.js";import"./index-8kgmx7O0.js";import"./mergeProps-B2CMvf4u.js";import"./useObjectRef-CbGVWyKG.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-Be18mPLH.js";import"./useFocusWithin-DkmSGj3m.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Cq0J_mWa.js";import"./Collection-CDYvWQzI.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-Bpk3ck-I.js";import"./context-DdooUzfR.js";import"./useControlledState-mxjHgtzR.js";import"./useOverlayTriggerState-rxw41zVe.js";import"./PortalProvider-a_HPY8dw.js";import"./usePreventScroll-e2AJdfim.js";import"./useLabel-DqYvFJAP.js";import"./VisuallyHidden-BbsF5H_-.js";import"./useField-CUAPk8Ar.js";import"./useButton-CxPuSOFk.js";import"./index-D5F7iiR-.js";import"./index-BDIzCXrw.js";import"./slots-Vsgw1zGL.js";import"./index-xxnvkfds.js";import"./index-CLj43KZG.js";import"./index-BYmEJmF6.js";import"./index-BJWZXT6u.js";import"./create-external-store-TtP3UJpK.js";import"./index-DnttwbzM.js";import"./client-fNWJtasY.js";import"./index-sOO_kJcm.js";import"./index-BAY0C0fy.js";const m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
`]})]})}function so(e={}){const{wrapper:t}={...s(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(n,{...e})}):n(e)}export{so as default};
