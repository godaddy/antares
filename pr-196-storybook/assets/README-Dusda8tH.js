import{j as e}from"./iframe-BrCWfZoc.js";import{u as s,M as p,A as a,a as r,S as n}from"./blocks-BJ7xtxte.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DPNMPfN-.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CidWU8hZ.js";import"./index-CQRT0Z7Y.js";import"./index-BFVhRT8Y.js";import"./index-BMoC4eHL.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-B4gIAPp9.js";import"./Text-BzEoHzKh.js";import"./SSRProvider-B6ED-50m.js";import"./ProgressBar-Ba7l4f7c.js";import"./useLabel-CQVvIyxw.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-B3joJ3aH.js";import"./number-P4c4HRxZ.js";import"./useHover-COxWwP8B.js";import"./useFocusRing-CfKvC38a.js";import"./index-Dv6fCFw2.js";import"./index-xGUJBnay.js";import"./index-D-t-ZSur.js";import"./slots-BM-yl3OY.js";import"./index-nzfVC07q.js";import"./index-CLj43KZG.js";import"./index-DLSzloeq.js";import"./index-O84SOEUc.js";import"./create-external-store-TtP3UJpK.js";import"./index-dP_biUZY.js";import"./client-DvSQ5WUr.js";import"./index-BsuQXu0s.js";import"./index-CGlJs3MZ.js";import"./Dialog-Bt75wEyJ.js";import"./Heading-BV_jfC1i.js";import"./animation-vucxQYKf.js";import"./useControlledState-BJxWvvAH.js";import"./Collection-BS_E-OZa.js";import"./Autocomplete-DWuzxzuV.js";import"./SelectionIndicator-D-P35tnQ.js";import"./FocusScope-CpxxOKxW.js";import"./useLocalizedStringFormatter-lds6N2CV.js";import"./useEvent-Dj_7MXIR.js";import"./VisuallyHidden-CtrFzO-a.js";import"./index-BB3cyknK.js";import"./index-C3DRiWDZ.js";import"./index-DQuPTtO-.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
