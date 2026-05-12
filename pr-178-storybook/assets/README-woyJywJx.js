import{j as e}from"./iframe-76ZJl6Sm.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-5vf65Rnl.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-F-8HCc8R.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CepoJkfN.js";import"./index-C94UrSgR.js";import"./index-tI0Vf8Ni.js";import"./index-Qdbh4WMX.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CaXZyQwe.js";import"./Text-BHqjPlkD.js";import"./mergeProps-DB1EJkc-.js";import"./SSRProvider-C2ws8vu0.js";import"./useObjectRef-DpMUogNx.js";import"./Hidden-CfzsKmj9.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-BcE7mlmE.js";import"./usePress-DenPLAMu.js";import"./utils-l2Kr7UiU.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-ybiWiwot.js";import"./useHover-BpOuNX0f.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-ClzF2n3g.js";import"./useFocusWithin-CYGFz0qK.js";import"./index-Kv9z5GMr.js";import"./index-CJjaoyOF.js";import"./index-c3r9FFlw.js";import"./slots-DsU3HOiL.js";import"./index-D8tMiz_9.js";import"./index-CLj43KZG.js";import"./index-BO4VPIxQ.js";import"./index-COFD3liK.js";import"./create-external-store-TtP3UJpK.js";import"./index-BknxiPvX.js";import"./client-rNtbjS2r.js";import"./index-D1HBHQ_f.js";import"./Dialog-c-AMuIf3.js";import"./RSPContexts-zsHw3MHS.js";import"./OverlayArrow-VVX23sAF.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-j_PrQqZM.js";import"./useControlledState-BkHNu7dt.js";import"./context-BCkQnn7I.js";import"./SelectionManager-CKGO8plw.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-DOAZbXC1.js";import"./FocusScope-Dp1OCHkN.js";import"./SelectionIndicator-ISwdNbIv.js";import"./Overlay-DdkeYBC_.js";import"./PortalProvider-D7eRyE--.js";import"./useLocalizedStringFormatter-CITUulpg.js";import"./usePreventScroll-EYDqWt7R.js";import"./useLabels-B2L03uzi.js";import"./VisuallyHidden-BS1PkIwB.js";import"./index-E41mhxLg.js";import"./index-DtRecE6x.js";import"./index-C18KNvmi.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
