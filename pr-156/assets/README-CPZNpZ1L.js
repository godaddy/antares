import{j as e}from"./iframe-BNJjy6jl.js";import{useMDXComponents as s}from"./index-D6KpYzx_.js";import{M as p,A as a,a as r,S as n}from"./blocks-CHur8GXb.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BO3DN95F.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cdsg-nPo.js";import"./index-Bn3Wj_vO.js";import"./index-CzaSwRAK.js";import"./index-DrFu-skq.js";import"./index-Bh2r4izm.js";import"./index-BHj_NFbi.js";import"./clsx-CG7A5aLi.js";import"./index-JAGUJIpo.js";import"./mergeProps-27VOlTDT.js";import"./useObjectRef-C7yLI0cF.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-CnpHf_Xd.js";import"./useFocusWithin-D6Vj6gqw.js";import"./platform-BULRNHlZ.js";import"./useFocusable-zvgmnW4G.js";import"./Collection-DM4C5o3J.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-k3sfiWyX.js";import"./context-CC31jUcw.js";import"./useControlledState-B-POAR5o.js";import"./useOverlayTriggerState-CG-kJGmu.js";import"./PortalProvider-Ct18B3JN.js";import"./usePreventScroll-CvoR8vZk.js";import"./useLabel-BuswWZ9b.js";import"./VisuallyHidden-BMq6lowv.js";import"./useField-DVVd0jgv.js";import"./useButton-CBsElIPE.js";import"./index-BD65otfl.js";import"./index-CU-6Vky_.js";import"./slots-DmqtbNLS.js";import"./index-DYmZQVeq.js";import"./index-CLj43KZG.js";import"./index-g4ueCNhx.js";import"./index-C1EvrCzq.js";import"./create-external-store-TtP3UJpK.js";import"./index-javio_5h.js";import"./client-IZm8fYoQ.js";import"./index-MH9yW5QB.js";import"./index-qF2w-Ii3.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
`;function i(t){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{of:m,name:"Overview"}),`
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
`,e.jsx(o.p,{children:"Popover width is determined by its content, and it’s recommended to keep it under 400px."})]})}function ae(t={}){const{wrapper:o}={...s(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(i,{...t})}):i(t)}export{ae as default};
