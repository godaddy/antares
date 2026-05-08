import{j as e}from"./iframe-D8YXAAeg.js";import{useMDXComponents as p}from"./index-QIpnDk3e.js";import{M as s,A as a,a as r,S as n}from"./blocks-v-x0N3Ic.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DYHyBO6M.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B7nvH90w.js";import"./index-DPb9EboQ.js";import"./index--cnBPFpc.js";import"./index-ClH0rh1Z.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CbS2L2Pq.js";import"./Text-B0cC94ak.js";import"./mergeProps-CaSc1RkZ.js";import"./SSRProvider-BpjJ6xN-.js";import"./useObjectRef-D3yum8mV.js";import"./Hidden-CSc1YCdl.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-4BW_WitE.js";import"./usePress-cRR1uvqF.js";import"./utils-DSjcMHmj.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-MZfv_e1X.js";import"./useHover-B3t1-RMF.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BB1Y6VD5.js";import"./useFocusWithin-DbOS3yzb.js";import"./index-DQOG-Pcs.js";import"./index-CHvXCkmI.js";import"./index-BvQBXLO_.js";import"./slots-DGGWraQP.js";import"./index-IBXSyFvD.js";import"./index-CLj43KZG.js";import"./index-Dj0soTKg.js";import"./index-Di3bq5nv.js";import"./create-external-store-TtP3UJpK.js";import"./index-B9UCD0Y4.js";import"./client-XXKubyYL.js";import"./index--p971L0n.js";import"./Dialog-D7l-bAV1.js";import"./RSPContexts-DF-4u-n7.js";import"./OverlayArrow-Cl5NWNuw.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BodFCYwp.js";import"./useControlledState-RlLudLl9.js";import"./context-ezcJ2OAb.js";import"./Collection-DBE_ZEkE.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-BPpuCs9v.js";import"./FocusScope-B0N_RSbk.js";import"./SelectionIndicator-fBlT0P95.js";import"./Overlay-XGYlzg7o.js";import"./PortalProvider-17asaV5x.js";import"./useLocalizedStringFormatter-DPphCbiq.js";import"./usePreventScroll-irLtZhKD.js";import"./useLabels-H94ha5Kd.js";import"./VisuallyHidden-Cp8qNb1C.js";import"./index-D5JKA47J.js";import"./index-CNYHaw-2.js";import"./index-D8JmP03T.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
