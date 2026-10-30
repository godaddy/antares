import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-BOALhIm0.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./drawer.stories-By1Jo9R1.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`drawer`,children:`Drawer`}),`
`,(0,S.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, supporting sidebar navigation and bottom sheets.`}),`
`,(0,S.jsx)(t.p,{children:`An overlay panel that slides in from a screen edge, for sidebar navigation and bottom sheets. It can
be swiped closed, and drawers can be nested.`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`DrawerTrigger`}),` wraps a trigger button and a `,(0,S.jsx)(t.code,{children:`<Drawer>`}),`, handling open
state automatically.`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`<DrawerTrigger>`}),` to wrap a trigger button and a `,(0,S.jsx)(t.code,{children:`<Drawer>`}),`. The drawer opens when the trigger is pressed.`]}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, Content, Drawer, DrawerTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" aria-label="Drawer">
        <Content>Drawer content goes here.</Content>
      </Drawer>
    </DrawerTrigger>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`bottom-sheet`,children:`Bottom Sheet`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`placement="bottom"`}),` with controlled state for a bottom sheet pattern. Compose a
`,(0,S.jsx)(t.code,{children:`CloseButton`}),` for the dismiss affordance.`]}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, CloseButton, Content, Drawer, Heading } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen}>
        <Heading slot="title">Bottom sheet</Heading>
        <CloseButton />
        <Content>Bottom sheet with a composed close button.</Content>
      </Drawer>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`placements`,children:`Placements`}),`
`,(0,S.jsxs)(t.p,{children:[`The drawer slides in from whichever edge you set with `,(0,S.jsx)(t.code,{children:`placement`}),`.`]}),`
`,(0,S.jsx)(a,{of:h,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
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
      <Drawer placement={placement} isOpen={open} onOpenChange={setOpen} aria-label={\`\${placement} drawer\`}>
        <Content>Placement: {placement}</Content>
      </Drawer>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`nested-drawers`,children:`Nested Drawers`}),`
`,(0,S.jsxs)(t.p,{children:[`Put a `,(0,S.jsx)(t.code,{children:`DrawerTrigger`}),` inside a drawer to drill deeper into a flow. The new drawer stacks on top
and the one beneath recedes; closing or swiping away the top drawer returns to the one below.`]}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, CloseButton, Content, Drawer, DrawerTrigger, Heading, Text } from '@godaddy/antares';

export function NestedExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open settings</Button>
      <Drawer placement="bottom">
        <Heading slot="title">Settings</Heading>
        <CloseButton />
        <Content>
          <Text>Choose a section to edit.</Text>
          <DrawerTrigger>
            <Button variant="secondary">Account</Button>
            <Drawer placement="bottom">
              <Heading slot="title">Account</Heading>
              <CloseButton />
              <Content>
                <Text>Update your name, email, and password.</Text>
              </Content>
            </Drawer>
          </DrawerTrigger>
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`prevent-dismissal`,children:`Prevent Dismissal`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`preventDismissal`}),` when the drawer must close through an explicit action. Swiping, the
Escape key, and pressing the backdrop no longer close it, so compose a `,(0,S.jsx)(t.code,{children:`CloseButton`}),`.`]}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, CloseButton, Content, Drawer, Heading } from '@godaddy/antares';

export function PreventDismissalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} preventDismissal>
        <Heading slot="title">Unsaved changes</Heading>
        <CloseButton />
        <Content>Only the close button closes this drawer.</Content>
      </Drawer>
    </>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`scrollable-content`,children:`Scrollable content`}),`
`,(0,S.jsxs)(t.p,{children:[`When the content is taller than the drawer, the `,(0,S.jsx)(t.code,{children:`Content`}),` region scrolls while the title row
stays pinned.`]}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Button, CloseButton, Content, Drawer, DrawerTrigger, Heading, Text } from '@godaddy/antares';

export function ScrollableExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" aria-label="Terms">
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
`,(0,S.jsx)(t.h3,{id:`nested-popover`,children:`Nested Popover`}),`
`,(0,S.jsx)(t.p,{children:`Popovers rendered inside a drawer stay open without dismissing the drawer.`}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useState } from 'react';
import { Button, Content, Drawer, Popover, PopoverTrigger, Text } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} aria-label="Nested popover">
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
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,S.jsxs)(t.table,{children:[(0,S.jsx)(t.thead,{children:(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.th,{children:`Key`}),(0,S.jsx)(t.th,{children:`Action`})]})}),(0,S.jsxs)(t.tbody,{children:[(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:(0,S.jsx)(t.code,{children:`Escape`})}),(0,S.jsxs)(t.td,{children:[`Close the top drawer (unless `,(0,S.jsx)(t.code,{children:`preventDismissal`}),`)`]})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:(0,S.jsx)(t.code,{children:`Tab`})}),(0,S.jsx)(t.td,{children:`Move focus within the drawer (focus is trapped)`})]})]})]}),`
`,(0,S.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`role="dialog"`}),` with `,(0,S.jsx)(t.code,{children:`aria-modal="true"`}),` on the drawer panel (via RAC Sheet)`]}),`
`,(0,S.jsxs)(t.li,{children:[`A `,(0,S.jsx)(t.code,{children:`Heading slot="title"`}),` labels the dialog via `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`; otherwise pass `,(0,S.jsx)(t.code,{children:`aria-label`})]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Provide a `,(0,S.jsx)(t.code,{children:`Heading slot="title"`}),` or an `,(0,S.jsx)(t.code,{children:`aria-label`}),` so the dialog has an accessible name.`]}),`
`,(0,S.jsxs)(t.li,{children:[`A drawer closes by swipe, Escape, or backdrop press. Use `,(0,S.jsx)(t.code,{children:`preventDismissal`}),` only when closing
needs an explicit action, and compose a `,(0,S.jsx)(t.code,{children:`CloseButton`}),` so there is one.`]}),`
`,(0,S.jsx)(t.li,{children:`Nest drawers to go deeper into a flow, not to show unrelated content side by side.`}),`
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
`,(0,S.jsx)(t.h3,{id:`drawer-1`,children:`Drawer`}),`
`,(0,S.jsx)(o,{of:u}),`
`,(0,S.jsx)(t.h3,{id:`drawertrigger`,children:`DrawerTrigger`}),`
`,(0,S.jsx)(o,{of:g})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),d()})))()}C();export{x as default};