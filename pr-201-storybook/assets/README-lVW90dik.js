import{j as e}from"./iframe-B_XvV7CY.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-DI7fewAK.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Bz5VQUUx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BpwH3HVJ.js";import"./index-nU4GYxAx.js";import"./index-CuQRGrwp.js";import"./index-D_gDE2Yp.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-C1Mdsi0m.js";import"./Text-UYduh6qR.js";import"./SSRProvider-Babacl1u.js";import"./ProgressBar-DYD8Z5xy.js";import"./useLabel-Dehw8yOx.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-BB58OBzh.js";import"./number-P4c4HRxZ.js";import"./useHover-Cvj41HgA.js";import"./useFocusRing-BKR0SpF4.js";import"./index-BOAZ7-sQ.js";import"./index-DvzUQ3nw.js";import"./index-EZUigfgO.js";import"./slots-Bp7M6d4d.js";import"./index-ID7BPCPn.js";import"./index-CLj43KZG.js";import"./index-CWg3q78b.js";import"./index-CdQnZzqy.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dv5QjmLx.js";import"./client-DUrbyb1m.js";import"./index-DFMxgtYQ.js";import"./index-Dsdc4bMV.js";import"./Dialog-BKAf79Te.js";import"./Heading-B3gZZ1gI.js";import"./animation-BpoopIy7.js";import"./useControlledState-B6OB8qD_.js";import"./Collection-Q_8uGj72.js";import"./Autocomplete-Yimbt-1e.js";import"./SelectionIndicator-DNk2PTWu.js";import"./SharedElementTransition-CKt2SGZF.js";import"./useLocalizedStringFormatter-k92g5IsD.js";import"./useCollator-vFQIZqyW.js";import"./FocusScope-t3NnZ0pU.js";import"./useEvent-BBM8QJpL.js";import"./VisuallyHidden-BNI5lx0u.js";import"./index-B1_NATH6.js";import"./index-Cx2ZJ0h9.js";import"./index-BU6kDO4d.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function de(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{de as default};
