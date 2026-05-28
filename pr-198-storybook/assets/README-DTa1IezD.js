import{j as e}from"./iframe-DmiRE7qa.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-4HoTZ4xV.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-D-vpDtTg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HXon4F8e.js";import"./index-DBQqHZtN.js";import"./index-BUAg2Daw.js";import"./index-BfzrYrDH.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Y2pTNGVh.js";import"./Text-DpzHZfOO.js";import"./mergeProps-QySd-oC7.js";import"./SSRProvider-D2g4jnfw.js";import"./useObjectRef-ekulvfBp.js";import"./useButton-DMnaWDKG.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-bmjOZU33.js";import"./useSyncRef-DjMyMTRF.js";import"./useGlobalListeners-D9La4Woi.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-CKjwchdo.js";import"./platform-DTNzKOdA.js";import"./usePress-l1SMIFAs.js";import"./Hidden-7xW8MSYS.js";import"./useFocusRing-shQxt0l4.js";import"./useFocusWithin-Bs8zEO7X.js";import"./index-Bazi-dWy.js";import"./index-DP7YLjNp.js";import"./index-2ZycoCSp.js";import"./slots-CmOFq8K4.js";import"./index-KG00WzB3.js";import"./index-CLj43KZG.js";import"./index-CZCoa50i.js";import"./index-CX9cTZJB.js";import"./create-external-store-TtP3UJpK.js";import"./index-BUMOXvhi.js";import"./client-BM-iFbBx.js";import"./index-BMNnrs3A.js";import"./index-B0pqoCtY.js";import"./Dialog-ClEO-nBg.js";import"./Heading-CHo53ZlO.js";import"./animation-CDKMfv_9.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-DL_Gx_k9.js";import"./useControlledState-Hm1wgVcN.js";import"./useCollection-D0Q3Bgf7.js";import"./FocusScope-DM-RbvCM.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-O2vxX-ml.js";import"./Autocomplete-CQaDwWNV.js";import"./SelectionIndicator-C5Ny9Zm2.js";import"./useLocalizedStringFormatter-Yow-OibY.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-CoiGC6rs.js";import"./VisuallyHidden-CRLPao7a.js";import"./index-C-bpvVJ-.js";import"./index-Bc3HCaLQ.js";import"./index-D85hK-VA.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
