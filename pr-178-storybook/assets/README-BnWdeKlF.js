import{j as e}from"./iframe-Ctx4srKR.js";import{useMDXComponents as p}from"./index-D2CtuBLb.js";import{M as s,A as a,a as r,S as n}from"./blocks-72KARnvP.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BKzvZdLy.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C3lit-vx.js";import"./index-DHf6R9s4.js";import"./index-CChMEhDG.js";import"./index-C_vAEw2J.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-B19lSRCh.js";import"./Text-x3ZL-jJa.js";import"./mergeProps-DBpubWKp.js";import"./SSRProvider-L5CIFOBu.js";import"./useObjectRef-CA7_efmZ.js";import"./Hidden-DKjAZRen.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DLuixzNV.js";import"./usePress-BTZQQVg0.js";import"./utils-DhXSdU43.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-DvS-1-mo.js";import"./useHover-IN8R3fE4.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CC5jsQH3.js";import"./useFocusWithin-DKg76MtO.js";import"./index-q_xuxs-g.js";import"./index-BNyuEjcZ.js";import"./index-gBUEpdAm.js";import"./slots-fo57EPNj.js";import"./index-Cm2vTddm.js";import"./index-CLj43KZG.js";import"./index-Dy-msg3n.js";import"./index-B30rVSRl.js";import"./create-external-store-TtP3UJpK.js";import"./index-CgYNBsUv.js";import"./client-CSdw2r1G.js";import"./index-Dw7_kDFH.js";import"./Dialog-KZFF8mYZ.js";import"./RSPContexts-BJ6D-cLB.js";import"./OverlayArrow-Bs1GtzS1.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DJ-NRMtv.js";import"./useControlledState-BqQyD6Jk.js";import"./context-Cda85nUd.js";import"./Collection-DE89-MkA.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-C3P_18K_.js";import"./FocusScope-CqOQvbfe.js";import"./SelectionIndicator-C4CoEuK2.js";import"./Overlay-at02fJZZ.js";import"./PortalProvider-DsbHaUhJ.js";import"./useLocalizedStringFormatter-D2qOW1Ni.js";import"./usePreventScroll-wD99ZU5X.js";import"./useLabels-ZXHgEgXU.js";import"./VisuallyHidden-DL5wlDbL.js";import"./index-BVMnfpsC.js";import"./index-CS7RrcXb.js";import"./index-C4juobbq.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
