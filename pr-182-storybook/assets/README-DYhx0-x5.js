import{j as e}from"./iframe-FizPR52R.js";import{useMDXComponents as p}from"./index-CYlWwwKA.js";import{M as s,A as a,a as r,S as n}from"./blocks-JxoEOWeE.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-CdNyVjdY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BtUkGQ9d.js";import"./index-R0fMKMBX.js";import"./index-CrXPsRGT.js";import"./index-CoWHmGfX.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DsaOcjMy.js";import"./Text-3vU_939k.js";import"./mergeProps-9Am4NR0I.js";import"./SSRProvider-DDSV1Vs0.js";import"./useObjectRef-DnlaCVIn.js";import"./Hidden-MBZOZzXp.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DtixIwNP.js";import"./usePress-DeI64UOY.js";import"./utils-DkDEtTO9.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Dg3BZ-Kf.js";import"./useHover-hy5lvGvb.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CH-_2Iu_.js";import"./useFocusWithin-DNTW3fOk.js";import"./index-CAgUBCpC.js";import"./index-D27gNeKN.js";import"./index-cx_hU3e7.js";import"./slots-BooHO7jD.js";import"./index-DX0Fy3Ol.js";import"./index-CLj43KZG.js";import"./index-tjD8p1qT.js";import"./index-B2SL3SGU.js";import"./create-external-store-TtP3UJpK.js";import"./index-BuOcoV4x.js";import"./client-BidA5Bnt.js";import"./index-mvHbFogg.js";import"./Dialog-3vZxsTiZ.js";import"./RSPContexts-HdXEig3x.js";import"./OverlayArrow-DyzFkNzp.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BuGwh_Se.js";import"./useControlledState-BZKzWP2Y.js";import"./context-Bcbf-1VZ.js";import"./Collection-BONqysM4.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-DMpVQSCA.js";import"./FocusScope-D8HqnHKn.js";import"./SelectionIndicator-CyQ8yf_G.js";import"./Overlay-LosBpD4F.js";import"./PortalProvider-Cluxesgh.js";import"./useLocalizedStringFormatter-CBj1XN80.js";import"./usePreventScroll-OB1b3WuO.js";import"./useLabels-Dv68jEKz.js";import"./VisuallyHidden-QXylZGA2.js";import"./index-fOJowGxv.js";import"./index-uLcaEJqG.js";import"./index-DvFlFjnI.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
