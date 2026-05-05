import{j as e}from"./iframe-COOHz61S.js";import{useMDXComponents as p}from"./index-DSxwjQyk.js";import{M as s,A as a,a as r,S as n}from"./blocks-ORDlmF0q.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DDtJ32jR.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8-rjpp1.js";import"./index-CL8R-hp8.js";import"./index-BgZMnLcl.js";import"./index-DrFu-skq.js";import"./index-BPG-qpUK.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-MlTjw36F.js";import"./Text-j77WVZst.js";import"./mergeProps-CvD8Zx5n.js";import"./SSRProvider-jcR4Waq-.js";import"./useObjectRef-C3TJRGct.js";import"./Hidden-oeRk8EQk.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DGqUpz7d.js";import"./usePress-Bw8MFNcz.js";import"./utils-C_h2oB66.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CkqPFF9l.js";import"./useHover-dEkRfzcP.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CPiO8coH.js";import"./useFocusWithin-BvUr4i88.js";import"./index-D6dwtD9s.js";import"./index-eVYDjNFU.js";import"./index-DKm7JoLF.js";import"./slots-CENhnci_.js";import"./index-DQ7w3rrP.js";import"./index-CLj43KZG.js";import"./index-C2EW5X_P.js";import"./index-BCkOfvL8.js";import"./create-external-store-TtP3UJpK.js";import"./index-CXQj3_gB.js";import"./client-BqoTDaMW.js";import"./index-B7ppccnt.js";import"./Dialog-C2NncmSo.js";import"./RSPContexts-Djn19cAs.js";import"./OverlayArrow-DxXVrk1U.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-D-FVsBJP.js";import"./useControlledState-CMthoDkV.js";import"./context-7mla9mDj.js";import"./Collection-aYsAaF9z.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-CjhyETAY.js";import"./FocusScope-CpniISg5.js";import"./SelectionIndicator-BWP8s5ZC.js";import"./Overlay-pU_ld_80.js";import"./PortalProvider-CnAZGGgV.js";import"./useLocalizedStringFormatter-D0ZP0cqg.js";import"./usePreventScroll-DKGME6IJ.js";import"./useLabels-DXfc0GiF.js";import"./VisuallyHidden-0IQoiMlg.js";import"./index-DjudMN8R.js";import"./index-CtvBltjw.js";import"./index--hg9wOhy.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function we(t={}){const{wrapper:o}={...p(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{we as default};
