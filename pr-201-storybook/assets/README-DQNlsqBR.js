import{j as e}from"./iframe-Bx9EjbtX.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-C3o0XnWD.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CZ-Q-f81.js";import"./preload-helper-PPVm8Dsz.js";import"./index-RmJSc0je.js";import"./index-BUOOCQSA.js";import"./index-nFTnv9Ds.js";import"./index-CwjOX-uL.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Df91Wxpc.js";import"./Text-BiluZApU.js";import"./SSRProvider-ChVSpf9o.js";import"./ProgressBar-vWPkoheM.js";import"./useLabel-fmrxNxt9.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-Cvoqlvq0.js";import"./number-P4c4HRxZ.js";import"./useHover-DwNwGfMS.js";import"./useFocusRing-jrDhpwwa.js";import"./index-qQdgzqfP.js";import"./index-BWfU6nci.js";import"./index-CpRwQeSN.js";import"./slots-SEhqPwwl.js";import"./index-Csmn2mDE.js";import"./index-CLj43KZG.js";import"./index-D_4Uf301.js";import"./index-mTTLLXEC.js";import"./create-external-store-TtP3UJpK.js";import"./index-CQc-CVID.js";import"./client-CGJD1rh5.js";import"./index-CJAJ98_c.js";import"./index-BlpEKeNz.js";import"./Dialog-hsPjjYCz.js";import"./Heading-BiWQImkM.js";import"./animation-B1tQG88p.js";import"./useControlledState-D4Yfu_cD.js";import"./Collection-D8iY7bBM.js";import"./Autocomplete-PKhqaPMq.js";import"./SelectionIndicator-D0-IxTmr.js";import"./SharedElementTransition-ECAIqCut.js";import"./useLocalizedStringFormatter-bzWnwHAe.js";import"./useCollator-dN5zNw7h.js";import"./FocusScope-B4si0Dhk.js";import"./useEvent-DfNPDxV-.js";import"./VisuallyHidden-aCIMG_0o.js";import"./index-BHbB2RsQ.js";import"./index-CfSOlMh4.js";import"./index-B2dAcc1U.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
