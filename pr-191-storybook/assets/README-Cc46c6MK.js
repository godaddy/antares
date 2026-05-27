import{j as e}from"./iframe-cPHtN_oj.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-DdKS2Im_.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BJaEj91Z.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B7tQXjdW.js";import"./index-tasudasc.js";import"./index-CP0q29wC.js";import"./index-DH1YCa2S.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DX-Johrs.js";import"./Text-DTdP3hz0.js";import"./mergeProps-07vFQF63.js";import"./SSRProvider-DwnL9xXt.js";import"./useObjectRef-CDf4s8sh.js";import"./ProgressBar-B6jtVNh0.js";import"./Label-BoetGe84.js";import"./filterDOMProps-SeKkUh_q.js";import"./useLabel-BXXqOex0.js";import"./I18nProvider-DH3PKVnk.js";import"./number-P4c4HRxZ.js";import"./useButton-DAUsPwis.js";import"./useFocusable-Dj_zHUqZ.js";import"./useSyncRef-f8Y6ADGD.js";import"./useGlobalListeners-l8EDc72h.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BxGALELs.js";import"./platform-DTNzKOdA.js";import"./usePress-KApDpc8y.js";import"./useFocusRing-tEmojGgc.js";import"./useFocusWithin-Ck23iiR4.js";import"./index-D5aPdiUQ.js";import"./index-HTd3W1bk.js";import"./index-DnR9hdJQ.js";import"./slots-C4NSIfSd.js";import"./index-zypKTwfF.js";import"./index-CLj43KZG.js";import"./index-CaYbisUj.js";import"./index-CEcgxlbZ.js";import"./create-external-store-TtP3UJpK.js";import"./index-XUrSHlgG.js";import"./client-BDGYVH_C.js";import"./index-Dkr4XQNr.js";import"./index-yfuaPnUQ.js";import"./Dialog-CYU23J7W.js";import"./Heading-JNtNdpV4.js";import"./animation-DMlYyka2.js";import"./useControlledState-B3aWk4wl.js";import"./useCollection-BLpQFWld.js";import"./FocusScope-Dkc55N0S.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-O1bq9W62.js";import"./Autocomplete-BwDuQmOM.js";import"./SelectionIndicator-ycVczp1k.js";import"./useLocalizedStringFormatter-91icI_Bh.js";import"./getScrollParent-CjtJP_Hi.js";import"./VisuallyHidden-BMtGHC0t.js";import"./index-DDjrDaUw.js";import"./index-CpjFBvNM.js";import"./index-DH3HaWYf.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
