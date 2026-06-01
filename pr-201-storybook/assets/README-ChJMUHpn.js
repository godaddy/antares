import{j as e}from"./iframe-BB45uQw9.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-UXsbcjKo.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Bcu1sEbK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CR40qPoM.js";import"./index-DOdcITIN.js";import"./index-DeSYg_wK.js";import"./index-DdMMKOFe.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CiCkcGr-.js";import"./Text-ZJBEvf3Z.js";import"./SSRProvider-BOxRGIuL.js";import"./ProgressBar-CksUgyRi.js";import"./useLabel-Ce6K44CG.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-D3qKFq3v.js";import"./number-P4c4HRxZ.js";import"./useHover-Bl0j5gjk.js";import"./useFocusRing-YLaLPNA4.js";import"./index-wbPc2JB2.js";import"./index-PdJvjei7.js";import"./index-B60S3ST-.js";import"./slots-DItSrxYQ.js";import"./index-DUeUyk1J.js";import"./index-CLj43KZG.js";import"./index--02ypIH8.js";import"./index-DwYknOof.js";import"./create-external-store-TtP3UJpK.js";import"./index-CtfwK49U.js";import"./client-M8dWfCpX.js";import"./index-DCbJJuRD.js";import"./index-B9YbBv51.js";import"./Dialog-BLkzqVIJ.js";import"./Heading-W07rcj93.js";import"./animation-DPpuh-li.js";import"./useControlledState-BknELBJC.js";import"./Collection-DJeef-Zq.js";import"./Autocomplete-B435Dd3I.js";import"./SelectionIndicator-BUEiF8qa.js";import"./SharedElementTransition-DKihjrkz.js";import"./useLocalizedStringFormatter-Cfkn4cyG.js";import"./useCollator-BNO2m8qX.js";import"./FocusScope-hB-Jv6jy.js";import"./useEvent-COeAjPQ0.js";import"./VisuallyHidden-DEY4NYBW.js";import"./index-0Umr2O2Q.js";import"./index-Cs9YjUtQ.js";import"./index-BPPc5JgW.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
