import{j as e}from"./iframe-CAbq4aYF.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-DxjHSUbH.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Dk7ulp99.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCYc_8W4.js";import"./index-BAC-w0_0.js";import"./index-CJKSGwSi.js";import"./index-BGvGIymk.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BwbrtNjS.js";import"./Text-CF-1lucW.js";import"./mergeProps-CxoBR0Wp.js";import"./SSRProvider-BDs7FidF.js";import"./useObjectRef-vFUtg9iP.js";import"./Hidden-0fEPAlFT.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Ce81FXAj.js";import"./usePress-k6vAFEo3.js";import"./utils-DbDVSxSh.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CV79qB0a.js";import"./useHover-IfzRq24Y.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DeoTNIgl.js";import"./useFocusWithin-BzFBAnFb.js";import"./index-POZ24sC9.js";import"./index-Cp-br9gi.js";import"./index-DPCM9ZP2.js";import"./slots-DzUcJUQF.js";import"./index-C95mVXLk.js";import"./index-CLj43KZG.js";import"./index-W9EF0LaN.js";import"./index-DrDS5V5n.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dsb2hqQV.js";import"./client-CiCKFlRr.js";import"./index-BAeqBeCx.js";import"./Dialog-CChSEcLA.js";import"./RSPContexts-CHVKQ1EC.js";import"./OverlayArrow-CcJi7Ksk.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C04V_RQx.js";import"./useControlledState-B6sYslo4.js";import"./context-EVg7bFls.js";import"./SelectionManager-DWxpeG-4.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-6m4SjRM1.js";import"./FocusScope-Cq2ORvqQ.js";import"./SelectionIndicator-B5ENMrvR.js";import"./Overlay-D39t_Osi.js";import"./PortalProvider-dPcjPGpE.js";import"./useLocalizedStringFormatter-NGPBMFKO.js";import"./usePreventScroll-D_cRoVmB.js";import"./useLabels-WXaaf_jw.js";import"./VisuallyHidden-BIhGt3at.js";import"./index-DpZKnoh9.js";import"./index-UnCTxyX7.js";import"./index-DMSo-IG0.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
