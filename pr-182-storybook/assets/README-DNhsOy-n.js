import{j as e}from"./iframe-DIAwzCO3.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CcBC7He3.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-B_O5w9WI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CO4KPljC.js";import"./index-BLfSbdq3.js";import"./index-DuMbExF9.js";import"./index-D5ibWryq.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BfQP15j9.js";import"./Text-V7HExCSE.js";import"./mergeProps-C5WBmTZV.js";import"./SSRProvider-Dt0RIWaR.js";import"./useObjectRef-8YAUSJec.js";import"./useButton-ooQiX8oT.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-CgiaPvxu.js";import"./useSyncRef-UOnEDASh.js";import"./useGlobalListeners-BE6zjndU.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-CgKM_m_9.js";import"./platform-DTNzKOdA.js";import"./usePress-Bg1wRsmz.js";import"./Hidden-DaOKn7WS.js";import"./useFocusRing-eV4V4m3z.js";import"./useFocusWithin-jt8MvBWm.js";import"./index-BQngKyee.js";import"./index-BCahV2RN.js";import"./index-DIiduHah.js";import"./slots-C41QIS9P.js";import"./index-D6xFv2gW.js";import"./index-CLj43KZG.js";import"./index-x3mQS3SG.js";import"./index-ivSKdqcD.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dk9gnjrD.js";import"./client-fwZ1MCKJ.js";import"./index-B8F2u-uD.js";import"./index-CuKGE0kW.js";import"./Dialog-CQVGXzxy.js";import"./Heading-AILz44e0.js";import"./animation-AfEe1dZ4.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-icTMA9os.js";import"./useControlledState-BQtmbujw.js";import"./useCollection-CCsHY4D4.js";import"./FocusScope-wPEX23NU.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-cjrmJqU4.js";import"./Autocomplete-BbA2TYLw.js";import"./SelectionIndicator-LAxmSRBQ.js";import"./useLocalizedStringFormatter-DpRp5k6w.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-CbELC4Al.js";import"./VisuallyHidden-Cezq0oio.js";import"./index-BnJXbg-K.js";import"./index-D4QeFZwO.js";import"./index-DZCwEWf2.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function Te(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{Te as default};
