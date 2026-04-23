import{j as e}from"./iframe-BwODXSqA.js";import{useMDXComponents as p}from"./index-BGGSm5DT.js";import{M as s,A as a,a as r,S as n}from"./blocks-CO9MKHpT.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BfUa8vMh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CPu7MFBV.js";import"./index-DZmeu8_Y.js";import"./index-BRKK8RLZ.js";import"./index-DrFu-skq.js";import"./index-CEvIbeG2.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CskqDeOa.js";import"./Text-Blz_fnGQ.js";import"./mergeProps-BCp9rCma.js";import"./SSRProvider-CFRJn3If.js";import"./useObjectRef-Cxa3yaxd.js";import"./Hidden-B6vMDYTA.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-C1PnQMYQ.js";import"./usePress-BWw8iO9l.js";import"./utils-DMPEBLX6.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Dc1EiH8c.js";import"./useHover-MAvwLixn.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-C7JTkSTN.js";import"./useFocusWithin-Br8i_sof.js";import"./index-SNMDaGZJ.js";import"./index-D-YB5p_6.js";import"./index-D0lAkBHb.js";import"./slots-exE2zvcr.js";import"./index-CiObCghH.js";import"./index-CLj43KZG.js";import"./index-B9nmbnDX.js";import"./index-Cc8qQRDo.js";import"./create-external-store-TtP3UJpK.js";import"./index-DvvXlmao.js";import"./client-BwAGGvoS.js";import"./index-KfU5BfGY.js";import"./Dialog-DZ9U1u_v.js";import"./RSPContexts-D4OdHwQv.js";import"./OverlayArrow-7o--GKkM.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DdHL7u8A.js";import"./useControlledState-x0NatThe.js";import"./context-BMMe3rbT.js";import"./Collection-BOrzfuOU.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-pmTKJl4i.js";import"./FocusScope-MeIRQsBz.js";import"./SelectionIndicator-C769baEv.js";import"./Overlay-DZNdOtiR.js";import"./PortalProvider-4FUByjCX.js";import"./useLocalizedStringFormatter-CO9wWTaI.js";import"./usePreventScroll-CKY9hUkj.js";import"./useLabels-DOu0Ac_C.js";import"./VisuallyHidden-BjHvHP2G.js";import"./index-D-yOnvcn.js";import"./index-yEhKPxig.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
