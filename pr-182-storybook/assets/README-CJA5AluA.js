import{j as e}from"./iframe-B2rswUNA.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-QrW9PPQu.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CuWFqTCi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CUxjJQ4C.js";import"./index-D9q0_Ikz.js";import"./index-CLa44HDQ.js";import"./index-B515LyFy.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BVDXtlCr.js";import"./Text-CPfFkHKL.js";import"./mergeProps-B0ruHaBt.js";import"./SSRProvider-WgX1OZpL.js";import"./useObjectRef-CGprvKsc.js";import"./Hidden-BZgjLMjQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DonupXhG.js";import"./usePress-CpojxGoK.js";import"./utils-MOEt33io.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Bw2kAudK.js";import"./useHover-CwbhPuzk.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DxbV7ayj.js";import"./useFocusWithin-liTmbOsT.js";import"./index-DgFAK6Sk.js";import"./index-DU24aX_Y.js";import"./index-pmpj_g-s.js";import"./slots-DSqAbleQ.js";import"./index-QSEzv4mT.js";import"./index-CLj43KZG.js";import"./index-CoYxMz83.js";import"./index-DNkdm6iH.js";import"./create-external-store-TtP3UJpK.js";import"./index-By1uWG84.js";import"./client-DMq6HEeJ.js";import"./index-B85KLhm5.js";import"./Dialog-DVjxz9Xr.js";import"./RSPContexts-y-cA5X18.js";import"./OverlayArrow-BQ--9yRL.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-D90zJ8Qu.js";import"./useControlledState-BVIXsyRA.js";import"./context-BNs4nZYM.js";import"./SelectionManager-aXjSBMHx.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-B6-KcX5z.js";import"./FocusScope-Cm1ZOHsy.js";import"./SelectionIndicator-CwYWShPA.js";import"./Overlay-D3aVkArS.js";import"./PortalProvider-Cjf8iGuO.js";import"./useLocalizedStringFormatter-DkO_J0oy.js";import"./usePreventScroll-DZVV2nyU.js";import"./useLabels-DgQP2tFk.js";import"./VisuallyHidden-M4IaGOfd.js";import"./index-DGmFSkwI.js";import"./index-zRMP14iq.js";import"./index-CEOOHSBH.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
