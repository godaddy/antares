import{j as e}from"./iframe-BtHzjYcI.js";import{useMDXComponents as p}from"./index-CLKs1xbZ.js";import{M as s,A as a,a as r,S as n}from"./blocks-BxXPuziF.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-C3ckPEY8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Ck2LSSP6.js";import"./index-COlT4oPS.js";import"./index-CDt-3ff_.js";import"./index-DrFu-skq.js";import"./index-bLdXAVhk.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-C7Mi86Pj.js";import"./Text-BFJu9k_M.js";import"./mergeProps-BGFRBs5B.js";import"./SSRProvider-9tPrGxz2.js";import"./useObjectRef-COYoY9kP.js";import"./Hidden-yBpG_raJ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-C0lqPAwM.js";import"./usePress-BXFqzKK2.js";import"./utils-B_hlVA_k.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CkU66NZ-.js";import"./useHover-DqHTFJS9.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-Ot3VQ3DD.js";import"./useFocusWithin-Ce1ka9ru.js";import"./index-DmkAtXR1.js";import"./index-v3rx6DOq.js";import"./index-DbYXsI-Z.js";import"./slots-IjWqUjYo.js";import"./index-Dow0X6o8.js";import"./index-CLj43KZG.js";import"./index-BwYeaeKW.js";import"./index-Bsocugkd.js";import"./create-external-store-TtP3UJpK.js";import"./index-loCUF_y9.js";import"./client-BLbFwf5G.js";import"./index-oUurfHVV.js";import"./Dialog-DAYWYDck.js";import"./RSPContexts-G2KlrW4U.js";import"./OverlayArrow-DxEOE6oy.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C9ES6tYQ.js";import"./useControlledState-CaWnOMp9.js";import"./context-BE2fzI-5.js";import"./Collection-Cr3L58vN.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-DbGElT1P.js";import"./FocusScope-DsqqaeZj.js";import"./SelectionIndicator-CaYj5iIf.js";import"./Overlay-vMNHg7fu.js";import"./PortalProvider-CiYORPFm.js";import"./useLocalizedStringFormatter-DEuE1DoB.js";import"./usePreventScroll-XtWfEUfr.js";import"./useLabels-CYk9BbIa.js";import"./VisuallyHidden-XkCCCN5t.js";import"./index-Bz3qRe3y.js";import"./index-D8PcD0Fq.js";import"./index-BC27msqS.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
