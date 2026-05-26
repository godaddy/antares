import{j as e}from"./iframe-DCbIohPp.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CsdX_u-7.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-IsZsmnTz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DbHASO08.js";import"./index-D4GmJUgt.js";import"./index-DwGy0Mws.js";import"./index-CK4_QEIG.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Dj-ti48n.js";import"./Text-8A1GPEFa.js";import"./mergeProps-BhGubhoe.js";import"./SSRProvider-B-8HlxOB.js";import"./useObjectRef-DAfYdSIe.js";import"./useButton-C1AaF_Pj.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-C0oTx5s7.js";import"./useSyncRef-B13xFM9P.js";import"./useGlobalListeners-D-4F_alZ.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-Cv6oP88O.js";import"./platform-DTNzKOdA.js";import"./usePress-DkQx1a_H.js";import"./Hidden-ChYPSaIj.js";import"./useFocusRing-DsRPYUBg.js";import"./useFocusWithin-DdYLJTw6.js";import"./index-HKVEUw0F.js";import"./index-BLmR-Gh3.js";import"./index-BTFtUFOC.js";import"./slots-BVlVUmIj.js";import"./index-BCbZ4Ekj.js";import"./index-CLj43KZG.js";import"./index-9unWb5qb.js";import"./index-DGMrhb7p.js";import"./create-external-store-TtP3UJpK.js";import"./index-lLzeVzlq.js";import"./client-kzcNz8ai.js";import"./index-Bn_NgbtJ.js";import"./index-CyJAOWAi.js";import"./Dialog-Bdoz7gma.js";import"./Heading-CiT09yY3.js";import"./animation-CVM5NaJi.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-BcAFlZY9.js";import"./useControlledState-DRLNR_9v.js";import"./useCollection-BONpuNdn.js";import"./FocusScope-BRIvEean.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-DLuxcpYs.js";import"./Autocomplete-BgOT0fQ7.js";import"./SelectionIndicator-BbYabeOp.js";import"./useLocalizedStringFormatter-sss7mQNn.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-AlKSYynQ.js";import"./VisuallyHidden-BIK213xv.js";import"./index-DE-SBodD.js";import"./index-B3yRO4pQ.js";import"./index-GmS6-GzI.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
