import{j as e}from"./iframe-DMeWMqvu.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-kCgkkQ1K.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CgJ1jITc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DZRlTw-e.js";import"./index-C6Hl4j05.js";import"./index-DuKilYDX.js";import"./index-CN8G-aAi.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BkRvOXLc.js";import"./Text-BRlBFY6N.js";import"./mergeProps-CPUdsyFr.js";import"./SSRProvider-Dvb8qqj1.js";import"./useObjectRef-sfEgKMBU.js";import"./ProgressBar-D5nzdE8m.js";import"./Label-B18V5E1_.js";import"./Hidden-DCj6eMjD.js";import"./number-CB4zbwAz.js";import"./filterDOMProps-BNnC3YgW.js";import"./useLabel-MsDmy9vO.js";import"./context-Cat2IH8W.js";import"./useButton-aZ21KN24.js";import"./usePress-BF-l0K1A.js";import"./utils-B8MupFP1.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CJNPdddV.js";import"./useHover-mNxqkWjW.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-AIVO15sV.js";import"./useFocusWithin-D6smOP4S.js";import"./index-CZs_Cj0t.js";import"./index-DFnBat_i.js";import"./index-DqAbLnqp.js";import"./slots-CE4UU_dB.js";import"./index-BkyM_sSB.js";import"./index-CLj43KZG.js";import"./index-DuqOn3tX.js";import"./index-DbKl7OTm.js";import"./create-external-store-TtP3UJpK.js";import"./index-DKqQ9BAY.js";import"./client-Cim8xtu1.js";import"./index-OyIsP2D4.js";import"./Dialog-BpL-nZe7.js";import"./RSPContexts-BMYSZ2Cr.js";import"./OverlayArrow-D4_7nEQJ.js";import"./useOverlayTriggerState-Dqq8gOp5.js";import"./useControlledState-BRi38Qqp.js";import"./SelectionManager-BRl7mGmV.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-M14fzJ2U.js";import"./FocusScope-BDr1J8Q8.js";import"./SelectionIndicator-Ca1mupBz.js";import"./Overlay-2-SlXdgK.js";import"./PortalProvider-PMCc7nCl.js";import"./useLocalizedStringFormatter-CFlMG_29.js";import"./usePreventScroll-BRcv9Hp7.js";import"./VisuallyHidden-BHObmL5H.js";import"./index-Caaj3V9T.js";import"./index-CNaatXlE.js";import"./index-DNgiCLPs.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
