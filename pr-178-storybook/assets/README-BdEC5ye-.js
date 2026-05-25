import{j as e}from"./iframe-DObEmzuK.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BNKn2dtL.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-rsNJsFvt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0wza8A3.js";import"./index-Evi3y-dD.js";import"./index-7j2R3PjP.js";import"./index-BsnVlpxo.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BP_bU-tX.js";import"./Text-B9M7z786.js";import"./mergeProps-BqP2IRSG.js";import"./SSRProvider-BtMAXvG3.js";import"./useObjectRef-yc9xFDWL.js";import"./Hidden-CbQmvHR4.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-J1uW9bMr.js";import"./usePress-BnPIxvKo.js";import"./utils-CYKAaiBd.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Dk_Etlop.js";import"./useHover-C5CvyZ7M.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DbbaDQb6.js";import"./useFocusWithin-D0CSGcGT.js";import"./index-BnMSaFXr.js";import"./index-lHP7Fo71.js";import"./index-BcYpwjRt.js";import"./slots-BF0QzDus.js";import"./index-BOM4sHVr.js";import"./index-CLj43KZG.js";import"./index-C6cvkMs8.js";import"./index-CtuRP6An.js";import"./create-external-store-TtP3UJpK.js";import"./index-CFA_95-6.js";import"./client-DMJZKlDI.js";import"./index-D0CKD248.js";import"./Dialog-Dqz9PYhN.js";import"./RSPContexts-DjDuPuCO.js";import"./OverlayArrow-v0xnB2tW.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-Cbmwe7ev.js";import"./useControlledState-DTpmM2Mv.js";import"./context-CtNYfMTH.js";import"./SelectionManager-9k2SuWIw.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-DOnjYaVf.js";import"./FocusScope-CznN-BIq.js";import"./SelectionIndicator-b8KU51br.js";import"./Overlay-D7GBxC8u.js";import"./PortalProvider-DpVXQHet.js";import"./useLocalizedStringFormatter-DelObV0V.js";import"./usePreventScroll-BVNqts0U.js";import"./useLabels-C1EbL0QN.js";import"./VisuallyHidden-B3UWdLBh.js";import"./index-C7Cj5HMo.js";import"./index-B7sMCgDH.js";import"./index-D3uXgQRQ.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function Te(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{Te as default};
