import{j as e}from"./iframe-CtknBCJw.js";import{useMDXComponents as p}from"./index-IUMuxDwR.js";import{M as s,A as a,a as r,S as n}from"./blocks-DD42ovag.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-NCpzb5sf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C_oYgr21.js";import"./index-B6r7ClV_.js";import"./index-kiltLzmJ.js";import"./index-DEf2WmMW.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BM0CrdHe.js";import"./Text-BFGTkpwS.js";import"./mergeProps-BhaF3G6H.js";import"./SSRProvider-B1Jd87nT.js";import"./useObjectRef-BTzxEMa5.js";import"./Hidden-Ce5uYZo-.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-C_0MbLxE.js";import"./usePress-bmlcUMaL.js";import"./utils-eszGU2Im.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CwoanA8z.js";import"./useHover-CiJJBoUA.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CG3zC0o9.js";import"./useFocusWithin-DgoJUWDF.js";import"./index-DmevLctv.js";import"./index-DYnGIiz1.js";import"./index---uQI-8K.js";import"./slots-Chd3PIZT.js";import"./index-YyVQwb1T.js";import"./index-CLj43KZG.js";import"./index-BFQ4KkYo.js";import"./index-C-dR45m5.js";import"./create-external-store-TtP3UJpK.js";import"./index-BNujzT-p.js";import"./client-Dbu_Jr8s.js";import"./index-Cstxg0Zd.js";import"./Dialog-C4M-c21C.js";import"./RSPContexts-BJ9l8zZx.js";import"./OverlayArrow-D8h8TYRE.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DSekB40Z.js";import"./useControlledState-128QTE7p.js";import"./context-C8_xjw1K.js";import"./Collection-SNCEoypw.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-D_7YcFLp.js";import"./FocusScope-Cah_qp6m.js";import"./SelectionIndicator-DF1CpuIt.js";import"./Overlay-DtAPShPa.js";import"./PortalProvider-CHpAEn0p.js";import"./useLocalizedStringFormatter-iOg5-aK0.js";import"./usePreventScroll-K1HiPRmD.js";import"./useLabels-D9xbdkvf.js";import"./VisuallyHidden-O57ItILp.js";import"./index-DKItyuDM.js";import"./index-C2BRzxwC.js";import"./index-lLOjhAGW.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
