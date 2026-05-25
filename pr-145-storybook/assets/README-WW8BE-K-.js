import{j as e}from"./iframe-DViU4vTT.js";import{u as p,M as s,A as a,a as r,S as n}from"./blocks-BQ8w0JfY.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-rQgmcYst.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DikCmdmJ.js";import"./index-B7qGxfzd.js";import"./index-Cvi2XI0M.js";import"./index-Cbu2r9mg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CoXDLf7g.js";import"./Text-D8yA8HIA.js";import"./mergeProps-CCdVsh7A.js";import"./SSRProvider-CymdbxNh.js";import"./useObjectRef-B0Qr798B.js";import"./Hidden-B69lYQl9.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-Qxn7U6zp.js";import"./usePress-Dme-vfMm.js";import"./utils-C61XlCUT.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BlhaBrP8.js";import"./useHover-no6BlnLt.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-DsusUEVi.js";import"./useFocusWithin-DwH7tXPO.js";import"./index-mnn9O8Si.js";import"./index-DSoGsPrt.js";import"./index-BTZLZrqQ.js";import"./slots-B1yn7vZl.js";import"./index-CuLwFv6H.js";import"./index-CLj43KZG.js";import"./index-DaZr2phs.js";import"./index-Dcz_ebIg.js";import"./create-external-store-TtP3UJpK.js";import"./index-CblRztvU.js";import"./client-DIMh9otw.js";import"./index-B45Ba_cW.js";import"./Dialog-CrAfutK9.js";import"./RSPContexts-BQsPKkoU.js";import"./OverlayArrow-C0M8lFej.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-kI7cCud8.js";import"./useControlledState-jkL595lr.js";import"./context-vbi_vjpi.js";import"./SelectionManager-CPY1AaQu.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-CP1cJcAX.js";import"./FocusScope-BL582Srt.js";import"./SelectionIndicator-Dk7AJnOa.js";import"./Overlay-Mj3Fgdgs.js";import"./PortalProvider-gzOUtSuE.js";import"./useLocalizedStringFormatter-BooDndqW.js";import"./usePreventScroll-CaFHaWR_.js";import"./useLabels-CogZxtme.js";import"./VisuallyHidden-DrUkMCod.js";import"./index-CRS-bnx5.js";import"./index-D42rG82q.js";import"./index-CMn6WbG_.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
