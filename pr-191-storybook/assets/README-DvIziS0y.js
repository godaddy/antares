import{j as e}from"./iframe-B6YsZR-s.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BZGFzJ0o.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BlLKr1ue.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aoCgFIs9.js";import"./index-LfqjcF53.js";import"./index-BuazBkUi.js";import"./index-CoB4ipTd.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Ce5JPAqe.js";import"./Text-DW8Gnoqc.js";import"./mergeProps-DrdZTPdG.js";import"./SSRProvider-KJFVgDLI.js";import"./useObjectRef-Eiy4V38J.js";import"./ProgressBar-yPtRO6U0.js";import"./Label-Bo5g1AOv.js";import"./Hidden-BvkcK_ZZ.js";import"./number-CB4zbwAz.js";import"./filterDOMProps-BNnC3YgW.js";import"./useLabel-BU6pnQRd.js";import"./context-eko6y_L2.js";import"./useButton-ClQguVxy.js";import"./usePress-B9TG5jk1.js";import"./utils-Be10URkw.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CtcGTmuN.js";import"./useHover-6maYdHuQ.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-CEsDu7SV.js";import"./useFocusWithin-dVmp3iKd.js";import"./index-BgJ4JvhC.js";import"./index-D4WNNhr0.js";import"./index-BMOTTt02.js";import"./slots-mniS_YlI.js";import"./index-9gIHEIe4.js";import"./index-CLj43KZG.js";import"./index-BNzQTtAG.js";import"./index-k3lOLZFJ.js";import"./create-external-store-TtP3UJpK.js";import"./index-BShBZ7ZW.js";import"./client-DaM_j0N5.js";import"./index-CIbn7BzU.js";import"./Dialog-r5V5RiE4.js";import"./RSPContexts-DBFO6QrI.js";import"./OverlayArrow-D9ATfUKJ.js";import"./useOverlayTriggerState-C2vtju6W.js";import"./useControlledState-Cbc-ilWW.js";import"./SelectionManager-D8gdTlVM.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-DlyrTEJI.js";import"./FocusScope-D89f0WC2.js";import"./SelectionIndicator-g4fG6paL.js";import"./Overlay-F6uBPR5P.js";import"./PortalProvider-BcT6dD-k.js";import"./useLocalizedStringFormatter-BgKG-E5k.js";import"./usePreventScroll-BE00mp33.js";import"./VisuallyHidden-tjgTjMhe.js";import"./index-vl7q0Sm2.js";import"./index-BvmcC5Xv.js";import"./index-CBTpC2WS.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
