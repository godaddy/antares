import{j as e}from"./iframe-fSexQ0W-.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CB_wgupa.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-y-mzsIIC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BW33JMus.js";import"./index-cq0IvEJJ.js";import"./index-FfQZoQ4p.js";import"./index-Dac8PlZL.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BunU-mtw.js";import"./Text-ZVAex8cQ.js";import"./mergeProps-B8CJlJ3T.js";import"./SSRProvider-CsQvpOFC.js";import"./useObjectRef-9fN0i9Oi.js";import"./Hidden-Bt-_03fx.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DkxUbzsl.js";import"./usePress-DWXyZ4n0.js";import"./utils-kuhg0Tja.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-JN56zzga.js";import"./useHover-s98FnoP8.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-Dloq-qQJ.js";import"./useFocusWithin-4_le6RZT.js";import"./index-CiL04NVO.js";import"./index-8AnhNrAi.js";import"./index-DWo26rPE.js";import"./slots-Bb2OIUu8.js";import"./index-ComHt6qF.js";import"./index-CLj43KZG.js";import"./index-CKn92FLW.js";import"./index-DH2B_l8y.js";import"./create-external-store-TtP3UJpK.js";import"./index-BHofdk26.js";import"./client-GTeHx4t-.js";import"./index-BlMtNg6M.js";import"./Dialog-DqUEYG2q.js";import"./RSPContexts-DtcH9ojI.js";import"./OverlayArrow-D2_Dxe4k.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-CCzSxzht.js";import"./useControlledState-DI0NCvWO.js";import"./context-hYB5Ush6.js";import"./SelectionManager-BzCSOmxw.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-mODLD-9C.js";import"./FocusScope-BSqjnQqn.js";import"./SelectionIndicator-Vg_ABNks.js";import"./Overlay-CivxBMBI.js";import"./PortalProvider-ryrozUGX.js";import"./useLocalizedStringFormatter-BMqSyhqa.js";import"./usePreventScroll-CDpIv83K.js";import"./useLabels-CXf_tRli.js";import"./VisuallyHidden-DE0c6ROt.js";import"./index-Dh4y52AL.js";import"./index-CffWZoux.js";import"./index-vHLn_KjV.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
