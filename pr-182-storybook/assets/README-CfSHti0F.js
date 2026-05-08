import{j as e}from"./iframe-DG3Ay5l6.js";import{useMDXComponents as p}from"./index-kiLheNkG.js";import{M as s,A as a,a as r,S as n}from"./blocks-BrTOzewo.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Dq-lC-_F.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aIEYDSX2.js";import"./index-CAibReNU.js";import"./index-BC4nUMpV.js";import"./index-CbIW61aP.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-B4451itJ.js";import"./Text-o_ffsxuH.js";import"./mergeProps-jw9f8g2-.js";import"./SSRProvider-CSccm5Hk.js";import"./useObjectRef-Bt7AoTYy.js";import"./Hidden-Cv0KDwMz.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-C8pLwjs7.js";import"./usePress-uzsrfJ-c.js";import"./utils-DAMIA-d-.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BKJHOq_P.js";import"./useHover-Dxf8G8v1.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BuYVPqFf.js";import"./useFocusWithin-CZtRim9f.js";import"./index-1osl4Qgs.js";import"./index-CUmQUz9T.js";import"./index-CUP1lm4b.js";import"./slots-B2G1OXBw.js";import"./index-BiMXcAtJ.js";import"./index-CLj43KZG.js";import"./index-DoDl_Hk-.js";import"./index-DdtYI0mb.js";import"./create-external-store-TtP3UJpK.js";import"./index-CfNyJ-c3.js";import"./client-BYFtKW75.js";import"./index-oK3OtEve.js";import"./Dialog-DEv3sJth.js";import"./RSPContexts-C21p4uNp.js";import"./OverlayArrow--wJCRdpV.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C-jYM_Nr.js";import"./useControlledState-km3iKmG6.js";import"./context-DtTDjPrb.js";import"./Collection-DivT1Z16.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-Cxqozi7q.js";import"./FocusScope-Dgf4Tzdf.js";import"./SelectionIndicator-BKwifFsc.js";import"./Overlay-CcfI1CyU.js";import"./PortalProvider-BEyJjS_d.js";import"./useLocalizedStringFormatter-BE3-kXmZ.js";import"./usePreventScroll-CoGi7r6Y.js";import"./useLabels-D6yUodzK.js";import"./VisuallyHidden-BIHtrsfH.js";import"./index-dMgh0xEH.js";import"./index-Cb4ao8WG.js";import"./index-D00NLFGA.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
