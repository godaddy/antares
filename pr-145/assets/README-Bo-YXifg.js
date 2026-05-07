import{j as e}from"./iframe-Du6PjlSZ.js";import{useMDXComponents as p}from"./index-PW5r9cRf.js";import{M as s,A as a,a as r,S as n}from"./blocks-F0Y6jiat.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CFvi9zfG.js";import"./preload-helper-PPVm8Dsz.js";import"./index-niWSmtgG.js";import"./index-BtT7aVaE.js";import"./index-c3mBs9B0.js";import"./index-c65qZ19s.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-C4_QxhKZ.js";import"./Text-DLOk33e2.js";import"./mergeProps-x388wjyq.js";import"./SSRProvider-Ne4r0eXS.js";import"./useObjectRef-Cr5IrlI4.js";import"./Hidden-CAZ5qND2.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BKB0rN3p.js";import"./usePress-Bv4tIppN.js";import"./utils-BAofpzzo.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-DRLBmLmF.js";import"./useHover-lQVV3GQ8.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-C7BYV-6I.js";import"./useFocusWithin-CfASrpWT.js";import"./index-CCgPj28z.js";import"./index-CjCks0Xt.js";import"./index-Y_W9meKt.js";import"./slots-Dw1a0iN8.js";import"./index-Dk5nuyHr.js";import"./index-CLj43KZG.js";import"./index-C_TJby-M.js";import"./index-CwRsn4VW.js";import"./create-external-store-TtP3UJpK.js";import"./index-Bur5FAmH.js";import"./client-Bq072JmX.js";import"./index-BtRoEILP.js";import"./Dialog-DnNcmCw9.js";import"./RSPContexts-DXKD_dGd.js";import"./OverlayArrow-CcW2obW-.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-CYSDjbnL.js";import"./useControlledState-vF4FVzxC.js";import"./context-e3X6BKIn.js";import"./Collection-DMFPE63K.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-BCF0Z2G8.js";import"./FocusScope-C1OBgONO.js";import"./SelectionIndicator-Cmre4Fih.js";import"./Overlay-gWA9YUY2.js";import"./PortalProvider--ZBjggMH.js";import"./useLocalizedStringFormatter-B0gEvLnR.js";import"./usePreventScroll-Uc3Y7gxa.js";import"./useLabels-CHW0q3nM.js";import"./VisuallyHidden-BUM10kXD.js";import"./index-CQAGP5rC.js";import"./index-CxNDvpBG.js";import"./index-5OOocN8b.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <PopoverTrigger>
      <Button variant="primary">Open popover</Button>
      <Popover>This is the popover content!</Popover>
    </PopoverTrigger>
  );
}
`,x=`import { Popover, Box, Flex, Button } from '@godaddy/antares';
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
`,g=`import { Popover, PopoverTrigger, Button, Text } from '@godaddy/antares';

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
`;function i(t){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...p(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:m,name:"Overview"}),`
`,e.jsx(o.h1,{id:"popover",children:"Popover"}),`
`,e.jsx(o.p,{children:"The Popover component is an overlay element positioned relative to a trigger element."}),`
`,e.jsx(o.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(o.h2,{id:"props",children:"Props"}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(o.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(o.p,{children:["Use it with ",e.jsx(o.code,{children:"<PopoverTrigger>"}),`, which wraps both the popover content and an interactive
trigger element (for example, a `,e.jsx(o.code,{children:"Button"}),")."]}),`
`,e.jsx(r,{of:l,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:u}),`
`,e.jsx(o.h3,{id:"custom-anchor",children:"Custom Anchor"}),`
`,e.jsxs(o.p,{children:[`To position a popover relative to a different element than its trigger, use the
`,e.jsx(o.code,{children:"triggerRef"})," and ",e.jsx(o.code,{children:"isOpen"})," props instead of ",e.jsx(o.code,{children:"<PopoverTrigger>"}),`.
`,e.jsx(o.code,{children:"onOpenChange"})," is called when the user opens or closes the popover."]}),`
`,e.jsx(r,{of:d,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:x}),`
`,e.jsx(o.h3,{id:"close-button-and-header",children:"Close Button and Header"}),`
`,e.jsxs(o.p,{children:["To show a close button in the popover header, use the ",e.jsx(o.code,{children:"showCloseButton"})," prop."]}),`
`,e.jsxs(o.p,{children:["You can also use the ",e.jsx(o.code,{children:"header"}),` prop to render content alongside the close button.
This is useful for displaying a title or other header content without overlapping
the close button.`]}),`
`,e.jsx(r,{of:h,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:g}),`
`,e.jsx(o.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function Ce(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{Ce as default};
