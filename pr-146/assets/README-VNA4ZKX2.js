import{j as e}from"./iframe-CFbvAMt4.js";import{useMDXComponents as s}from"./index-BVZTzHhQ.js";import{M as p,A as a,a as r,S as n}from"./blocks-ZM53LnYJ.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-C7JiHmNP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C70cCOwD.js";import"./index-Rp5O-AnQ.js";import"./index-CL47zJHF.js";import"./index-DrFu-skq.js";import"./index-BXOJyyqD.js";import"./index-DAgja_K1.js";import"./clsx-DMFXSSP5.js";import"./index-BWpU0Ejx.js";import"./mergeProps-Bka8Jxbh.js";import"./useObjectRef-C6URdWSn.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-ZFzQB34m.js";import"./useFocusWithin-DwrOTBLN.js";import"./platform-BULRNHlZ.js";import"./useFocusable-CkVQvVnK.js";import"./Collection-8edibhNn.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-DfEJQTqb.js";import"./context-DYHQLQHZ.js";import"./useControlledState-BRSvzLzZ.js";import"./useOverlayTriggerState-PnS9NX8W.js";import"./PortalProvider-CZCwfmDd.js";import"./usePreventScroll-BWlr1gS9.js";import"./useLabel-TrEoNmh7.js";import"./VisuallyHidden-DgDCiHiU.js";import"./useField-BQfSAFf_.js";import"./useButton-DBljmLAR.js";import"./index-IYEPKBof.js";import"./index-CPz1UQiM.js";import"./slots-DKU5GXw6.js";import"./index-BotUJ0jx.js";import"./index-CLj43KZG.js";import"./index-B6Ixxdps.js";import"./index-BZk8MZOZ.js";import"./create-external-store-TtP3UJpK.js";import"./index-Y0RGMAIk.js";import"./client-jzqcwY2l.js";import"./index-B1XYqvgl.js";import"./index-BLDDmHng.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
