import{j as e}from"./iframe-DTALigXZ.js";import{useMDXComponents as p}from"./index-DRsmTLPg.js";import{M as s,A as a,a as r,S as n}from"./blocks-BZIvt908.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-m0edQQxr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CBWsPa5X.js";import"./index-D0CmnqIM.js";import"./index-mIY3p9VN.js";import"./index-C_ThWeUL.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-B_9gA8QW.js";import"./Text-BEAiNgGK.js";import"./mergeProps-MWO0rk5n.js";import"./SSRProvider-C0EIOAtD.js";import"./useObjectRef-BNfUZmn2.js";import"./Hidden-C1oPz-sH.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BpZt0Nt1.js";import"./usePress-B0d-_spp.js";import"./utils-CXWVNFue.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-B4agm-jD.js";import"./useHover-DFkkgnuz.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CecnHwI5.js";import"./useFocusWithin-Gs61hL0Q.js";import"./index-Baa51Cdm.js";import"./index-CUeZGFKS.js";import"./index-CsaL64zc.js";import"./slots-yOOeetf5.js";import"./index-Cb3frjdt.js";import"./index-CLj43KZG.js";import"./index-l65Frlrq.js";import"./index-DYLlURZn.js";import"./create-external-store-TtP3UJpK.js";import"./index-ilc9C2-J.js";import"./client-DanlYYl8.js";import"./index-BeqZXJfo.js";import"./Dialog-DNdr_zXP.js";import"./RSPContexts-Da7ilbwt.js";import"./OverlayArrow-Bcxd0uZE.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-4C6zG1re.js";import"./useControlledState-xC7fnhyc.js";import"./context-c6fhxMFW.js";import"./Collection-mKrtMBHt.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-MPzVq9id.js";import"./FocusScope-Cu99wzvj.js";import"./SelectionIndicator-CzSAPYof.js";import"./Overlay-C4S-sEiT.js";import"./PortalProvider-Dhyzif4y.js";import"./useLocalizedStringFormatter-BV7XsLei.js";import"./usePreventScroll-hbPoFofQ.js";import"./useLabels-zhJ8gJbI.js";import"./VisuallyHidden-Bn3VwA65.js";import"./index-EorKtZTZ.js";import"./index-BD_6AySA.js";import"./index-B4kBtzNv.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
