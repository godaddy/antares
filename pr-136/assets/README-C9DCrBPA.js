import{j as o}from"./iframe-BdDbKpSa.js";import{useMDXComponents as s}from"./index-D-sdQ1rQ.js";import{M as p,A as l,a as i,S as r}from"./blocks-pwUMJHnq.js";import{S as a,P as c,D as d,C as h}from"./tooltip.stories-BE3su52w.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BcAN-i6Q.js";import"./index-B5kS4cU8.js";import"./index-CpEq7wEi.js";import"./index-DrFu-skq.js";import"./index-D1R00fuB.js";import"./index-Xl3X1Y1x.js";import"./clsx-BLGXZUWy.js";import"./index-BkSspcJ3.js";import"./mergeProps-C4o0jXEZ.js";import"./useObjectRef-TtJ-WSqt.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-kji5aCx2.js";import"./useFocusWithin-DM-zH5xS.js";import"./platform-BULRNHlZ.js";import"./useFocusable-cfs0JWxw.js";import"./Collection-9VpGSLJU.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-1EPdBfda.js";import"./context-BOrZhfyP.js";import"./useControlledState-DucNPHe1.js";import"./useOverlayTriggerState-CtllOMCF.js";import"./PortalProvider-eutQttGP.js";import"./usePreventScroll-Cq64L7dJ.js";import"./useLabel-BaLy310t.js";import"./VisuallyHidden-BWvns0l3.js";import"./useField-CJvtqPJ-.js";import"./useButton-NzcLXiIq.js";import"./index-D2j2Ivyi.js";import"./index-Bs6Ded7Y.js";import"./slots-CPlKthaQ.js";import"./index-CjfJpyX2.js";import"./index-CLj43KZG.js";import"./index-4jqD68Gg.js";import"./index-BygzrZkM.js";import"./create-external-store-TtP3UJpK.js";import"./index-DTzfpiDv.js";import"./client-klMMGSwB.js";import"./index-DlMPfBXM.js";import"./index-B4wWCabY.js";const m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
