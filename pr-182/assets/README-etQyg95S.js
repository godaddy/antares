import{j as e}from"./iframe-CZ2Upcg5.js";import{useMDXComponents as p}from"./index-Ci7WSTmi.js";import{M as s,A as a,a as r,S as n}from"./blocks-B6-rmhLZ.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Dh91iomR.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DRorPtTE.js";import"./index-B_InqHgS.js";import"./index-BmcmvYic.js";import"./index-Cyf12MlI.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BIAXSkbO.js";import"./utils-ClKRz7g1.js";import"./mergeProps-C0P_aIDy.js";import"./SSRProvider-CMlS2lkq.js";import"./useObjectRef-DtojuyfT.js";import"./Hidden-CZtFD0jg.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DRQPhog5.js";import"./usePress--wisMgXi.js";import"./utils-Dzz3fmJj.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-C4rTu1zU.js";import"./useHover-CwAb8PHJ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BEi35psM.js";import"./useFocusWithin-0z6l1WFN.js";import"./Text-DK2ZLwgF.js";import"./index-BSVeR5oL.js";import"./index-d-Bq7Fj_.js";import"./index-D6BhwZam.js";import"./slots-YuqekDdD.js";import"./index-BgzDK3Wb.js";import"./index-CLj43KZG.js";import"./index-CpM4floG.js";import"./index-pOrhr_Ic.js";import"./create-external-store-TtP3UJpK.js";import"./index-Bmj71m7m.js";import"./client-CXLoS-lg.js";import"./index-D3w8FzdC.js";import"./Dialog-CtaNJcTI.js";import"./RSPContexts-CiVX35xk.js";import"./OverlayArrow-B5oJcrVP.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-_OHYr089.js";import"./useControlledState-CWAuxlQi.js";import"./context-BOb640Xr.js";import"./Collection-BUPWFwk1.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-CZZa4FJg.js";import"./FocusScope-CPAsb63H.js";import"./SelectionIndicator-D0sBtjmI.js";import"./Overlay-C653kfg-.js";import"./PortalProvider-Btvgi25x.js";import"./useLocalizedStringFormatter-BKrH0WcR.js";import"./usePreventScroll-DgPtH6JQ.js";import"./useLabels-DHbx0e9C.js";import"./VisuallyHidden-_DyCvmQd.js";import"./index-C1dJ2Zby.js";import"./index-C_25d9FI.js";import"./index-CUc47TIE.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function we(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{we as default};
