import{j as e}from"./iframe-DeXiyfMB.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BXOBYZRj.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BKg0tj67.js";import"./preload-helper-PPVm8Dsz.js";import"./index-TMczvKaK.js";import"./index-dfyW3KLo.js";import"./index-D4mCAJzZ.js";import"./index-m649qgJh.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-g3jjR73u.js";import"./Text-C9yOT9p-.js";import"./mergeProps-BaS9iYbw.js";import"./SSRProvider-DUtn8zjQ.js";import"./useObjectRef-Bxf23Pua.js";import"./Hidden-Ck5AOEAW.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DCEYdtwt.js";import"./usePress-BbX1LbM9.js";import"./utils-D7AFYupy.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-DzwAdZs1.js";import"./useHover-Dl3BhctA.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DlRMSfJO.js";import"./useFocusWithin-De09632P.js";import"./index-rFsaYL9I.js";import"./index-zCdyAS8H.js";import"./index-Cuyh58DZ.js";import"./slots-Dpv8LmxQ.js";import"./index-s8s87Mgm.js";import"./index-CLj43KZG.js";import"./index-CsJ3TMWk.js";import"./index-DnzHmkIe.js";import"./create-external-store-TtP3UJpK.js";import"./index-CbpqdpDo.js";import"./client-9Bk7odlW.js";import"./index-uzZNGmOT.js";import"./Dialog-2TyhKqYH.js";import"./RSPContexts-CiL4bYRM.js";import"./OverlayArrow-CL-WOK5y.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-CzcV3j9a.js";import"./useControlledState-CqByx0hQ.js";import"./context--1mDk2p0.js";import"./SelectionManager-B5yUZrU6.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-D40LNOWm.js";import"./FocusScope-B4l6GlI0.js";import"./SelectionIndicator-CiCPmy3V.js";import"./Overlay-BqVR0xG-.js";import"./PortalProvider-DLHzMp3N.js";import"./useLocalizedStringFormatter-CGyPdY2M.js";import"./usePreventScroll-D2oR-Xbg.js";import"./useLabels-DG8OTY7w.js";import"./VisuallyHidden-xjfQs9qi.js";import"./index-PiBqu-RM.js";import"./index-C8SkPPxK.js";import"./index-PpUBwfYL.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
