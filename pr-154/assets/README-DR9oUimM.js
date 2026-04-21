import{j as e}from"./iframe-D8ImQqDN.js";import{useMDXComponents as s}from"./index-BJBp_Eh7.js";import{M as p,A as a,a as r,S as n}from"./blocks-C8PW4roz.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DnrwhxOg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DhKpFnBt.js";import"./index-BjgHMelQ.js";import"./index-BfEC1ZRQ.js";import"./index-DrFu-skq.js";import"./index-Q-8kVBLI.js";import"./index-ows9R8UA.js";import"./clsx-DyAY42NZ.js";import"./index-D5BILIR5.js";import"./mergeProps-mLiiy4qc.js";import"./useObjectRef-D4n5no3x.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-wU14QOEq.js";import"./useFocusWithin-D7gQ2Wou.js";import"./platform-BULRNHlZ.js";import"./useFocusable-B8hWUBIw.js";import"./Collection-29AaBju1.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-BhcCogDd.js";import"./context-BYIK7GGO.js";import"./useControlledState-DVH7Ua8t.js";import"./useOverlayTriggerState-DeRPLyU6.js";import"./PortalProvider-DO8_v4Kn.js";import"./usePreventScroll-BMEghnPG.js";import"./useLabel-BTx35rXj.js";import"./VisuallyHidden-DuG-3ilm.js";import"./useField-RqMRNL9G.js";import"./useButton-BOlbtRuq.js";import"./index-GbA_okaa.js";import"./index-BUj2ExJI.js";import"./slots-7QzgPTMZ.js";import"./index-3t6uSisc.js";import"./index-CLj43KZG.js";import"./index-a_LVBN32.js";import"./index-CHodcVan.js";import"./create-external-store-TtP3UJpK.js";import"./index-BX8m0gUY.js";import"./client-DZH9bzPl.js";import"./index-CH7eSjS2.js";import"./index-DmiO8aCV.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
