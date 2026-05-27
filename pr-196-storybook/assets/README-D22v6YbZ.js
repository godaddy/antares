import{j as e}from"./iframe-BipHecsa.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BpaAODfY.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-lkvZfwLC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B0u55k7n.js";import"./index-SLLkWFQx.js";import"./index-CHIkQ4Ax.js";import"./index-AlJF_K6N.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Bnw1Bj29.js";import"./Text-BraK1FW1.js";import"./mergeProps-DB8RTHkp.js";import"./SSRProvider-BTsV7JKa.js";import"./useObjectRef-u-tGh12i.js";import"./useButton-CkEXDgdw.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-BbAXfnoQ.js";import"./useSyncRef-JcQkHO2R.js";import"./useGlobalListeners-DPw_UEd0.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-CFJJur9S.js";import"./platform-DTNzKOdA.js";import"./usePress-DlwmkORq.js";import"./Hidden-ZFvCwzYE.js";import"./useFocusRing-C3GfOd7w.js";import"./useFocusWithin-BVjQAR2Q.js";import"./index-B-53hLb3.js";import"./index-iuo5V5vj.js";import"./index-B1Xg8qXC.js";import"./slots-CeDAtiCB.js";import"./index-DQVG4xCR.js";import"./index-CLj43KZG.js";import"./index-CXJBjsnX.js";import"./index-BpMdXB9i.js";import"./create-external-store-TtP3UJpK.js";import"./index-BNbsrJxS.js";import"./client-DoQCOMx0.js";import"./index-CX6oRoZ0.js";import"./index-BGFqgRF4.js";import"./Dialog-Dhm8nn28.js";import"./Heading-C5MfjqXE.js";import"./animation-COcyhtn-.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-CPXuPy2Y.js";import"./useControlledState-Cs3bl_W8.js";import"./useCollection-9PCv-_TE.js";import"./FocusScope-CWAA6aus.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-JaM28z9t.js";import"./Autocomplete-DKAi5haZ.js";import"./SelectionIndicator-DE7Gozsm.js";import"./useLocalizedStringFormatter-CpJCobne.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-VjB46koK.js";import"./VisuallyHidden-BCFXjK5W.js";import"./index-BrS_oZqW.js";import"./index-CI-mtv50.js";import"./index-B1PlzYmd.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
