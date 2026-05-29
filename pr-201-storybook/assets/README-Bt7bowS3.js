import{j as e}from"./iframe-D6HTak4u.js";import{u as s,M as p,A as a,a as r,S as n}from"./blocks-BwNyZ0b0.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BPEkr90f.js";import"./preload-helper-PPVm8Dsz.js";import"./index-hYHMmwYB.js";import"./index-RE7AHrtp.js";import"./index-BiPjCpEr.js";import"./index-BqGjgdB6.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-C8dANuin.js";import"./Text-DJuP2YZC.js";import"./SSRProvider-nBLG3x_m.js";import"./useHover-BtfOAly6.js";import"./useFocusRing-CYdUdSHL.js";import"./index-16YESJe7.js";import"./index-CI0n09DI.js";import"./index-K0CKyN1-.js";import"./slots-CzBycn4Z.js";import"./index-BmcqsQUY.js";import"./index-CLj43KZG.js";import"./index-CcFWwSIB.js";import"./index-NaZ3im6N.js";import"./create-external-store-TtP3UJpK.js";import"./index--6DAWyVV.js";import"./client-CTjsrR30.js";import"./index-DZtkPSPc.js";import"./index-CBVPE8hK.js";import"./Dialog-BcdtG6xc.js";import"./Heading-DJH-Om5X.js";import"./animation-D08ueQyN.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-B8-BotRM.js";import"./useControlledState-D5T2Ll1M.js";import"./Collection-myNndPgT.js";import"./Autocomplete-DaUeBQ6N.js";import"./SelectionIndicator-Dp49oXV0.js";import"./SharedElementTransition-BLG2mshX.js";import"./useLocalizedStringFormatter-DFCg_v4T.js";import"./useCollator-BLAjK8eD.js";import"./FocusScope-BF6w77X_.js";import"./useEvent-DdBdrb4Y.js";import"./useLabels-2AMeHmEl.js";import"./VisuallyHidden-T5JJx_1R.js";import"./index-Dv7vAHz4.js";import"./index-CGWIzplU.js";import"./index-blYXJ2V2.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function ce(t={}){const{wrapper:o}={...s(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{ce as default};
