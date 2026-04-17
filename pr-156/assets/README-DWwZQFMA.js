import{j as e}from"./iframe-CDEIw4XQ.js";import{useMDXComponents as s}from"./index-BhEX0M0z.js";import{M as p,A as a,a as r,S as n}from"./blocks-BqVfQbPk.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CPQF_BrM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DL9AzUUz.js";import"./index-CAtGzlAv.js";import"./index-MgdxWe3v.js";import"./index-DrFu-skq.js";import"./index-BEiGibEc.js";import"./index-BBkPFN0l.js";import"./clsx-cv3tFG8n.js";import"./index-mzfbLpYX.js";import"./mergeProps-UhpBswaF.js";import"./useObjectRef-Bd000wn7.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-B7RsTE87.js";import"./useFocusWithin-Cfw26kbT.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Ch5kFV99.js";import"./Collection-DTcTBjbt.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-D6wbQ10T.js";import"./context-Dct8_FIu.js";import"./useControlledState-DKyeH0SE.js";import"./useOverlayTriggerState-DRycnfq0.js";import"./PortalProvider-Cvgv_26t.js";import"./usePreventScroll-CD_pawBF.js";import"./useLabel-C61zC6Ny.js";import"./VisuallyHidden-Dttb607n.js";import"./useField-wHib94lK.js";import"./useButton-C0pAqsFy.js";import"./index-BJJVFG9_.js";import"./index-Df3veLei.js";import"./slots-WDjn2eMq.js";import"./index-BYdXecjr.js";import"./index-CLj43KZG.js";import"./index-DXUnOUU7.js";import"./index-Kyvx58Pw.js";import"./create-external-store-TtP3UJpK.js";import"./index-CLF6pm69.js";import"./client-CXi_X_gK.js";import"./index--FoTXNkO.js";import"./index-5nQsLfNb.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
