import{j as e}from"./iframe-DCWZK8FF.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CwTu0JBB.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CDWInOj5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BTiZjbIC.js";import"./index-ns8GPaeO.js";import"./index-C1EBQYjH.js";import"./index-DrFu-skq.js";import"./index-Bsh2-xcK.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DHJ-sXEh.js";import"./Text-YXiMITH-.js";import"./mergeProps-Ns9PPALR.js";import"./SSRProvider-z4CqI7qr.js";import"./useObjectRef-cCAFS4Sr.js";import"./Hidden-CqPWqR2j.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Bru6P41m.js";import"./usePress-fUK_fdWA.js";import"./utils-r25tllxi.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-DQku22tc.js";import"./useHover-ObVjWzKL.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-BxF4E7cT.js";import"./useFocusWithin-B1156V9K.js";import"./index-DNO_S8v-.js";import"./index-Br-6DAO6.js";import"./index-Dj5DOO3a.js";import"./slots-BgzaY5Kd.js";import"./index-CHW2nz18.js";import"./index-CLj43KZG.js";import"./index-BhU-oZha.js";import"./index-Q4rpbaTk.js";import"./create-external-store-TtP3UJpK.js";import"./index-DRW7e-jx.js";import"./client-Tj28hPU4.js";import"./index-DkamSBY3.js";import"./Dialog-CI9DnySh.js";import"./RSPContexts-DpHBy5cJ.js";import"./OverlayArrow-wvsgn4Dr.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BSZqh8eu.js";import"./useControlledState-BvPvLWwA.js";import"./context-BCDWATO1.js";import"./SelectionManager-BS8sM_g_.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-BMkQhlnw.js";import"./FocusScope-C70gb613.js";import"./SelectionIndicator-BjDcAxaf.js";import"./Overlay-bYvVfD14.js";import"./PortalProvider-B_st3CPO.js";import"./useLocalizedStringFormatter-BrzTuQd2.js";import"./usePreventScroll-1yOAA0JS.js";import"./useLabels-DFlCshkH.js";import"./VisuallyHidden-ibJubuBm.js";import"./index-utF5Y2T8.js";import"./index-plX4Cbq-.js";import"./index-CiMX6YLf.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
