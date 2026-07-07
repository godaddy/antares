import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-D4aDDb8B.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-B5gIrTPJ.js";import{t as c}from"./mdx-react-shim-BPnzSFZf.js";import{BottomSheet as l,Default as u,NestedPopover as d,Placements as f,Props as p,n as m,t as h}from"./drawer.stories-DcDviTbB.js";var g,_=e((()=>{g=`import { Drawer, DrawerTrigger, Button, Text } from '@godaddy/antares';

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
`})),v,y=e((()=>{v=`import { useState } from 'react';
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
`})),b,x=e((()=>{b=`import { useState } from 'react';
import { Drawer, Button, Flex, Text, type DrawerPlacement } from '@godaddy/antares';

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
      <Drawer placement={placement} isOpen={open} onOpenChange={setOpen} isDismissable title={\`\${placement} drawer\`}>
        <Text>Placement: {placement}</Text>
      </Drawer>
    </Flex>
  );
}
`})),S,C=e((()=>{S=`import { useState } from 'react';
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
`}));function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:h,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,E.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,E.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsx)(t.li,{children:`Slides in from any screen edge (top, bottom, left, right)`}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`overlay`}),` elevation panel over a dimmed backdrop, matching `,(0,E.jsx)(t.code,{children:`Modal`})]}),`
`,(0,E.jsx)(t.li,{children:`Automatic RTL flipping for left/right placement`}),`
`,(0,E.jsx)(t.li,{children:`Focus trapping, backdrop dismiss, and scroll lock via RAC Modal`}),`
`,(0,E.jsxs)(t.li,{children:[`CSS transitions with `,(0,E.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(a,{of:p}),`
`,(0,E.jsx)(t.h2,{id:`sub-components`,children:`Sub-components`}),`
`,(0,E.jsx)(t.h3,{id:`drawertrigger`,children:`DrawerTrigger`}),`
`,(0,E.jsxs)(t.p,{children:[`Wraps a trigger button and a `,(0,E.jsx)(t.code,{children:`<Drawer>`}),`. Handles open state and `,(0,E.jsx)(t.code,{children:`aria-controls`}),` linkage automatically. Based on RAC `,(0,E.jsx)(t.code,{children:`DialogTrigger`}),`.`]}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,E.jsxs)(t.p,{children:[`Use `,(0,E.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,E.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:g}),`
`,(0,E.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,E.jsxs)(t.p,{children:[`Use `,(0,E.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern.`]}),`
`,(0,E.jsx)(i,{of:l,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:v}),`
`,(0,E.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,E.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,E.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:b}),`
`,(0,E.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,E.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:S}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,E.jsxs)(t.table,{children:[(0,E.jsx)(t.thead,{children:(0,E.jsxs)(t.tr,{children:[(0,E.jsx)(t.th,{children:`Key`}),(0,E.jsx)(t.th,{children:`Action`})]})}),(0,E.jsxs)(t.tbody,{children:[(0,E.jsxs)(t.tr,{children:[(0,E.jsx)(t.td,{children:(0,E.jsx)(t.code,{children:`Escape`})}),(0,E.jsxs)(t.td,{children:[`Close the drawer (unless `,(0,E.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,E.jsxs)(t.tr,{children:[(0,E.jsx)(t.td,{children:(0,E.jsx)(t.code,{children:`Tab`})}),(0,E.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,E.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,E.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,E.jsxs)(t.li,{children:[`Dialog accessible name via `,(0,E.jsx)(t.code,{children:`title`}),` (renders a heading) or `,(0,E.jsx)(t.code,{children:`aria-label`}),` (for titleless drawers)`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`aria-label="Close"`}),` on the built-in close button`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Always provide a `,(0,E.jsx)(t.code,{children:`title`}),` or `,(0,E.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Use `,(0,E.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,E.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),m(),_(),y(),x(),C()}))();export{T as default};