import{j as e}from"./iframe-ClWTPl5x.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-DG6eLz6l.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-Dt3MzRZY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GsngMiyr.js";import"./index-DUACdkfR.js";import"./index-BbqJLgpW.js";import"./index-C-Rv7Pva.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-JYLAdiGx.js";import"./Text-BH8NBewb.js";import"./mergeProps-BJpXx4bB.js";import"./SSRProvider-CfbBhIjL.js";import"./useObjectRef-Bmub13Bc.js";import"./useButton-Ii2SQuDq.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-DEJIEQ8h.js";import"./useEffectEvent-BVbYnPFx.js";import"./useGlobalListeners-BnImAHxc.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BR_Y-GQi.js";import"./platform-DTNzKOdA.js";import"./usePress-D6HH4oj5.js";import"./Hidden-DuHvqV4_.js";import"./useFocusRing-CqVf9l6b.js";import"./useFocusWithin-CrR9OGu2.js";import"./index-BDKdxbl8.js";import"./index-D8m644f2.js";import"./index-2bjkk-qr.js";import"./slots-C-wNTvaf.js";import"./index-Ckd9fOVu.js";import"./index-CLj43KZG.js";import"./index-DzS4bbTN.js";import"./index-B3IMV5iP.js";import"./create-external-store-TtP3UJpK.js";import"./index-KhMAmn8o.js";import"./client-DYqE1Xvq.js";import"./index-BcDzO8sH.js";import"./index-ByiR9ds-.js";import"./Dialog-B69cdKA0.js";import"./Heading-DUfbtQE4.js";import"./useOverlayTriggerState-Bm9kZJ98.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-Dzi0B1IC.js";import"./useControlledState-dyoyjkUJ.js";import"./useCollection-BzLjAFLU.js";import"./FocusScope-nc0k0ZO2.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-BTGLQadx.js";import"./Autocomplete-BNz4S_4K.js";import"./SelectionIndicator-CvH_SVyg.js";import"./useLocalizedStringFormatter-C9X_6XmX.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-BP5V8t_Z.js";import"./VisuallyHidden-D5PZ-hA2.js";import"./index-CIRxvt8Z.js";import"./index-iqTyB0XZ.js";import"./index-DlFv1E6m.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
