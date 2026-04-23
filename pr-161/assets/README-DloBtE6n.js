import{j as e}from"./iframe-B2BRW8sw.js";import{useMDXComponents as p}from"./index-BOCSrtco.js";import{M as s,A as a,a as r,S as n}from"./blocks-DTrq5CaG.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DcLxXIl2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dy9XR_9e.js";import"./index-rl8J2qev.js";import"./index-B4IxMDjQ.js";import"./index-DrFu-skq.js";import"./index-B2Qxw4Z-.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-gJ_kEnbL.js";import"./Text-CzFUAU4_.js";import"./mergeProps-DGPQcEPx.js";import"./SSRProvider-DcBEGHZp.js";import"./useObjectRef-BF_HAFl6.js";import"./Hidden-CXpvExIC.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Bzm7hs6z.js";import"./usePress-DYZ70RZ-.js";import"./utils-Dfd7B8Q-.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Cn2GJKfE.js";import"./useHover-CJ56cm1a.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-ZaSXiHNM.js";import"./useFocusWithin-3VkFU4r6.js";import"./index-DlyrCb5Z.js";import"./index-BXQdesUJ.js";import"./index-DwKnT1cr.js";import"./slots-Bo-NjfYO.js";import"./index-pUu-6dG-.js";import"./index-CLj43KZG.js";import"./index-BC73qSjb.js";import"./index-BnhjPxv4.js";import"./create-external-store-TtP3UJpK.js";import"./index-BJrbzpxx.js";import"./client-DxEMWAyo.js";import"./index-Ba3pJDMx.js";import"./Dialog-Drtkfn8k.js";import"./RSPContexts-BQOuuyuq.js";import"./OverlayArrow-DezwxlJS.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-YpZrmVgp.js";import"./useControlledState-CGu_bOyu.js";import"./context-Cc-geI1w.js";import"./Collection-uSyB0z4W.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-BauL2OR6.js";import"./FocusScope-DT9NIHHB.js";import"./SelectionIndicator-DzvYTTwX.js";import"./Overlay-D6yo1_Iz.js";import"./PortalProvider-CjAt8Zg4.js";import"./useLocalizedStringFormatter-IuONdU9M.js";import"./usePreventScroll-lg24GEM4.js";import"./useLabels-BZacu_MT.js";import"./VisuallyHidden-BUE7qgML.js";import"./index-CMBZNTl2.js";import"./index-Dr3ZoCER.js";import"./index-C7vfbIfI.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
