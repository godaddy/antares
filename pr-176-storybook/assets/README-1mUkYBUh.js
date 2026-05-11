import{j as e}from"./iframe-B4Nw7FJe.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-_qyMzwgH.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BlDAKNgs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BCz66L0m.js";import"./index-DhvjJc79.js";import"./index-DnzQElaE.js";import"./index-BKfZUUY_.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DhdssX64.js";import"./Text-CUA99nQZ.js";import"./mergeProps-DddZCFgK.js";import"./SSRProvider-IKK3NN28.js";import"./useObjectRef-CjrTCwNB.js";import"./Hidden-u5GxFwUz.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BYakM6kh.js";import"./usePress-CNCeorNG.js";import"./utils-DYLmDJPz.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-D60pn2Rb.js";import"./useHover-CvybKbv2.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-BlFi-2Bm.js";import"./useFocusWithin-D349eWt8.js";import"./index-D8tZbbqk.js";import"./index-B2N9NpsK.js";import"./index-f5EGyTsX.js";import"./slots-Cc1BryBQ.js";import"./index-B3NqsZqp.js";import"./index-CLj43KZG.js";import"./index-BECShO0v.js";import"./index-DbXVjEal.js";import"./create-external-store-TtP3UJpK.js";import"./index-D6pAaxot.js";import"./client-B_sZDtGU.js";import"./index-BmB21bNk.js";import"./Dialog-CqGhv53U.js";import"./RSPContexts-B9Gje2qd.js";import"./OverlayArrow-Wtb1--VA.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-CWGcIYaM.js";import"./useControlledState-M__Jll5j.js";import"./context-B1l6R8jz.js";import"./SelectionManager-CnL5sjwy.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-D0uaNOoU.js";import"./FocusScope-93gwtQDU.js";import"./SelectionIndicator-BJLDob-X.js";import"./Overlay-DgjnuKch.js";import"./PortalProvider-B1bKyloP.js";import"./useLocalizedStringFormatter-CYfvy3k0.js";import"./usePreventScroll-Dpj0O-UA.js";import"./useLabels-D6zq3p9j.js";import"./VisuallyHidden-D8jitt-e.js";import"./index-CUuL9TT_.js";import"./index-B6dGqv0q.js";import"./index-zKIw8Rv0.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
