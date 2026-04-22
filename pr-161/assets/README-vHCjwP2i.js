import{j as e}from"./iframe-D1ffrKFu.js";import{useMDXComponents as p}from"./index-B7Lx40or.js";import{M as s,A as a,a as r,S as n}from"./blocks-DaRZYqHF.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BhVPjvaG.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cz8KgIep.js";import"./index-DC1oEnzR.js";import"./index-D91JL73M.js";import"./index-DrFu-skq.js";import"./index-BbUvCD9w.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BsrDOxBB.js";import"./Text-CYik-koF.js";import"./mergeProps-BFkBPHEy.js";import"./SSRProvider-5SE_QYD0.js";import"./useObjectRef-FUzBHnK5.js";import"./Hidden-Ds9aLZls.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DjoWph75.js";import"./usePress-CJ8xRG1Q.js";import"./utils-CI_GmkcR.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BLSsIPav.js";import"./useHover-B4f6Gwa8.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BDrIvBmB.js";import"./useFocusWithin-_h8ZI5Z0.js";import"./index-LHoSfUJf.js";import"./index-2sLDUdqB.js";import"./index-C8lvV3V9.js";import"./slots-0Wmv7Gqa.js";import"./index-Dft_e07c.js";import"./index-CLj43KZG.js";import"./index-DC3wLLlB.js";import"./index-Dikb04ab.js";import"./create-external-store-TtP3UJpK.js";import"./index-DfEThKL1.js";import"./client-CezRlg0L.js";import"./index-DqPRp8Zx.js";import"./Dialog-CBecE4-h.js";import"./RSPContexts-CRcpoVPv.js";import"./OverlayArrow-I_e55obL.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-4kPObwin.js";import"./useControlledState-BF2iBaHH.js";import"./context-9ff_JYXl.js";import"./Collection-C0F-AcYk.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-E7D6iNJR.js";import"./FocusScope-DrwSTH2b.js";import"./SelectionIndicator-BcCpcsBa.js";import"./Overlay-BqC_3RBX.js";import"./PortalProvider-BERmTsfN.js";import"./useLocalizedStringFormatter-BhGiL0le.js";import"./usePreventScroll-C1LBVEDV.js";import"./useLabels-B74qCCle.js";import"./VisuallyHidden-CIqv432h.js";import"./index-CHHK_ehi.js";import"./index-CFR0wif_.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
