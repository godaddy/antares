import{j as e}from"./iframe-BQo81cX5.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-D40TWfPg.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CkgweiD6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4vCilNW6.js";import"./index-DgwHFz0H.js";import"./index-ns4hd72K.js";import"./index-wxe4feb3.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BONVOPKW.js";import"./Text-BXAFqKb0.js";import"./SSRProvider-DbNrytmr.js";import"./ProgressBar-CbNr0uGk.js";import"./useLabel-CxSbOIQ6.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-DZdY1YND.js";import"./number-P4c4HRxZ.js";import"./useHover-BfbAv8dL.js";import"./useFocusRing-DHiMMysQ.js";import"./index-BKideCSp.js";import"./index-CSAEVYVz.js";import"./index-BKcMW1wv.js";import"./slots-gxdXh3-A.js";import"./index-DWoPlmc9.js";import"./index-CLj43KZG.js";import"./index-DtQrBc1g.js";import"./index-60QUrdxT.js";import"./create-external-store-TtP3UJpK.js";import"./index-CuMxKIpi.js";import"./client-CjDxRmut.js";import"./index-BXtJ1pza.js";import"./index-DgmgcAUd.js";import"./Dialog-C9S6tWyx.js";import"./Heading-BaFmuuCw.js";import"./animation-CpC8xnar.js";import"./useControlledState-CcPFMwGz.js";import"./Collection-D8ZCOB2A.js";import"./Autocomplete-BlhJgApI.js";import"./SelectionIndicator-B1TcoGgg.js";import"./SharedElementTransition-CvB0LCF7.js";import"./useLocalizedStringFormatter-UxfUSOvb.js";import"./useCollator-DOaNmk-f.js";import"./FocusScope-D41WX2hc.js";import"./useEvent-Bm81J4Jv.js";import"./VisuallyHidden-BnbrII6R.js";import"./index-IR1Fs-_n.js";import"./index-D6Jjajys.js";import"./index-B5roP8fG.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
