import{j as e}from"./iframe-ClWTPl5x.js";import{u as o,M as a,A as d,a as t,S as s}from"./blocks-DG6eLz6l.js";import{S as l,P as p,D as c,B as h,a as x,b as m,C as j,N as u}from"./drawer.stories-ClsqplET.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GsngMiyr.js";import"./index-DUACdkfR.js";import"./index-BbqJLgpW.js";import"./index-C-Rv7Pva.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-JYLAdiGx.js";import"./Text-BH8NBewb.js";import"./mergeProps-BJpXx4bB.js";import"./SSRProvider-CfbBhIjL.js";import"./useObjectRef-Bmub13Bc.js";import"./useButton-Ii2SQuDq.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-DEJIEQ8h.js";import"./useEffectEvent-BVbYnPFx.js";import"./useGlobalListeners-BnImAHxc.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BR_Y-GQi.js";import"./platform-DTNzKOdA.js";import"./usePress-D6HH4oj5.js";import"./Hidden-DuHvqV4_.js";import"./useFocusRing-CqVf9l6b.js";import"./useFocusWithin-CrR9OGu2.js";import"./index-BDKdxbl8.js";import"./index-D8m644f2.js";import"./index-2bjkk-qr.js";import"./slots-C-wNTvaf.js";import"./index-Ckd9fOVu.js";import"./index-CLj43KZG.js";import"./index-DzS4bbTN.js";import"./index-B3IMV5iP.js";import"./create-external-store-TtP3UJpK.js";import"./index-KhMAmn8o.js";import"./client-DYqE1Xvq.js";import"./index-BcDzO8sH.js";import"./index-DlFv1E6m.js";import"./Dialog-B69cdKA0.js";import"./Heading-DUfbtQE4.js";import"./useOverlayTriggerState-Bm9kZJ98.js";import"./number-P4c4HRxZ.js";import"./I18nProvider-Dzi0B1IC.js";import"./useControlledState-dyoyjkUJ.js";import"./useCollection-BzLjAFLU.js";import"./FocusScope-nc0k0ZO2.js";import"./isScrollable-BoZfJepV.js";import"./useEvent-BTGLQadx.js";import"./Autocomplete-BNz4S_4K.js";import"./SelectionIndicator-CvH_SVyg.js";import"./useLocalizedStringFormatter-C9X_6XmX.js";import"./getScrollParent-CjtJP_Hi.js";import"./useLabels-BP5V8t_Z.js";import"./VisuallyHidden-D5PZ-hA2.js";import"./index-CIRxvt8Z.js";import"./index-iqTyB0XZ.js";import"./index-ByiR9ds-.js";const g=`import { Drawer, DrawerTrigger, Button, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable title="Settings">
        <Text>Drawer content goes here.</Text>
      </Drawer>
    </DrawerTrigger>
  );
}
`,w=`import { useState } from 'react';
import { Drawer, Button, Text } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable title="Options">
        <Text>Bottom sheet content with close button.</Text>
      </Drawer>
    </>
  );
}
`,f=`import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Text } from '@godaddy/antares';

export function SnapPointsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open snap sheet
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={[148, 355]}
        defaultActiveSnapPoint={148}
        snapLabels={['Collapsed', 'Expanded']}
        title="Snap Sheet"
      >
        <DrawerHandle />
        <Text>Drag the handle or use keyboard to resize.</Text>
      </Drawer>
    </>
  );
}
`,b=`import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Flex, Text, type DrawerSnapPoint } from '@godaddy/antares';

const SNAP_POINTS = [148, 355];

export function ControlledSnapExample() {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<DrawerSnapPoint>(355);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open controlled snap
      </Button>
      <Text>Active snap: {snap}px</Text>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={SNAP_POINTS}
        activeSnapPoint={snap}
        onSnapPointChange={setSnap}
        snapLabels={['Collapsed', 'Expanded']}
        title="Controlled Snap"
      >
        <DrawerHandle />
        <Flex gap="md">
          <Button variant="primary" onPress={() => setSnap(148)}>
            Collapse
          </Button>
          <Button variant="primary" onPress={() => setSnap(355)}>
            Expand
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}
`,D=`import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Text } from '@godaddy/antares';

export function PercentSnapPointsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open percent snap
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={['30%', '60%']}
        defaultActiveSnapPoint="30%"
        snapLabels={['Collapsed', 'Expanded']}
        title="Percent Snap"
      >
        <DrawerHandle />
        <Text>Snap points use percentage of drawer size.</Text>
      </Drawer>
    </>
  );
}
`,S=`import { useState } from 'react';
import { Drawer, Button, Text, Popover, PopoverTrigger } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable title="Drawer with Popover">
        <PopoverTrigger>
          <Button variant="primary">Open popover</Button>
          <Popover>
            <Text>Popover inside drawer</Text>
          </Popover>
        </PopoverTrigger>
      </Drawer>
    </>
  );
}
`;function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"drawer",children:"Drawer"}),`
`,e.jsx(n.p,{children:"An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Slides in from any screen edge (top, bottom, left, right) with spring animation"}),`
`,e.jsx(n.li,{children:"Snap points with drag gestures and keyboard control"}),`
`,e.jsxs(n.li,{children:["Numeric and string snap points (",e.jsx(n.code,{children:"120"}),", ",e.jsx(n.code,{children:"'50%'"}),", ",e.jsx(n.code,{children:"'200px'"}),") resolved against drawer size"]}),`
`,e.jsx(n.li,{children:"Automatic RTL flipping for left/right placement"}),`
`,e.jsx(n.li,{children:"Focus trapping, backdrop dismiss, scroll lock via RAC Modal"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefers-reduced-motion"})," support"]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:p}),`
`,e.jsx(n.h2,{id:"sub-components",children:"Sub-components"}),`
`,e.jsx(n.h3,{id:"drawertrigger",children:"DrawerTrigger"}),`
`,e.jsxs(n.p,{children:["Wraps a trigger button and a ",e.jsx(n.code,{children:"<Drawer>"}),". Handles open state and ",e.jsx(n.code,{children:"aria-controls"})," linkage automatically. Based on RAC ",e.jsx(n.code,{children:"DialogTrigger"}),"."]}),`
`,e.jsx(n.h3,{id:"drawerhandle",children:"DrawerHandle"}),`
`,e.jsxs(n.p,{children:["Visual drag handle for touch gestures. Must be inside a ",e.jsx(n.code,{children:"<Drawer>"})," with ",e.jsx(n.code,{children:"snapPoints"}),". Renders a grab bar with a 44px touch target (24px for pointer:fine). Drag behavior activates automatically when snap points are present."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Description"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"Additional CSS class"})]})})]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"<DrawerTrigger>"})," to wrap a trigger button and a ",e.jsx(n.code,{children:"<Drawer>"}),". The drawer opens when the trigger is pressed."]}),`
`,e.jsx(t,{of:c,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:g}),`
`,e.jsx(n.h3,{id:"bottom-sheet",children:"Bottom Sheet"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:'placement="bottom"'})," with controlled state for a bottom sheet pattern."]}),`
`,e.jsx(t,{of:h,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:w}),`
`,e.jsx(n.h3,{id:"snap-points",children:"Snap Points"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"snapPoints"})," with ",e.jsx(n.code,{children:"<DrawerHandle />"})," for a resizable bottom sheet with touch gesture support."]}),`
`,e.jsx(t,{of:x,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"percentage-snap-points",children:"Percentage Snap Points"}),`
`,e.jsxs(n.p,{children:["Use string snap points like ",e.jsx(n.code,{children:"'30%'"})," and ",e.jsx(n.code,{children:"'60%'"})," for sizes relative to the drawer's rendered dimensions."]}),`
`,e.jsx(t,{of:m,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:D}),`
`,e.jsx(n.h3,{id:"controlled-snap-points",children:"Controlled Snap Points"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"activeSnapPoint"})," and ",e.jsx(n.code,{children:"onSnapPointChange"})," for full control over the active snap point."]}),`
`,e.jsx(t,{of:j,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:b}),`
`,e.jsx(n.h3,{id:"nested-popover",children:"Nested Popover"}),`
`,e.jsx(n.p,{children:"Popovers rendered inside a drawer stay open without dismissing the drawer."}),`
`,e.jsx(t,{of:u,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:S}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.h3,{id:"keyboard",children:"Keyboard"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Key"}),e.jsx(n.th,{children:"Action"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Escape"})}),e.jsxs(n.td,{children:["Close the drawer (when ",e.jsx(n.code,{children:"isDismissable"})," or not ",e.jsx(n.code,{children:"isKeyboardDismissDisabled"}),")"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Tab"})}),e.jsx(n.td,{children:"Move focus within the drawer (focus is trapped)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Arrow Up / Right"})}),e.jsx(n.td,{children:"Move to next snap point (when snap slider is focused)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Arrow Down / Left"})}),e.jsx(n.td,{children:"Move to previous snap point"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Home"})}),e.jsx(n.td,{children:"Jump to first snap point"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"End"})}),e.jsx(n.td,{children:"Jump to last snap point"})]})]})]}),`
`,e.jsx(n.p,{children:"In RTL, horizontal arrow key direction is reversed for the snap slider."}),`
`,e.jsx(n.h3,{id:"aria",children:"ARIA"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'role="dialog"'})," with ",e.jsx(n.code,{children:'aria-modal="true"'})," on the drawer panel (via RAC Modal)"]}),`
`,e.jsxs(n.li,{children:["Dialog accessible name via ",e.jsx(n.code,{children:"title"})," (renders a heading) or ",e.jsx(n.code,{children:"aria-label"})," (for titleless drawers)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'aria-label="Close"'})," on the built-in close button"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'role="slider"'})," on the snap point keyboard control with ",e.jsx(n.code,{children:"aria-valuenow"}),", ",e.jsx(n.code,{children:"aria-valuemin"}),", ",e.jsx(n.code,{children:"aria-valuemax"}),", ",e.jsx(n.code,{children:"aria-valuetext"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'aria-hidden="true"'})," on the visual drag handle (decorative)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always provide a ",e.jsx(n.code,{children:"title"})," or ",e.jsx(n.code,{children:"aria-label"})," prop so the dialog has an accessible name."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"isDismissable"})," to allow closing via backdrop click."]}),`
`,e.jsx(n.li,{children:"Don't nest drawers."}),`
`]})]})}function Be(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{Be as default};
