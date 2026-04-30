import{j as e}from"./iframe-DY2JU6yu.js";import{useMDXComponents as p}from"./index-vMp9Gci6.js";import{M as s,A as a,a as r,S as n}from"./blocks-DR5RAoBv.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CQjYK92C.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6XwFIy4.js";import"./index-DOyM4hZy.js";import"./index-CwLu9-2K.js";import"./index-BkZegLaG.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-bNsn8rWX.js";import"./Text-CuNCs2V4.js";import"./mergeProps-C4ZhBcln.js";import"./SSRProvider-C-OpFMFK.js";import"./useObjectRef-zzrnZ1na.js";import"./Hidden-Gp7kCxcN.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-9oma3LrX.js";import"./usePress-j1Fxg5-8.js";import"./utils-B0-Er-Yt.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-B8I3Zy39.js";import"./useHover-CImOzyq3.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-DvLRb-b9.js";import"./useFocusWithin-gU5DAQNu.js";import"./index-drBTCp_f.js";import"./index-BVvKlqD-.js";import"./index-DnQR_Im8.js";import"./slots-DDsmaVJZ.js";import"./index-_HKqXvKO.js";import"./index-CLj43KZG.js";import"./index-Dgiy7wye.js";import"./index-CKTcfS89.js";import"./create-external-store-TtP3UJpK.js";import"./index-B-SynIdX.js";import"./client-DVyTIL9r.js";import"./index-Dz5rhHtw.js";import"./Dialog-PvK-A-fb.js";import"./RSPContexts-rDESEmma.js";import"./OverlayArrow-CZ1gDStX.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-C7b-QO0A.js";import"./useControlledState-D_pE0pmN.js";import"./context-vYBYcdXT.js";import"./Collection-zt9j8Xe-.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-B6eUTK6P.js";import"./FocusScope-DKXJB_Eo.js";import"./SelectionIndicator-CSyndG_Z.js";import"./Overlay-CIs1-W1s.js";import"./PortalProvider-CQTXm-n5.js";import"./useLocalizedStringFormatter-hmFvfFVq.js";import"./usePreventScroll-CgzG3j4p.js";import"./useLabels-DlqZpT5-.js";import"./VisuallyHidden-Chzzouic.js";import"./index-CsIqp9IP.js";import"./index-shB1u9zO.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
