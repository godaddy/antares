import{j as e}from"./iframe-LOWFan2Y.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-6w_qDm-T.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DmqveSi0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DU3I91oq.js";import"./index-KhT1gtm9.js";import"./index-CVcC0X-m.js";import"./index-CGB7g4PQ.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-GQfcPHwY.js";import"./Text-JWwkkN1B.js";import"./mergeProps-DVlUucGM.js";import"./SSRProvider-BvbLlUY4.js";import"./useObjectRef-DKSajwmg.js";import"./useButton-BbOVtDS8.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-BE8dAWyo.js";import"./useSyncRef-Ci64w3RW.js";import"./useGlobalListeners-C5ggiYow.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BvJCL5nc.js";import"./platform-DTNzKOdA.js";import"./usePress-B_ANiboC.js";import"./Hidden-HS0i9hRS.js";import"./useFocusRing-D2Ni-k3x.js";import"./useFocusWithin-BL7r36Qu.js";import"./index-BWgBptW-.js";import"./index-Df_dhi3j.js";import"./index-DPEV78TM.js";import"./slots-BIFIL6na.js";import"./index-D2wzKwyg.js";import"./index-CLj43KZG.js";import"./index-C1PfJKZK.js";import"./index-B-b3BhZD.js";import"./create-external-store-TtP3UJpK.js";import"./index-ibVWq5Km.js";import"./client-fvBFWmJF.js";import"./index-DGm30phA.js";import"./index-CIcKFcE9.js";import"./Dialog-EcY_WjZ_.js";import"./Heading-CIrRuC_8.js";import"./animation-DUDHXx5P.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-xiRjartw.js";import"./useControlledState-BV2pEkAY.js";import"./useCollection-DByzWhV4.js";import"./FocusScope-DHCtv43J.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-xMNV2GUO.js";import"./Autocomplete-CQvffpiw.js";import"./SelectionIndicator-BpCoj0NS.js";import"./useLocalizedStringFormatter-Mla6jK-v.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-DJFwLOAm.js";import"./VisuallyHidden-DIjkggN0.js";import"./index-mNVB522g.js";import"./index-DTvH6OAg.js";import"./index-Dj7fEMJi.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
