import{j as e}from"./iframe-Cobng3kW.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BEuLoQbf.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-C4oqAogv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Do2wpqFt.js";import"./index-DCuVUat6.js";import"./index-CkzLLGzI.js";import"./index-DZf6cmSL.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Cp5ygW0x.js";import"./Text-DjYeNfA9.js";import"./mergeProps-CqlBgEfY.js";import"./SSRProvider-CRxxJPAA.js";import"./useObjectRef-DVUZfbLs.js";import"./Hidden-CxBKJg34.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DawZrH6r.js";import"./usePress-JDIfTqZI.js";import"./utils-DYHHIbWW.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-tB_4nUuW.js";import"./useHover-DgdCgDpP.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-BQbh0Wsj.js";import"./useFocusWithin-O7Ny1nb5.js";import"./index-DUcIuAlo.js";import"./index-Cblgnhv_.js";import"./index-D0MDYfGE.js";import"./slots-BlFL7XUI.js";import"./index-CxaQNeJr.js";import"./index-CLj43KZG.js";import"./index-awrPXsZT.js";import"./index-CfVKM-5I.js";import"./create-external-store-TtP3UJpK.js";import"./index-BMSPfXKm.js";import"./client-BYApItke.js";import"./index-BybZAvEO.js";import"./Dialog-CLi8ayhn.js";import"./RSPContexts-24IILzY-.js";import"./OverlayArrow-D6zAXh7o.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-hidboFq7.js";import"./useControlledState--tfYuSYK.js";import"./context-BMNNJbem.js";import"./SelectionManager-BIiiMolw.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-CSjTnt7F.js";import"./FocusScope-B3aVYN8b.js";import"./SelectionIndicator-Dv4BzcJK.js";import"./Overlay-L_2jMLU_.js";import"./PortalProvider-CbR0hdFW.js";import"./useLocalizedStringFormatter-Bzg8pIFp.js";import"./usePreventScroll-BFmiyPPa.js";import"./useLabels-Co8cMafA.js";import"./VisuallyHidden-C1pG2V7E.js";import"./index-BTxBXy7B.js";import"./index-DbwBwFQU.js";import"./index-BL_1z9-T.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
