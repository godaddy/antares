import{i as e}from"./preload-helper-BhBC2KNH.js";import{y as t}from"./iframe-BoQURXcu.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bde6Pso7.js";import{t as c}from"./mdx-react-shim-BEVQClFd.js";import{BottomSheet as l,Default as u,DrawerTriggerProps as d,NestedPopover as f,NoEscapeDismiss as p,Placements as m,Props as h,n as g,t as _}from"./drawer.stories-BSdOCVij.js";var v,y=e((()=>{v=`import { Drawer, DrawerTrigger, Button, Text, Box } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Drawer">
        <Box padding="md">
          <Text>Drawer content goes here.</Text>
        </Box>
      </Drawer>
    </DrawerTrigger>
  );
}
`})),b,x=e((()=>{b=`import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        showCloseButton
        aria-label="Bottom sheet"
      >
        <Box elevation="card" padding="md">
          <Text as="p">Bottom sheet with close button.</Text>
          <Text as="p">This is the content</Text>
        </Box>
      </Drawer>
    </>
  );
}
`})),S,C=e((()=>{S=`import { useState } from 'react';
import { Drawer, Button, Flex, Text, type DrawerPlacement, Box } from '@godaddy/antares';

const PLACEMENTS: DrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

export function PlacementsExample() {
  const [placement, setPlacement] = useState<DrawerPlacement>('right');
  const [open, setOpen] = useState(false);

  return (
    <Flex gap="md" wrap="wrap">
      {PLACEMENTS.map(function renderButton(p) {
        return (
          <Button
            key={p}
            variant="primary"
            onPress={function openAt() {
              setPlacement(p);
              setOpen(true);
            }}
          >
            Open {p}
          </Button>
        );
      })}
      <Drawer
        placement={placement}
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        aria-label={\`\${placement} drawer\`}
      >
        <Box padding="md">
          <Text>Placement: {placement}</Text>
        </Box>
      </Drawer>
    </Flex>
  );
}
`})),w,T=e((()=>{w=`import { useState } from 'react';
import { Drawer, Button, Text, Popover, PopoverTrigger, Box } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable aria-label="Nested popover">
        <Box padding="md">
          <PopoverTrigger>
            <Button variant="primary">Open popover</Button>
            <Popover>
              <Text>Popover inside drawer</Text>
            </Popover>
          </PopoverTrigger>
        </Box>
      </Drawer>
    </>
  );
}
`})),E,D=e((()=>{E=`import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

export function NoEscapeDismissExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        isKeyboardDismissDisabled
        aria-label="Drawer"
      >
        <Box padding="md">
          <Text>Cannot escape</Text>
        </Box>
      </Drawer>
    </>
  );
}
`}));function O(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(o,{of:_,name:`Overview`}),`
`,(0,A.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,A.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,A.jsxs)(t.p,{children:[`An overlay panel that slides in from a screen edge. Built like `,(0,A.jsx)(t.code,{children:`Modal`}),` (a RAC modal overlay with an `,(0,A.jsx)(t.code,{children:`elevation="overlay"`}),` panel and CSS transitions), it supports sidebar navigation and bottom sheets.`]}),`
`,(0,A.jsxs)(t.p,{children:[(0,A.jsx)(t.code,{children:`DrawerTrigger`}),` is the composition helper: it wraps a trigger button and a `,(0,A.jsx)(t.code,{children:`<Drawer>`}),`, handling open state and `,(0,A.jsx)(t.code,{children:`aria-controls`}),` linkage automatically. Based on RAC `,(0,A.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,A.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsx)(t.li,{children:`Slides in from any screen edge (top, bottom, left, right)`}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`overlay`}),` elevation panel over a dimmed backdrop, matching `,(0,A.jsx)(t.code,{children:`Modal`})]}),`
`,(0,A.jsxs)(t.li,{children:[`Physical `,(0,A.jsx)(t.code,{children:`placement`}),` (does not flip for RTL)`]}),`
`,(0,A.jsx)(t.li,{children:`Focus trapping, backdrop dismiss, and scroll lock via RAC Modal`}),`
`,(0,A.jsxs)(t.li,{children:[`CSS transitions with `,(0,A.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,A.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,A.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,A.jsx)(a,{of:h}),`
`,(0,A.jsxs)(t.p,{children:[`The `,(0,A.jsx)(t.code,{children:`DrawerTrigger`}),` component accepts the following props:`]}),`
`,(0,A.jsx)(a,{of:d}),`
`,(0,A.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,A.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,A.jsxs)(t.p,{children:[`Use `,(0,A.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,A.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,A.jsx)(i,{of:u,inline:!0}),`
`,(0,A.jsx)(r,{language:`tsx`,code:v}),`
`,(0,A.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,A.jsxs)(t.p,{children:[`Use `,(0,A.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern.`]}),`
`,(0,A.jsx)(i,{of:l,inline:!0}),`
`,(0,A.jsx)(r,{language:`tsx`,code:b}),`
`,(0,A.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,A.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,A.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,A.jsx)(i,{of:m,inline:!0}),`
`,(0,A.jsx)(r,{language:`tsx`,code:S}),`
`,(0,A.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,A.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,A.jsx)(i,{of:f,inline:!0}),`
`,(0,A.jsx)(r,{language:`tsx`,code:w}),`
`,(0,A.jsx)(t.h3,{id:`no-escape-dismiss`,children:`No Escape Dismiss`}),`
`,(0,A.jsxs)(t.p,{children:[`Use `,(0,A.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),` to prevent the drawer from being dismissed by the escape key.`]}),`
`,(0,A.jsx)(i,{of:p,inline:!0}),`
`,(0,A.jsx)(r,{language:`tsx`,code:E}),`
`,(0,A.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,A.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,A.jsxs)(t.table,{children:[(0,A.jsx)(t.thead,{children:(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.th,{children:`Key`}),(0,A.jsx)(t.th,{children:`Action`})]})}),(0,A.jsxs)(t.tbody,{children:[(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.td,{children:(0,A.jsx)(t.code,{children:`Escape`})}),(0,A.jsxs)(t.td,{children:[`Close the drawer (unless `,(0,A.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.td,{children:(0,A.jsx)(t.code,{children:`Tab`})}),(0,A.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,A.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,A.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,A.jsxs)(t.li,{children:[`Dialog accessible name via `,(0,A.jsx)(t.code,{children:`aria-label`})]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`aria-label="Close"`}),` on the built-in close button`]}),`
`]}),`
`,(0,A.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsxs)(t.li,{children:[`Always provide an `,(0,A.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,A.jsxs)(t.li,{children:[`Use `,(0,A.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,A.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]})]})}function k(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,A.jsx)(t,{...e,children:(0,A.jsx)(O,{...e})}):O(e)}var A;e((()=>{A=t(),c(),s(),g(),y(),x(),C(),T(),D()}))();export{k as default};