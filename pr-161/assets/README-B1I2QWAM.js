import{j as e}from"./iframe-D2x-hO_Q.js";import{useMDXComponents as p}from"./index-DadqkZJb.js";import{M as s,A as a,a as r,S as n}from"./blocks--29OZHCZ.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CEK0xD-u.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dic5HOtf.js";import"./index-CJtxSfDt.js";import"./index-B2Q5MTHv.js";import"./index-DrFu-skq.js";import"./index-BZ3Qzz3R.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CTiPc0kt.js";import"./Text-C6rycjIv.js";import"./mergeProps-DE1Lk54o.js";import"./SSRProvider-DYPNxKcf.js";import"./useObjectRef-u5T2SHPP.js";import"./Hidden-B-MXYcOX.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-kt6mjxnQ.js";import"./usePress-_I98gXj0.js";import"./utils-DJ8B3esD.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CNCkBcy6.js";import"./useHover-SzWuDPx9.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BE_eyDYR.js";import"./useFocusWithin-BmlBjB4J.js";import"./index-DM4i1CkS.js";import"./index-CpmdkNsO.js";import"./index-Bp4yR83Z.js";import"./slots-ARsWnRy-.js";import"./index-Bd9uDaoB.js";import"./index-CLj43KZG.js";import"./index-DWiLLHLu.js";import"./index-BNby6u7j.js";import"./create-external-store-TtP3UJpK.js";import"./index-BG8AJJ7d.js";import"./client-N80Glpgl.js";import"./index-HGqs_5RJ.js";import"./Dialog-D6CSMw-S.js";import"./RSPContexts-CnBdSLcm.js";import"./OverlayArrow-QUZUL5p-.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-kEy8R440.js";import"./useControlledState-C8vklXjv.js";import"./context-BsI4uVqH.js";import"./Collection-DUVPjo9u.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-Cli0Tk79.js";import"./FocusScope-BpvPERXL.js";import"./SelectionIndicator-B-dSTYqq.js";import"./Overlay-Cg9qqdO-.js";import"./PortalProvider-BFg3vkLu.js";import"./useLocalizedStringFormatter-BExVZnle.js";import"./usePreventScroll-BIwjXy23.js";import"./useLabels-1ehDnZRR.js";import"./VisuallyHidden-Co-N1HAQ.js";import"./index-7K8LzkI7.js";import"./index-NRxZjfTT.js";import"./index-b1s-ajrs.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
