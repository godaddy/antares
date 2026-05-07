import{j as e}from"./iframe-D_jocO6H.js";import{useMDXComponents as p}from"./index-JHdL4YUy.js";import{M as s,A as a,a as r,S as n}from"./blocks-sBZ0BOgP.js";import{S as m,P as c,D as l,C as d,W as h}from"./popover.stories-cavBBYV8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-9c__PXmS.js";import"./index-rzNIXIpQ.js";import"./index-CGaP8dqt.js";import"./index-BL3-btLE.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Bl_I2Pru.js";import"./Text-DGIKYf2O.js";import"./mergeProps-Cxs9KK_K.js";import"./SSRProvider-CH2btpiR.js";import"./useObjectRef-DInN4Cds.js";import"./Hidden-SCf2dcxZ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DyOciMl9.js";import"./usePress-D7SB3wRl.js";import"./utils-CFJfLX8y.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CEzHDh-3.js";import"./useHover-CziUWxI1.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-DZEXs07v.js";import"./useFocusWithin-CaN0bdti.js";import"./index-CPnhh7am.js";import"./index-BHWcGjpD.js";import"./index-CAiYMNmi.js";import"./slots-CPwhE5Zi.js";import"./index-CGfw3iQa.js";import"./index-CLj43KZG.js";import"./index-BUUwA7VU.js";import"./index-BMveK1kV.js";import"./create-external-store-TtP3UJpK.js";import"./index-_I87cXHo.js";import"./client-EafyeGuf.js";import"./index-C12pHamv.js";import"./Dialog-7wUxof56.js";import"./RSPContexts-Biz7QXIK.js";import"./OverlayArrow-BZzPljKR.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-CALgS4rt.js";import"./useControlledState-Bo_TdwJc.js";import"./context-961hfAQk.js";import"./Collection-DYHjLvbk.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-DPfkyUC4.js";import"./FocusScope-B70Gv_Fz.js";import"./SelectionIndicator-w27dPF_r.js";import"./Overlay-CM3eb0GJ.js";import"./PortalProvider-6jdA7qmD.js";import"./useLocalizedStringFormatter-mCER5rLe.js";import"./usePreventScroll-B5nceaH0.js";import"./useLabels-CYWoTKmh.js";import"./VisuallyHidden-C4YfSvAb.js";import"./index-B3wSt93M.js";import"./index-0Y7E8KaX.js";import"./index-BAvU_Tnq.js";const u=`import { Popover, PopoverTrigger, Button } from '@godaddy/antares';

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
