import{j as e}from"./iframe-DNXmVt2J.js";import{useMDXComponents as p}from"./index-C5SBtMP2.js";import{M as s,A as a,a as r,S as n}from"./blocks-iX0Kt9Jr.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CnegCfdr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-pRJuJIwn.js";import"./index-Th8k5VBP.js";import"./index-DdBMv_Jd.js";import"./index-DrFu-skq.js";import"./index-BCMjMs2I.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CAZidiIy.js";import"./Text-DlAEITp4.js";import"./mergeProps-C7R8qOWs.js";import"./SSRProvider-BijP3zDE.js";import"./useObjectRef-DwTlAagJ.js";import"./Hidden-biVUi6Tn.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BvzhEtev.js";import"./usePress-Qty7P0C8.js";import"./utils-C2NRQJ9A.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BQzQBPUa.js";import"./useHover-BhJO288J.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CyRuR0as.js";import"./useFocusWithin-CaHO3xef.js";import"./index-iRJrNGxU.js";import"./index-BfCgNV45.js";import"./index-CRsPzxF-.js";import"./slots-LmwQCJh-.js";import"./index-CqxNEkWc.js";import"./index-CLj43KZG.js";import"./index-BNBzX1QM.js";import"./index-Dy9sFdiU.js";import"./create-external-store-TtP3UJpK.js";import"./index-9GqdfinS.js";import"./client-Kzy-00Zf.js";import"./index-Cdjz0m-l.js";import"./Dialog-DbdEVJKx.js";import"./RSPContexts-CKJpagcx.js";import"./OverlayArrow-BNBY-ZPT.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BK4f9AAY.js";import"./useControlledState-Bdw8djY9.js";import"./context-2eYSJNgG.js";import"./Collection-D1NOY8av.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-CDNczqjN.js";import"./FocusScope-134kfVFb.js";import"./SelectionIndicator-DZ17OTGn.js";import"./Overlay-DgO2oYHI.js";import"./PortalProvider-CpL7mAp4.js";import"./useLocalizedStringFormatter-ZVYJU_Iy.js";import"./usePreventScroll-lOnnCMe6.js";import"./useLabels-CTDx30gH.js";import"./VisuallyHidden-C1sHbcj6.js";import"./index-Dp2Y86M3.js";import"./index-B2KUoK5a.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
