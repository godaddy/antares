import{j as e}from"./iframe-C3pkDmNe.js";import{useMDXComponents as s}from"./index-UVQaQDuN.js";import{M as p,A as a,a as r,S as n}from"./blocks-Do0aVo1q.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-HHsr2yty.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Z-QtMzxy.js";import"./index-BgVCNucj.js";import"./index-q9xSD4ii.js";import"./index-DrFu-skq.js";import"./index-Wplrq6Sw.js";import"./index-cnmPSn3B.js";import"./clsx-BaMnB6PZ.js";import"./index-C5jzoT96.js";import"./mergeProps-DpFbkZvz.js";import"./useObjectRef-W83eXW47.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-CMWLkpH7.js";import"./useFocusWithin-BvueqXD-.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Bfwc-d3E.js";import"./Collection-iI9670Rr.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-BsxGDsG5.js";import"./context-Bb_b2aFD.js";import"./useControlledState-DpOGxe_Q.js";import"./useOverlayTriggerState-48I1hTOb.js";import"./PortalProvider-CleRnVgG.js";import"./usePreventScroll-CTaYk1jd.js";import"./useLabel-Bmmbs_m0.js";import"./VisuallyHidden-BiZZYMRK.js";import"./useField-DMvvceP3.js";import"./useButton-4sA_U4m_.js";import"./index-DwpBrUj-.js";import"./index-CFyQP81S.js";import"./slots-BPJe3ods.js";import"./index-XzcnAesB.js";import"./index-CLj43KZG.js";import"./index-DFDMBb9z.js";import"./index-DL7d8lYG.js";import"./create-external-store-TtP3UJpK.js";import"./index-Cz6O0oy2.js";import"./client-DvCARHDr.js";import"./index--fIn9r5g.js";import"./index-CIEXCijO.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
