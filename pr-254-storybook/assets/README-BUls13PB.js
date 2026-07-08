import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-pb48vIri.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-bWsTpwpW.js";import{t as c}from"./mdx-react-shim-qUc2OckC.js";import{BottomSheet as l,Default as u,DrawerTriggerProps as d,NestedPopover as f,NoEscapeDismiss as p,Placements as m,Props as h,RTL as g,n as _,t as v}from"./drawer.stories-BqtcvweP.js";var y,b=e((()=>{y=`import { Drawer, DrawerTrigger, Button, Text, Box } from '@godaddy/antares';

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
`})),x,S=e((()=>{x=`import { useState } from 'react';
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
`})),C,w=e((()=>{C=`import { useState } from 'react';
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
`})),T,E=e((()=>{T=`import { useState } from 'react';
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
`})),D,O=e((()=>{D=`import { useState } from 'react';
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
`})),k,A=e((()=>{k=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { PlacementsExample } from './placements.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <PlacementsExample />
    </RTLProvider>
  );
}
`}));function j(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(o,{of:v,name:`Overview`}),`
`,(0,N.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,N.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,N.jsxs)(t.p,{children:[`Wraps a trigger button and a `,(0,N.jsx)(t.code,{children:`<Drawer>`}),`. Handles open state and `,(0,N.jsx)(t.code,{children:`aria-controls`}),` linkage automatically. Based on RAC `,(0,N.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,N.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsx)(t.li,{children:`Slides in from any screen edge (top, bottom, left, right)`}),`
`,(0,N.jsxs)(t.li,{children:[(0,N.jsx)(t.code,{children:`overlay`}),` elevation panel over a dimmed backdrop, matching `,(0,N.jsx)(t.code,{children:`Modal`})]}),`
`,(0,N.jsx)(t.li,{children:`Automatic RTL flipping for left/right placement`}),`
`,(0,N.jsx)(t.li,{children:`Focus trapping, backdrop dismiss, and scroll lock via RAC Modal`}),`
`,(0,N.jsxs)(t.li,{children:[`CSS transitions with `,(0,N.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,N.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,N.jsx)(t.pre,{children:(0,N.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,N.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,N.jsx)(a,{of:h}),`
`,(0,N.jsxs)(t.p,{children:[`The `,(0,N.jsx)(t.code,{children:`DrawerTrigger`}),` component accepts the following props:`]}),`
`,(0,N.jsx)(a,{of:d}),`
`,(0,N.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,N.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,N.jsxs)(t.p,{children:[`Use `,(0,N.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,N.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,N.jsx)(i,{of:u,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:y}),`
`,(0,N.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,N.jsxs)(t.p,{children:[`Use `,(0,N.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern.`]}),`
`,(0,N.jsx)(i,{of:l,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:x}),`
`,(0,N.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,N.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,N.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,N.jsx)(i,{of:m,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:C}),`
`,(0,N.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,N.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,N.jsx)(i,{of:f,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:T}),`
`,(0,N.jsx)(t.h3,{id:`no-escape-dismiss`,children:`No Escape Dismiss`}),`
`,(0,N.jsxs)(t.p,{children:[`Use `,(0,N.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),` to prevent the drawer from being dismissed by the escape key.`]}),`
`,(0,N.jsx)(i,{of:p,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:D}),`
`,(0,N.jsx)(t.h3,{id:`rtl`,children:`RTL`}),`
`,(0,N.jsxs)(t.p,{children:[`In RTL locales, `,(0,N.jsx)(t.code,{children:`left`}),` and `,(0,N.jsx)(t.code,{children:`right`}),` placements flip automatically so the drawer stays visually consistent.`]}),`
`,(0,N.jsx)(i,{of:g,inline:!0}),`
`,(0,N.jsx)(r,{language:`tsx`,code:k}),`
`,(0,N.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,N.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,N.jsxs)(t.table,{children:[(0,N.jsx)(t.thead,{children:(0,N.jsxs)(t.tr,{children:[(0,N.jsx)(t.th,{children:`Key`}),(0,N.jsx)(t.th,{children:`Action`})]})}),(0,N.jsxs)(t.tbody,{children:[(0,N.jsxs)(t.tr,{children:[(0,N.jsx)(t.td,{children:(0,N.jsx)(t.code,{children:`Escape`})}),(0,N.jsxs)(t.td,{children:[`Close the drawer (unless `,(0,N.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,N.jsxs)(t.tr,{children:[(0,N.jsx)(t.td,{children:(0,N.jsx)(t.code,{children:`Tab`})}),(0,N.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,N.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsxs)(t.li,{children:[(0,N.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,N.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,N.jsxs)(t.li,{children:[`Dialog accessible name via `,(0,N.jsx)(t.code,{children:`aria-label`})]}),`
`,(0,N.jsxs)(t.li,{children:[(0,N.jsx)(t.code,{children:`aria-label="Close"`}),` on the built-in close button`]}),`
`]}),`
`,(0,N.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsxs)(t.li,{children:[`Always provide an `,(0,N.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,N.jsxs)(t.li,{children:[`Use `,(0,N.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,N.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]})]})}function M(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,N.jsx)(t,{...e,children:(0,N.jsx)(j,{...e})}):j(e)}var N;e((()=>{N=t(),c(),s(),_(),b(),S(),w(),E(),O(),A()}))();export{M as default};