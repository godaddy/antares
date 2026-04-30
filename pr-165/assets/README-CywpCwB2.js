import{j as e}from"./iframe-BCszq3eK.js";import{useMDXComponents as p}from"./index-LKpQAWkf.js";import{M as s,A as a,a as r,S as n}from"./blocks-D9Q5yeht.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DGRLbxwl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BrwSF4p2.js";import"./index-2m5hP8oV.js";import"./index-D4iQz-eU.js";import"./index-DrFu-skq.js";import"./index-izEa81un.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CNkMhNBJ.js";import"./Text-DyVUT0IC.js";import"./mergeProps-uWb1iR1l.js";import"./SSRProvider-DuyXPnH5.js";import"./useObjectRef-CCCwXbuZ.js";import"./Hidden-DD-TNhoc.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BKOOMKNh.js";import"./usePress-CjDmn3rM.js";import"./utils-BMmhsuDo.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-B0LHdj7Q.js";import"./useHover-vfUYRPr0.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CT8lt-AH.js";import"./useFocusWithin-KN-LvprE.js";import"./index-Bfh121_K.js";import"./index-DL0fHO2O.js";import"./index-DOkhroU7.js";import"./slots-CmkOLRm9.js";import"./index-BXcyZY8V.js";import"./index-CLj43KZG.js";import"./index-CWO7E0mG.js";import"./index-DnuDHN96.js";import"./create-external-store-TtP3UJpK.js";import"./index-B7ngylF_.js";import"./client-O6txxDQF.js";import"./index-B_qhqSSM.js";import"./Dialog-DzHogpvk.js";import"./RSPContexts-Bb-W1qLC.js";import"./OverlayArrow-QjLU70Jt.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-B1iquS_q.js";import"./useControlledState-BOWYWgAZ.js";import"./context-g79mffOu.js";import"./Collection-BhzuMlSJ.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-BhGu8xua.js";import"./FocusScope-DEZ3mcsI.js";import"./SelectionIndicator-BbTkkSiu.js";import"./Overlay-DL05-9nb.js";import"./PortalProvider-Bsmn5AQE.js";import"./useLocalizedStringFormatter-RWIEP9xN.js";import"./usePreventScroll-5yB0f0XR.js";import"./useLabels-BrNPSZ74.js";import"./VisuallyHidden-CYBSLNPG.js";import"./index-BQSHNUaq.js";import"./index-DQtWuAhz.js";import"./index-BCOIGHWv.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
