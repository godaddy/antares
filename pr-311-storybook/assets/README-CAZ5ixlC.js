import{i as e}from"./preload-helper-DtDH9nEa.js";import{y as t}from"./iframe-0kZRusTl.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BlhAj9i2.js";import{t as c}from"./mdx-react-shim-CVs2vK84.js";import{BottomSheet as l,Default as u,DrawerTriggerProps as d,NestedPopover as f,NoEscapeDismiss as p,Placements as m,Props as h,n as g,t as _}from"./drawer.stories-u-HMlkpj.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:_,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,b.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,b.jsxs)(t.p,{children:[`An overlay panel that slides in from a screen edge. Built like `,(0,b.jsx)(t.code,{children:`Modal`}),` (a RAC modal overlay with an `,(0,b.jsx)(t.code,{children:`elevation="overlay"`}),` panel and CSS transitions), it supports sidebar navigation and bottom sheets.`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`DrawerTrigger`}),` is the composition helper: it wraps a trigger button and a `,(0,b.jsx)(t.code,{children:`<Drawer>`}),`, handling open state and `,(0,b.jsx)(t.code,{children:`aria-controls`}),` linkage automatically. Based on RAC `,(0,b.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,b.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`Slides in from any screen edge (top, bottom, left, right)`}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`overlay`}),` elevation panel over a dimmed backdrop, matching `,(0,b.jsx)(t.code,{children:`Modal`})]}),`
`,(0,b.jsxs)(t.li,{children:[`Physical `,(0,b.jsx)(t.code,{children:`placement`}),` (does not flip for RTL)`]}),`
`,(0,b.jsx)(t.li,{children:`Focus trapping, backdrop dismiss, and scroll lock via RAC Modal`}),`
`,(0,b.jsxs)(t.li,{children:[`CSS transitions with `,(0,b.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsxs)(t.p,{children:[`Use `,(0,b.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,b.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Drawer, DrawerTrigger, Button, Text, Box } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,b.jsxs)(t.p,{children:[`Use `,(0,b.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern.`]}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { useState } from 'react';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,b.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,b.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,b.jsx)(i,{of:m,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { useState } from 'react';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,b.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,b.jsx)(i,{of:f,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { useState } from 'react';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`no-escape-dismiss`,children:`No Escape Dismiss`}),`
`,(0,b.jsxs)(t.p,{children:[`Use `,(0,b.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),` to prevent the drawer from being dismissed by the escape key.`]}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { useState } from 'react';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Key`}),(0,b.jsx)(t.th,{children:`Action`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`Escape`})}),(0,b.jsxs)(t.td,{children:[`Close the drawer (unless `,(0,b.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`Tab`})}),(0,b.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,b.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,b.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,b.jsxs)(t.li,{children:[`Dialog accessible name via `,(0,b.jsx)(t.code,{children:`aria-label`})]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`aria-label="Close"`}),` on the built-in close button`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Always provide an `,(0,b.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Use `,(0,b.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,b.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:h}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`DrawerTrigger`}),` component accepts the following props:`]}),`
`,(0,b.jsx)(a,{of:d})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),g()}))();export{y as default};