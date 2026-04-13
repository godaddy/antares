import{j as e}from"./iframe-DsWwth5y.js";import{useMDXComponents as s}from"./index-CPSspYlh.js";import{M as p,A as a,a as r,S as n}from"./blocks-BVRlntSN.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-D9TZLnGQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CJzQXarO.js";import"./index-Cca3xErQ.js";import"./index-Co8wA_Ee.js";import"./index-DrFu-skq.js";import"./index-hviHPSFq.js";import"./index-C1hGPqob.js";import"./clsx-CQd7WFVd.js";import"./index-BLmSon4-.js";import"./mergeProps-B0gXg5Sq.js";import"./useObjectRef-CatRjrqX.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-Ba2vE4gG.js";import"./useFocusWithin-DtgXtfc-.js";import"./platform-BULRNHlZ.js";import"./useFocusable-BCRqK5yc.js";import"./Collection-SEB_5AnB.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-D-Rouooh.js";import"./context-D_2D4MQe.js";import"./useControlledState-8eSJkYJ1.js";import"./useOverlayTriggerState-BIRmXIBZ.js";import"./PortalProvider-B4Hur3ZK.js";import"./usePreventScroll-kipkP6SE.js";import"./useLabel-CzGoEvLs.js";import"./VisuallyHidden-6YlyNQau.js";import"./useField-BlH9leKE.js";import"./useButton-B7te-YmN.js";import"./index-CRkCOu7d.js";import"./index-tXvzzasu.js";import"./slots-C02zWlbL.js";import"./index-BY2PCn27.js";import"./index-CLj43KZG.js";import"./index-CHgDSWuQ.js";import"./index-C6LTnHIt.js";import"./create-external-store-TtP3UJpK.js";import"./index-C_GcJTwd.js";import"./client-BIirFuTS.js";import"./index-Ct4319_5.js";import"./index-CeV3nPuX.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`;function i(t){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{of:m,name:"Overview"}),`
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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function ae(t={}){const{wrapper:o}={...s(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{ae as default};
