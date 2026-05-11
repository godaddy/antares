import{j as e}from"./iframe-D3IkG1Ed.js";import{useMDXComponents as p}from"./index-Ddicd04g.js";import{M as s,A as a,a as r,S as n}from"./blocks-FKYUA1FL.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DXWn1uDa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CSLt56KL.js";import"./index-BSPbgUvt.js";import"./index-DyaOTb0A.js";import"./index-Da-5PjO7.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-C4nxKE8_.js";import"./Text-BC_MRJIf.js";import"./mergeProps-C5YhgRrt.js";import"./SSRProvider-CjQrmtNM.js";import"./useObjectRef-BwsbJwwA.js";import"./Hidden-DwtDAlKb.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-C_3FTBON.js";import"./usePress-CWIRqmhV.js";import"./utils-C3T-bzyn.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-DRETT1D-.js";import"./useHover-COvvVmfD.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-C2ZHOC48.js";import"./useFocusWithin-BR2EooPo.js";import"./index-BKRPVQLH.js";import"./index-6sybX5GN.js";import"./index-CGFnYoWc.js";import"./slots-Bkz2mAOP.js";import"./index-DvPJTfr7.js";import"./index-CLj43KZG.js";import"./index-DadB-KbG.js";import"./index-DE1V9KSX.js";import"./create-external-store-TtP3UJpK.js";import"./index-CV-SUfJI.js";import"./client-CPvcHEwj.js";import"./index-DFQaM6IX.js";import"./Dialog-goMZMicr.js";import"./RSPContexts-BIJLWCzP.js";import"./OverlayArrow-omilFRHP.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-COkbV5tu.js";import"./useControlledState-CpByu9cE.js";import"./context-CweBjKN6.js";import"./Collection-DC98RAfN.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-Uiw8Edcy.js";import"./FocusScope-BUqUvxc2.js";import"./SelectionIndicator-dWtS9m60.js";import"./Overlay-B_YC76Ij.js";import"./PortalProvider-FU9mMSgY.js";import"./useLocalizedStringFormatter-FkYwjXL7.js";import"./usePreventScroll-ay0H1jYu.js";import"./useLabels-BuyJngCw.js";import"./VisuallyHidden-C3jyQeKq.js";import"./index-2-tMoyXX.js";import"./index-ytT8Ai6N.js";import"./index-CvWDc_MF.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function Ce(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{Ce as default};
