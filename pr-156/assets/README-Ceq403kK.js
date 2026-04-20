import{j as e}from"./iframe-nLyyj1q5.js";import{useMDXComponents as s}from"./index-DHuAuATD.js";import{M as p,A as a,a as r,S as n}from"./blocks-CfchxA9Q.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CoLPm-3r.js";import"./preload-helper-PPVm8Dsz.js";import"./index-oZJ9SRuu.js";import"./index-Dv2WGlPh.js";import"./index-BAZV8ZSs.js";import"./index-DrFu-skq.js";import"./index-N4TISoNK.js";import"./index-DLHBd9_O.js";import"./clsx-CuMix7pL.js";import"./index-By6QT0nK.js";import"./mergeProps-Dj82BORV.js";import"./useObjectRef-DubBdRti.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-0fTm_PUV.js";import"./useFocusWithin-CFOmfl4c.js";import"./platform-BULRNHlZ.js";import"./useFocusable-mTJIlFtJ.js";import"./Collection-Bvegqbdj.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-CACl_wkS.js";import"./context-CsUWVWwl.js";import"./useControlledState-CHBvbE4n.js";import"./useOverlayTriggerState-CPEvPjmA.js";import"./PortalProvider-Dqb4y-d6.js";import"./usePreventScroll-BeRgKJfa.js";import"./useLabel-BzubZlS5.js";import"./VisuallyHidden-DvfX2Rpi.js";import"./useField-DBuo5eou.js";import"./useButton-DRT2sgsw.js";import"./index-BA94Y-c_.js";import"./index-DI_U8bO9.js";import"./slots-CvWYgalz.js";import"./index-BbgFlw9F.js";import"./index-CLj43KZG.js";import"./index-MheIbCkD.js";import"./index-D1qLz55W.js";import"./create-external-store-TtP3UJpK.js";import"./index-d6QA_jw4.js";import"./client-Dg6pgMDf.js";import"./index-BwsZtCmf.js";import"./index-BormZQiZ.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
