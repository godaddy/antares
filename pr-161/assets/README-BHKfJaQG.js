import{j as e}from"./iframe-BzZxkJHh.js";import{useMDXComponents as p}from"./index-BG78Rhs0.js";import{M as s,A as a,a as r,S as n}from"./blocks-CBC7L--g.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-c_Pf5HXZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CB_CJHXo.js";import"./index-K16ht35y.js";import"./index-vijGARFj.js";import"./index-DrFu-skq.js";import"./index-CPo4NUdV.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-HoR6NQ0R.js";import"./Text-CeG0Ew0Z.js";import"./mergeProps-28cNEgsO.js";import"./SSRProvider-DyMhMh1u.js";import"./useObjectRef-C7CNA7E-.js";import"./Hidden-PBc_CkiY.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-icYV5DAb.js";import"./usePress-CCDrbsLf.js";import"./utils-DRDJDvEN.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-QqXRLICz.js";import"./useHover-Fk-CL6Mx.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BxEGW1D1.js";import"./useFocusWithin-CUSZUBI7.js";import"./index-BhqhXjVp.js";import"./index-C7mgXPWz.js";import"./index-BMEtqlua.js";import"./slots-CWuerMMl.js";import"./index-GJlDFNaL.js";import"./index-CLj43KZG.js";import"./index-JkFgBvGp.js";import"./index-BQluTKW1.js";import"./create-external-store-TtP3UJpK.js";import"./index-DH0to3Zo.js";import"./client-J8JtDQ7e.js";import"./index-BWz_sn9n.js";import"./Dialog-B0gF94bS.js";import"./RSPContexts-CdMMEcIS.js";import"./OverlayArrow-CmYl7fU-.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-B-K6_6qS.js";import"./useControlledState-Bf0edbPw.js";import"./context-CNTLQEYn.js";import"./Collection-CyOHXt-i.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-CDFJuKYJ.js";import"./FocusScope-DtqUHSaA.js";import"./SelectionIndicator-D-heyOcB.js";import"./Overlay-BEIDQ3P7.js";import"./PortalProvider-BgaMyWZy.js";import"./useLocalizedStringFormatter-BYd4sXju.js";import"./usePreventScroll-CS7hgbJp.js";import"./useLabels-BuuZMFc3.js";import"./VisuallyHidden-1Ybj6NA2.js";import"./index-CrcNB5Ru.js";import"./index-CViNb-XL.js";import"./index-DSd36JmS.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
