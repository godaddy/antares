import{j as e}from"./iframe-DEw-TdOf.js";import{u as s,M as p,A as a,a as r,S as n}from"./blocks-BSTGhIOF.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-D2kOMLjb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CaEMLjby.js";import"./index-CkeVYGPm.js";import"./index-Ckl-4Q0v.js";import"./index-Cz2jo_96.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-25vlsd08.js";import"./Text-5t7drEsP.js";import"./SSRProvider-CAP1Mqfg.js";import"./useHover-CH4lCm_e.js";import"./useFocusRing-1iG2C5pN.js";import"./index-Cyg9RbmU.js";import"./index-Ahr5Rb6l.js";import"./index-BYc8CnrN.js";import"./slots-C_E0jgdW.js";import"./index-CWMUkFW8.js";import"./index-CLj43KZG.js";import"./index-D7d1rM6M.js";import"./index-DKrYlLVB.js";import"./create-external-store-TtP3UJpK.js";import"./index-BzIi0uDG.js";import"./client-Cra6LbMA.js";import"./index-CYmchdOf.js";import"./index-CsOjUyLt.js";import"./Dialog-Cq0tDIM4.js";import"./Heading-oKcDEJCs.js";import"./animation-BXAqUvsf.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-DxSfp2Cy.js";import"./useControlledState-CzZMfZAi.js";import"./Collection-D1p9HZFt.js";import"./Autocomplete-DAk3PfUc.js";import"./SelectionIndicator-DTooeBl5.js";import"./FocusScope-CwpDZ5dV.js";import"./useLocalizedStringFormatter-P8DDqZqu.js";import"./useEvent-qSQeqabS.js";import"./useLabels-cGlj4Wkz.js";import"./VisuallyHidden-DGdG0ySL.js";import"./index-BABEZUz1.js";import"./index-BAsSN5K6.js";import"./index-CwrYXU3_.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
