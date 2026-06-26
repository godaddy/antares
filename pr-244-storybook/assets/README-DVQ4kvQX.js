import{i as e}from"./preload-helper-D_yoP-vb.js";import{y as t}from"./iframe-DFJFfto3.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C6715OeW.js";import{t as c}from"./mdx-react-shim-CirHBfrt.js";import{BottomSheet as l,ControlledSnap as u,Default as d,NestedPopover as f,PercentSnapPoints as p,Props as m,SnapPoints as h,n as g,t as _}from"./drawer.stories-C_TOws5x.js";var v,y=e((()=>{v=`import { Drawer, DrawerTrigger, Button, Text } from '@godaddy/antares';

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
`})),b,x=e((()=>{b=`import { useState } from 'react';
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
`})),S,C=e((()=>{S=`import { useState } from 'react';
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
`})),w,T=e((()=>{w=`import { useState } from 'react';
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
`})),E,D=e((()=>{E=`import { useState } from 'react';
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
`})),O,k=e((()=>{O=`import { useState } from 'react';
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
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:_,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,M.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Slides in from any screen edge (top, bottom, left, right) with spring animation`}),`
`,(0,M.jsx)(t.li,{children:`Snap points with drag gestures and keyboard control`}),`
`,(0,M.jsxs)(t.li,{children:[`Numeric and string snap points (`,(0,M.jsx)(t.code,{children:`120`}),`, `,(0,M.jsx)(t.code,{children:`'50%'`}),`, `,(0,M.jsx)(t.code,{children:`'200px'`}),`) resolved against drawer size`]}),`
`,(0,M.jsx)(t.li,{children:`Automatic RTL flipping for left/right placement`}),`
`,(0,M.jsx)(t.li,{children:`Focus trapping, backdrop dismiss, scroll lock via RAC Modal`}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:m}),`
`,(0,M.jsx)(t.h2,{id:`sub-components`,children:`Sub-components`}),`
`,(0,M.jsx)(t.h3,{id:`drawertrigger`,children:`DrawerTrigger`}),`
`,(0,M.jsxs)(t.p,{children:[`Wraps a trigger button and a `,(0,M.jsx)(t.code,{children:`<Drawer>`}),`. Handles open state and `,(0,M.jsx)(t.code,{children:`aria-controls`}),` linkage automatically. Based on RAC `,(0,M.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`drawerhandle`,children:`DrawerHandle`}),`
`,(0,M.jsxs)(t.p,{children:[`Visual drag handle for touch gestures. Renders a grab bar with a 44px touch target (24px for pointer:fine). When inside a `,(0,M.jsx)(t.code,{children:`<Drawer>`}),` with `,(0,M.jsx)(t.code,{children:`snapPoints`}),`, the handle becomes interactive and drag-to-snap activates automatically. Without `,(0,M.jsx)(t.code,{children:`snapPoints`}),`, the handle renders as a decorative affordance only.`]}),`
`,(0,M.jsxs)(t.table,{children:[(0,M.jsx)(t.thead,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.th,{children:`Prop`}),(0,M.jsx)(t.th,{children:`Type`}),(0,M.jsx)(t.th,{children:`Description`})]})}),(0,M.jsx)(t.tbody,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`className`})}),(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`string`})}),(0,M.jsx)(t.td,{children:`Additional CSS class`})]})})]}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,M.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern.`]}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(t.h3,{id:`snap-points`,children:`Snap Points`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`snapPoints`}),` with `,(0,M.jsx)(t.code,{children:`<DrawerHandle />`}),` for a resizable bottom sheet with touch gesture support.`]}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(t.h3,{id:`percentage-snap-points`,children:`Percentage Snap Points`}),`
`,(0,M.jsxs)(t.p,{children:[`Use string snap points like `,(0,M.jsx)(t.code,{children:`'30%'`}),` and `,(0,M.jsx)(t.code,{children:`'60%'`}),` for sizes relative to the drawer's rendered dimensions.`]}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(t.h3,{id:`controlled-snap-points`,children:`Controlled Snap Points`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`activeSnapPoint`}),` and `,(0,M.jsx)(t.code,{children:`onSnapPointChange`}),` for full control over the active snap point.`]}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,M.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,M.jsxs)(t.table,{children:[(0,M.jsx)(t.thead,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.th,{children:`Key`}),(0,M.jsx)(t.th,{children:`Action`})]})}),(0,M.jsxs)(t.tbody,{children:[(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Escape`})}),(0,M.jsxs)(t.td,{children:[`Close the drawer (when `,(0,M.jsx)(t.code,{children:`isDismissable`}),` or not `,(0,M.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Tab`})}),(0,M.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Arrow Up / Right`})}),(0,M.jsx)(t.td,{children:`Move to next snap point (when snap slider is focused)`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Arrow Down / Left`})}),(0,M.jsx)(t.td,{children:`Move to previous snap point`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Home`})}),(0,M.jsx)(t.td,{children:`Jump to first snap point`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`End`})}),(0,M.jsx)(t.td,{children:`Jump to last snap point`})]})]})]}),`
`,(0,M.jsx)(t.p,{children:`In RTL, horizontal arrow key direction is reversed for the snap slider.`}),`
`,(0,M.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,M.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,M.jsxs)(t.li,{children:[`Dialog accessible name via `,(0,M.jsx)(t.code,{children:`title`}),` (renders a heading) or `,(0,M.jsx)(t.code,{children:`aria-label`}),` (for titleless drawers)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`aria-label="Close"`}),` on the built-in close button`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`role="slider"`}),` on the snap point keyboard control with `,(0,M.jsx)(t.code,{children:`aria-valuenow`}),`, `,(0,M.jsx)(t.code,{children:`aria-valuemin`}),`, `,(0,M.jsx)(t.code,{children:`aria-valuemax`}),`, `,(0,M.jsx)(t.code,{children:`aria-valuetext`})]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`aria-hidden="true"`}),` on the visual drag handle (decorative)`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Always provide a `,(0,M.jsx)(t.code,{children:`title`}),` or `,(0,M.jsx)(t.code,{children:`aria-label`}),` prop so the dialog has an accessible name.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,M.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),g(),y(),x(),C(),T(),D(),k()}))();export{j as default};