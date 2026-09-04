import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-CSQd9i7R.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-B_WNEp0W.js";import{t as c}from"./mdx-react-shim-Djpeow6e.js";import{t as l}from"./runtime-DcPfiwh5.js";import{BottomSheet as u,Default as d,DrawerTriggerProps as f,NestedPopover as p,NoEscapeDismiss as m,Placements as h,Props as g,Scrollable as _,n as v,t as y}from"./drawer.stories-bCFkdNHW.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,S.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,S.jsxs)(t.p,{children:[`An overlay panel that slides in from a screen edge. Built on the same RAC stack as `,(0,S.jsx)(t.code,{children:`Modal`}),` (a
modal overlay with an `,(0,S.jsx)(t.code,{children:`elevation="overlay"`}),` panel and CSS transitions), it supports sidebar
navigation and bottom sheets.`]}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`DrawerTrigger`}),` wraps a trigger button and a `,(0,S.jsx)(t.code,{children:`<Drawer>`}),`, handling open
state automatically.`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,S.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Content, Drawer, DrawerTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Drawer">
        <Content>Drawer content goes here.</Content>
      </Drawer>
    </DrawerTrigger>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern. Compose a
`,(0,S.jsx)(t.code,{children:`CloseButton`}),` for the dismiss affordance.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, CloseButton, Content, Drawer, Heading } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable>
        <Heading slot="title">Bottom sheet</Heading>
        <CloseButton />
        <Content>Bottom sheet with a composed close button.</Content>
      </Drawer>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,S.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,S.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Content, Drawer, Flex, type DrawerPlacement } from '@godaddy/antares';

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
        <Content>Placement: {placement}</Content>
      </Drawer>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,S.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Content, Drawer, Popover, PopoverTrigger, Text } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable aria-label="Nested popover">
        <Content>
          <PopoverTrigger>
            <Button variant="primary">Open popover</Button>
            <Popover aria-label="Popover">
              <Content>
                <Text>Popover inside drawer</Text>
              </Content>
            </Popover>
          </PopoverTrigger>
        </Content>
      </Drawer>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`no-escape-dismiss`,children:`No Escape Dismiss`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),` to prevent the drawer from being dismissed by the escape key.`]}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Content, Drawer } from '@godaddy/antares';

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
        <Content>Cannot escape</Content>
      </Drawer>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`scrollable-content`,children:`Scrollable content`}),`
`,(0,S.jsxs)(t.p,{children:[`When the content is taller than the drawer, the `,(0,S.jsx)(t.code,{children:`Content`}),` region scrolls while the title row
stays pinned.`]}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, CloseButton, Content, Drawer, DrawerTrigger, Heading, Text } from '@godaddy/antares';

export function ScrollableExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Terms">
        <Heading slot="title">Terms</Heading>
        <CloseButton />
        <Content>
          {Array.from({ length: 12 }, (_, i) => (
            <Text as="p" key={i}>
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
            </Text>
          ))}
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,S.jsxs)(t.table,{children:[(0,S.jsx)(t.thead,{children:(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.th,{children:`Key`}),(0,S.jsx)(t.th,{children:`Action`})]})}),(0,S.jsxs)(t.tbody,{children:[(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:(0,S.jsx)(t.code,{children:`Escape`})}),(0,S.jsxs)(t.td,{children:[`Close the drawer (unless `,(0,S.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),`)`]})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:(0,S.jsx)(t.code,{children:`Tab`})}),(0,S.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,S.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,S.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Modal)`]}),`
`,(0,S.jsxs)(t.li,{children:[`A `,(0,S.jsx)(t.code,{children:`Heading slot="title"`}),` labels the dialog via `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`; otherwise pass `,(0,S.jsx)(t.code,{children:`aria-label`})]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Provide a `,(0,S.jsx)(t.code,{children:`Heading slot="title"`}),` or an `,(0,S.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`isDismissable`}),` to allow closing via backdrop click.`]}),`
`,(0,S.jsx)(t.li,{children:`Don't nest drawers.`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Drawer placement="right">
  <Header>
    <Heading slot="title" />
    <CloseButton />
  </Header>
  <Content />
  {/* ... */}
</Drawer>
`})}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`Drawer`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:g}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`DrawerTrigger`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:f})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),v()}))();export{x as default};