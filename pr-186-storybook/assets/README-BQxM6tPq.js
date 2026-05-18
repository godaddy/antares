import{j as e}from"./iframe-CEcV0ga0.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-CQXcMUAg.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-DCMIlTek.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D5wJwQvv.js";import"./index-D7Rcxtli.js";import"./index-xRVEgPE2.js";import"./index-de1h4FZm.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-D2zZhhGq.js";import"./Text-BE7W_DlC.js";import"./mergeProps-BdMxgIcs.js";import"./SSRProvider-D4haRtQR.js";import"./useObjectRef-Di6jT2lS.js";import"./useButton-D5QMir-x.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-lU0jAc89.js";import"./useEffectEvent-CfvBk0ta.js";import"./useGlobalListeners--VmRjSuT.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-DhSStpTV.js";import"./platform-DTNzKOdA.js";import"./usePress-Criz3eDv.js";import"./Hidden-nxp3j_DW.js";import"./useFocusRing-C7dXfWXC.js";import"./useFocusWithin-Bjeg85S6.js";import"./index-DRYSFh2l.js";import"./index-C865XzjC.js";import"./index-D5KFq0ui.js";import"./slots-CSiSJd4e.js";import"./index-BTpi4crp.js";import"./index-CLj43KZG.js";import"./index-BnGD03L4.js";import"./index-CZscL2ND.js";import"./create-external-store-TtP3UJpK.js";import"./index-L996duZL.js";import"./client-gCyhfJBu.js";import"./index-LTK9Th7W.js";import"./index-Bh0jPyS1.js";import"./Dialog-BC6IX4lE.js";import"./Heading-BSvC3tME.js";import"./useOverlayTriggerState-DWELxZLs.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-DJ6eca98.js";import"./useControlledState-A3pjKgKK.js";import"./useCollection-CgLZvEq4.js";import"./FocusScope-DlNQ-poy.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-D3bSTn2d.js";import"./Autocomplete-GmUd8Icj.js";import"./SelectionIndicator-Cazt9jeN.js";import"./useLocalizedStringFormatter-5GpgYynl.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-BcivrrnJ.js";import"./VisuallyHidden-AsyU4sEg.js";import"./index-DkOVduqy.js";import"./index-DDEJrq8Z.js";import"./index-BtGKvASi.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
