import{j as e}from"./iframe-B7T5JP5V.js";import{useMDXComponents as p}from"./index-DePaf8Jy.js";import{M as s,A as a,a as r,S as n}from"./blocks-Bk7QREwH.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-BtvVxqZ3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BYgYdQsS.js";import"./index-CAEJ_Xno.js";import"./index-BdAGSb15.js";import"./index-DnWbClJO.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DkFl7FGU.js";import"./Text-B-v_oaRK.js";import"./mergeProps-0UgpPvdG.js";import"./SSRProvider-CjHoC05b.js";import"./useObjectRef-CP9GRT_p.js";import"./Hidden-Do3CxAsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-44EDFkgt.js";import"./usePress-CzFgKW8R.js";import"./utils-COFQEywW.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-XsSus9dj.js";import"./useHover-CbUkXchC.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CXUOxw97.js";import"./useFocusWithin-COrQIuyK.js";import"./index-DJiIj1IV.js";import"./index-Df5-bfyk.js";import"./index-Bwgt-6b6.js";import"./slots-B9LmtyAi.js";import"./index-WqDfzGyf.js";import"./index-CLj43KZG.js";import"./index-D2F0R-3K.js";import"./index-CdSrwnD_.js";import"./create-external-store-TtP3UJpK.js";import"./index-B8f6_Ihb.js";import"./client-CtN9lC1q.js";import"./index-CgnGW5p0.js";import"./Dialog-B1mAZQX1.js";import"./RSPContexts-8TQmi5zG.js";import"./OverlayArrow-CAGr9Pjb.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-DuuRmdg-.js";import"./useControlledState-8Bu98mcU.js";import"./context-CHX0tjp3.js";import"./Collection-DXGlN8qq.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-UtHv4G8i.js";import"./FocusScope-pSREPLKl.js";import"./SelectionIndicator-BGabFa32.js";import"./Overlay-DwfHVRAN.js";import"./PortalProvider-CT6SEt3j.js";import"./useLocalizedStringFormatter-D1FYCPWc.js";import"./usePreventScroll-CfwgXmgm.js";import"./useLabels-_3TUIeAh.js";import"./VisuallyHidden-C2a3ku47.js";import"./index-PfxJDWHb.js";import"./index-BwLpfIVw.js";import"./index-Cj1b3wPa.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
