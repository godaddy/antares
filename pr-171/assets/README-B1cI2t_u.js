import{j as e}from"./iframe-B7adIt4p.js";import{useMDXComponents as p}from"./index-BpYuPdzq.js";import{M as s,A as a,a as r,S as n}from"./blocks-BpSf9iY2.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Bd1GV6l9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrWL09UE.js";import"./index-CpxkLCwv.js";import"./index-B4E9NSlz.js";import"./index-DifdWp9_.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-D1SUW062.js";import"./Text-BGavml9e.js";import"./mergeProps-DFFwVixG.js";import"./SSRProvider-IcQ99Sp3.js";import"./useObjectRef-B_4020PF.js";import"./Hidden-XeVk2SMu.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-CII8BKTj.js";import"./usePress-CWoj0qN3.js";import"./utils-D1UQREc7.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BNT6PNbI.js";import"./useHover-CyDzIKTr.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-Bd_5s1_K.js";import"./useFocusWithin-C5GIruIL.js";import"./index-L0uC3Yxt.js";import"./index-C-JhgCSp.js";import"./index-DnkbEfAw.js";import"./slots-IoEVhZRK.js";import"./index-XoP-1byw.js";import"./index-CLj43KZG.js";import"./index-B23WjrDR.js";import"./index-BqpBP18P.js";import"./create-external-store-TtP3UJpK.js";import"./index-Du1c4_ol.js";import"./client-DYHKEtUF.js";import"./index-CJ-mHq4z.js";import"./Dialog-CNAnCm8H.js";import"./RSPContexts-D6D-SAha.js";import"./OverlayArrow-CyWI_WZq.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DWQnoz9l.js";import"./useControlledState-CC_QP3H0.js";import"./context-Dz7BRnkf.js";import"./Collection-H49l4okd.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-DLs7Jno8.js";import"./FocusScope-DBQEuxjY.js";import"./SelectionIndicator-BHIR5xEL.js";import"./Overlay-DKkljiAt.js";import"./PortalProvider-7z1R81hk.js";import"./useLocalizedStringFormatter-CQoea6sY.js";import"./usePreventScroll-ZVQcKBLU.js";import"./useLabels-9Xxk_mSF.js";import"./VisuallyHidden-CuJZc7QS.js";import"./index-BRVLJI5y.js";import"./index-s8JGKBSo.js";import"./index-Bo8AkujP.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
