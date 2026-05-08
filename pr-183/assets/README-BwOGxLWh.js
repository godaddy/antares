import{j as e}from"./iframe-BrDvb0KO.js";import{useMDXComponents as p}from"./index-Dl1B0LWp.js";import{M as s,A as a,a as r,S as n}from"./blocks-DaEqNk0K.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CPaXIDbC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BhHHr7wl.js";import"./index-CMH10zni.js";import"./index-C0W-uqxL.js";import"./index-Dve86Km8.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-B2LVwEk3.js";import"./Text-OhUaJ8Ot.js";import"./mergeProps-D20zvsO2.js";import"./SSRProvider-BM5avgrS.js";import"./useObjectRef-Cyjo_ful.js";import"./Hidden-CJTd8__l.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-nbdg3QKR.js";import"./usePress-BKhJJrmP.js";import"./utils-BiWtHjoQ.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BbwBVMDN.js";import"./useHover-LJGH61PA.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-DU8NDe7R.js";import"./useFocusWithin-J3teu8KB.js";import"./index-0PgV6BWz.js";import"./index-DMKmh_Bc.js";import"./index-CvQsojvK.js";import"./slots-CaC-nOBL.js";import"./index-HgWDdH4n.js";import"./index-CLj43KZG.js";import"./index-DTaq1tt5.js";import"./index-6Zga7PKS.js";import"./create-external-store-TtP3UJpK.js";import"./index-DGMv5daj.js";import"./client-Dnw4knx5.js";import"./index-C8VkyT3x.js";import"./Dialog-D6gDTRZv.js";import"./RSPContexts-EmZg0qtp.js";import"./OverlayArrow-DHGADSQF.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BPuSBERu.js";import"./useControlledState-Ddd66Y1p.js";import"./context-nmHBm6Cc.js";import"./Collection-BXsoUNUM.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-B7OvgcCQ.js";import"./FocusScope-DHiLTlHJ.js";import"./SelectionIndicator-Cl6ZkTq5.js";import"./Overlay-DfuTVqGE.js";import"./PortalProvider-CSrqRmgf.js";import"./useLocalizedStringFormatter-C26SJAC2.js";import"./usePreventScroll-DEJB0a3x.js";import"./useLabels-GnSly1wK.js";import"./VisuallyHidden-DinuGUr1.js";import"./index-CfWdyoFJ.js";import"./index-BLR8pg5u.js";import"./index-DxhyOQHI.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
