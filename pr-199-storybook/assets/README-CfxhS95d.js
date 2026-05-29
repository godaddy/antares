import{j as o}from"./iframe-DEw-TdOf.js";import{u as s,M as l,A as p,a as i,S as r}from"./blocks-BSTGhIOF.js";import{S as a,P as c,D as d,C as h}from"./tooltip.stories-uT6scMUf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CaEMLjby.js";import"./index-CkeVYGPm.js";import"./index-Ckl-4Q0v.js";import"./index-Cz2jo_96.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-25vlsd08.js";import"./Text-5t7drEsP.js";import"./SSRProvider-CAP1Mqfg.js";import"./useHover-CH4lCm_e.js";import"./useFocusRing-1iG2C5pN.js";import"./index-Cyg9RbmU.js";import"./index-Ahr5Rb6l.js";import"./index-BYc8CnrN.js";import"./slots-C_E0jgdW.js";import"./index-CWMUkFW8.js";import"./index-CLj43KZG.js";import"./index-D7d1rM6M.js";import"./index-DKrYlLVB.js";import"./create-external-store-TtP3UJpK.js";import"./index-BzIi0uDG.js";import"./client-Cra6LbMA.js";import"./index-CYmchdOf.js";import"./index-nxzUe7UV.js";import"./animation-BXAqUvsf.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-DxSfp2Cy.js";import"./useControlledState-CzZMfZAi.js";import"./index-BABEZUz1.js";import"./index-BAsSN5K6.js";import"./index-CwrYXU3_.js";const m=`import { Tooltip, TooltipTrigger, Button, type TooltipTriggerProps, type TooltipProps } from '@godaddy/antares';

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
`;function n(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(l,{of:a,name:"Overview"}),`
`,o.jsx(e.h1,{id:"tooltip",children:"Tooltip"}),`
`,o.jsx(e.p,{children:"The Tooltip component displays a description of an element on hover or focus."}),`
`,o.jsx(e.p,{children:`Tooltips appear after a short delay when hovering, and immediately when the element receives focus.
Once a tooltip has been shown, subsequent tooltips appear without delay.`}),`
`,o.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,o.jsx(e.h2,{id:"props",children:"Props"}),`
`,o.jsx(p,{of:c}),`
`,o.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,o.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,o.jsxs(e.p,{children:["Use it with ",o.jsx(e.code,{children:"<TooltipTrigger>"}),`, which wraps both the tooltip content and a focusable
element (for example, a `,o.jsx(e.code,{children:"Button"}),"). The tooltip appears on hover and focus."]}),`
`,o.jsx(i,{of:d,inline:!0}),`
`,o.jsx(r,{language:"tsx",code:m}),`
`,o.jsx(e.h3,{id:"custom-anchor",children:"Custom Anchor"}),`
`,o.jsxs(e.p,{children:[`To position a tooltip relative to a different focusable element, use the
`,o.jsx(e.code,{children:"triggerRef"})," prop. The ",o.jsx(e.code,{children:"TooltipTrigger"})," still handles showing/hiding on hover/focus."]}),`
`,o.jsx(i,{of:h,inline:!0}),`
`,o.jsx(r,{language:"tsx",code:x}),`
`,o.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,o.jsx(e.h3,{id:"keyboard",children:"Keyboard"}),`
`,o.jsxs(e.table,{children:[o.jsx(e.thead,{children:o.jsxs(e.tr,{children:[o.jsx(e.th,{children:"Key"}),o.jsx(e.th,{children:"Description"})]})}),o.jsxs(e.tbody,{children:[o.jsxs(e.tr,{children:[o.jsx(e.td,{children:"Tab"}),o.jsx(e.td,{children:"Moves focus to the focusable element and shows the tooltip"})]}),o.jsxs(e.tr,{children:[o.jsx(e.td,{children:"Escape"}),o.jsx(e.td,{children:"Closes the tooltip"})]})]})]}),`
`,o.jsx(e.h3,{id:"aria",children:"ARIA"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:["The tooltip uses ",o.jsx(e.code,{children:'role="tooltip"'})," and is associated with its focusable element via ",o.jsx(e.code,{children:"aria-describedby"}),"."]}),`
`]}),`
`,o.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsx(e.li,{children:"Keep tooltip content short and informative."}),`
`,o.jsx(e.li,{children:"Tooltips are not shown on touch screen interactions. Ensure your UI is usable without tooltips."}),`
`,o.jsxs(e.li,{children:["Do not place interactive content inside tooltips. Use a ",o.jsx(e.code,{children:"Popover"})," instead."]}),`
`]})]})}function W(t={}){const{wrapper:e}={...s(),...t.components};return e?o.jsx(e,{...t,children:o.jsx(n,{...t})}):n(t)}export{W as default};
