import{j as e}from"./iframe-CKVyuYYO.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-RETpHSpU.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-D0MTKh6f.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DJ6SVp_w.js";import"./index-CJP167mi.js";import"./index-DqMEEeiJ.js";import"./index-DlLdk_f7.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-2nqQzn_N.js";import"./Text-DdOBbXZM.js";import"./SSRProvider-BSSZgJo_.js";import"./ProgressBar-DhTPpaOh.js";import"./useLabel-DYMEvZPa.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-BC-wFs8q.js";import"./number-P4c4HRxZ.js";import"./useHover-B0zegqdm.js";import"./useFocusRing-Dr5AMAZu.js";import"./index-CXEqBKm0.js";import"./index-BltmY3DD.js";import"./index-C9cOH2UV.js";import"./slots-DIeBJihR.js";import"./index-DW4A_pMo.js";import"./index-CLj43KZG.js";import"./index-CTW2uFrc.js";import"./index-C0PYUcDH.js";import"./create-external-store-TtP3UJpK.js";import"./index-CvlrPPhP.js";import"./client-FkOGea0J.js";import"./index-399DhJ0H.js";import"./index-DOdapvla.js";import"./Dialog-BEMY-P1n.js";import"./Heading-hm0JlUpU.js";import"./animation-C-bWXCyJ.js";import"./useControlledState-0swsKy3H.js";import"./Collection-Dtn3u02R.js";import"./Autocomplete-DNqtX0cA.js";import"./SelectionIndicator-BVO8Us_i.js";import"./SharedElementTransition-Ce9hBLOe.js";import"./useLocalizedStringFormatter-DJrDen6O.js";import"./useCollator-GlKYbAyL.js";import"./FocusScope-MQoZJk5n.js";import"./useEvent-Dd4ZAuvm.js";import"./VisuallyHidden-Cg2jeq5u.js";import"./index-D5jDSqFm.js";import"./index-DshJNcfD.js";import"./index-DznlD21j.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
