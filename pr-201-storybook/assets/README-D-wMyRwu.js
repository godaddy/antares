import{j as e}from"./iframe-D-h8DdP6.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CRRIx9P5.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-ByE2WtWs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DJCOIMB7.js";import"./index-DVgJY0r0.js";import"./index-x9f2IQpB.js";import"./index-B1az8c5n.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DqtkuOOj.js";import"./Text-Daq_j_wD.js";import"./SSRProvider-CsQl7UxQ.js";import"./ProgressBar-DLCKqegp.js";import"./useLabel-BYU1Otj9.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-DVc_2H4j.js";import"./number-P4c4HRxZ.js";import"./useHover-lTCyc9g1.js";import"./useFocusRing-CBlgnTKJ.js";import"./index-DPmsULQh.js";import"./index-BVqgw4yd.js";import"./index-DNbyN3rf.js";import"./slots-bdze2pCu.js";import"./index-ZPNd2LLe.js";import"./index-CLj43KZG.js";import"./index-D6dICoQY.js";import"./index-hcQ3Z5xt.js";import"./create-external-store-TtP3UJpK.js";import"./index-CLmibTJI.js";import"./client-D33wTw9R.js";import"./index-BKnk4IW6.js";import"./index-Bh3xfoHX.js";import"./Dialog-BeJ9-8uM.js";import"./Heading-DTHZFnec.js";import"./animation-u3wgwMUk.js";import"./useControlledState-DnAD4gb4.js";import"./Collection-rzLEKHyP.js";import"./Autocomplete-CJTEeYVE.js";import"./SelectionIndicator-BMH_I0Y_.js";import"./SharedElementTransition-B34NskRA.js";import"./useLocalizedStringFormatter-CIggF5wY.js";import"./useCollator-DwVwwf5A.js";import"./FocusScope-COu0TaxP.js";import"./useEvent-B9LCeW-g.js";import"./VisuallyHidden-DPN51W3p.js";import"./index-BTWaKgPi.js";import"./index-CwDYYWPo.js";import"./index-BvRGCnUg.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
