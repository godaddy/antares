import{j as e}from"./iframe-Bb1NQHs5.js";import{useMDXComponents as p}from"./index-D4oHENfc.js";import{M as s,A as a,a as r,S as n}from"./blocks-DWBbPI5V.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DTxmMDKM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFII15ob.js";import"./index-DinWVzWV.js";import"./index-C2u_IMHF.js";import"./index-DrFu-skq.js";import"./index-DRc0xGNg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-AHLnxo-M.js";import"./Text-BP7LHt8f.js";import"./mergeProps-B-RIf00_.js";import"./SSRProvider-Bk6RcCZ6.js";import"./useObjectRef-B1xa17kX.js";import"./Hidden-B4CSPDS1.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-B1678oMT.js";import"./usePress-7DVQ_hIf.js";import"./utils-CDGUJOKx.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CwTsGGTb.js";import"./useHover-CTFHYQgk.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-J7V8wu2l.js";import"./useFocusWithin-BzQ-pp1J.js";import"./index-CEibMBlw.js";import"./index-DRzn03tQ.js";import"./index-DzneMA7f.js";import"./slots-DAzkOPzB.js";import"./index-KH84-3i8.js";import"./index-CLj43KZG.js";import"./index-BRlsuRZ3.js";import"./index-DoPK94KX.js";import"./create-external-store-TtP3UJpK.js";import"./index-BpmInR-6.js";import"./client-BJBlMbT7.js";import"./index-Dgwoc67E.js";import"./Dialog-34_sLbGH.js";import"./RSPContexts-CZflJwQ9.js";import"./OverlayArrow-L43alw3b.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-Dsogs9gp.js";import"./useControlledState-CIgbwOw-.js";import"./context-BbPoqss-.js";import"./Collection-CgVOK55-.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-5oHmwmEi.js";import"./FocusScope-C67KhCTi.js";import"./SelectionIndicator-CKTLVAZ4.js";import"./Overlay-CtTyNp3J.js";import"./PortalProvider-2Ytreh3Y.js";import"./useLocalizedStringFormatter-DXIfRtIc.js";import"./usePreventScroll-LTsByzQn.js";import"./useLabels-Co7Axzn5.js";import"./VisuallyHidden-DDjcO5qI.js";import"./index-DHsJJ1Eo.js";import"./index-STJBFg11.js";import"./index-C6TMJvtQ.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
