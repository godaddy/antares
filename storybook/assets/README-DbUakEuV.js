import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-MjxsOcjU.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-lqsVEV5U.js";import{t as s}from"./mdx-react-shim-HXRGJqer.js";import{Props as c,n as l,t as u}from"./overlay.stories-C9Z1G50j.js";var d,f=e((()=>{d=`/* v8 ignore next */
import React, { useState } from 'react';
import { Overlay } from '@bento/overlay';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Overlay</Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Container
            slot="content"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '2rem',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              zIndex: 1000
            }}
          >
            <Text as="h2">Basic Overlay</Text>
            <Text>This is a simple overlay example using only the content slot.</Text>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </Container>
        )}
      </Overlay>
    </>
  );
}
`})),p,m=e((()=>{p=`/* v8 ignore next */
import React, { useState, useEffect } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Modal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  function handleConfirm() {
    setConfirmed(true);
    setOpen(false);
  }

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Modal</Button>
      {confirmed && <Text data-testid="confirmed">Action confirmed</Text>}
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <ScrollLock />
            <Container
              id="backdrop"
              slot="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}
            />
            <FocusLock contain restoreFocus autoFocus>
              <Container
                id="content"
                slot="content"
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '500px',
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000
                }}
              >
                <Dismiss onDismiss={() => setOpen(false)} />
                <Text as="h2" style={{ marginTop: 0 }}>
                  Modal Dialog
                </Text>
                <Text>
                  This is a complete modal dialog with backdrop, focus lock, scroll lock, and dismiss buttons for screen
                  readers.
                </Text>
                <Text>Background scrolling is prevented, and focus is trapped within the modal.</Text>
                <Container style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Button onPress={() => setOpen(false)}>Close</Button>
                  <Button onPress={handleConfirm}>Confirm</Button>
                </Container>
                <Dismiss onDismiss={() => setOpen(false)} />
              </Container>
            </FocusLock>
          </Portal>
        )}
      </Overlay>
    </>
  );
}
`})),h,g=e((()=>{h=`/* v8 ignore next */
import React, { useState, useEffect } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Drawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Drawer</Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <ScrollLock />
            <Container
              slot="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}
              onClick={() => setOpen(false)}
            />
            <FocusLock contain restoreFocus autoFocus>
              <Container
                slot="content"
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '90%',
                  maxWidth: '400px',
                  padding: '2rem',
                  background: 'white',
                  boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                  overflowY: 'auto'
                }}
              >
                <Dismiss onDismiss={() => setOpen(false)} />
                <Text as="h2" style={{ marginTop: 0 }}>
                  Side Drawer
                </Text>
                <Text>This is a drawer that slides in from the right side of the screen.</Text>
                <Text>It uses the same overlay primitives as a modal but with different positioning.</Text>
                <Container style={{ marginTop: '2rem' }}>
                  <Text as="h3">Menu Items</Text>
                  <Container as="ul" style={{ listStyle: 'none', padding: 0 }}>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 1
                    </Text>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 2
                    </Text>
                    <Text as="li" style={{ padding: '0.5rem 0' }}>
                      Item 3
                    </Text>
                  </Container>
                </Container>
                <Container style={{ marginTop: '2rem' }}>
                  <Button onPress={() => setOpen(false)}>Close Drawer</Button>
                </Container>
                <Dismiss onDismiss={() => setOpen(false)} />
              </Container>
            </FocusLock>
          </Portal>
        )}
      </Overlay>
    </>
  );
}
`})),_,v=e((()=>{_=`/* v8 ignore next */
import React, { useEffect, useState } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function UncontrolledWithTrigger() {
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Overlay defaultOpen={false}>
      {({ state: { open } }) => (
        <>
          <Button slot="trigger">Toggle Overlay</Button>
          {open && (
            <Portal mounted={mounted}>
              <ScrollLock />
              <FocusLock contain restoreFocus autoFocus>
                <Container
                  slot="backdrop"
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999
                  }}
                />
                <Container
                  slot="content"
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '500px',
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000
                  }}
                >
                  <Dismiss slot="dismiss-start" />
                  <Text as="h2" style={{ marginTop: 0 }}>
                    Uncontrolled Overlay
                  </Text>
                  <Text>
                    This overlay manages its own state internally. The trigger button uses the trigger slot to receive
                    toggle handlers from the Overlay component.
                  </Text>
                  <Text>Click the backdrop or use ESC to close.</Text>
                  <Dismiss slot="dismiss-end" />
                </Container>
              </FocusLock>
            </Portal>
          )}
        </>
      )}
    </Overlay>
  );
}
`})),y,b=e((()=>{y=`/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';
import { Overlay } from '@bento/overlay';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { Text } from '@bento/text';

export function Popover() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Container style={{ position: 'relative' }}>
      <Button childRef={triggerRef} onPress={() => setOpen(!open)}>
        Open Popover
      </Button>
      <Overlay open={open} onOpenChange={setOpen}>
        {open && (
          <Portal mounted={mounted}>
            <FocusLock contain restoreFocus autoFocus>
              <Container
                slot="content"
                style={{
                  position: 'absolute',
                  top: triggerRef?.current?.offsetTop + triggerRef?.current?.offsetHeight + 8,
                  left: triggerRef?.current?.offsetLeft,
                  padding: '1rem',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  minWidth: '200px'
                }}
              >
                <Text as="div" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Popover Content
                </Text>
                <Text>
                  This is a non-modal popover. It doesn't use ScrollLock or a backdrop since it's meant to be
                  lightweight and non-blocking.
                </Text>
                <Container style={{ marginTop: '1rem' }}>
                  <Button onPress={() => setOpen(false)}>Close</Button>
                </Container>
              </Container>
            </FocusLock>
          </Portal>
        )}
      </Overlay>
    </Container>
  );
}
`}));function x(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(a,{of:l,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`overlay`,children:`Overlay`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`@bento/overlay`}),` package provides the `,(0,C.jsx)(t.strong,{children:`Overlay`}),` component, a foundational
primitive for creating layered UI experiences where content appears above the
main application view. Overlay manages state and coordinates React Aria hooks,
passing props via slots to children for flexible composition.`]}),`
`,(0,C.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,C.jsx)(t.p,{children:`Overlay serves as a coordinator that brings together focused primitives like
Portal, FocusLock, ScrollLock, and Dismiss. It handles state management and
React Aria integration while delegating rendering and behavior to composed
primitives.`}),`
`,(0,C.jsx)(t.h3,{id:`use-cases`,children:`Use Cases`}),`
`,(0,C.jsx)(t.p,{children:`Overlay addresses several key scenarios:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Modal dialogs`}),`: Displaying content that requires immediate user attention`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Drawers and sheets`}),`: Side panels or bottom sheets common in mobile interfaces`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Loading states`}),`: Fullscreen loading indicators that block interaction`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Image viewers`}),`: Lightbox-style image viewing experiences`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Onboarding flows`}),`: Step-by-step tutorials that overlay the application`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/overlay @bento/portal @bento/focus-lock @bento/scroll-lock @bento/dismiss
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`@bento/overlay`}),` package exports the `,(0,C.jsx)(t.code,{children:`Overlay`}),` component:`]}),`
`,(0,C.jsx)(i,{of:c}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsx)(t.p,{children:`The simplest overlay usage demonstrates controlled state management:`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:d}),`
`,(0,C.jsx)(t.h3,{id:`complete-modal`,children:`Complete Modal`}),`
`,(0,C.jsx)(t.p,{children:`A complete modal dialog combining all overlay primitives. This example
demonstrates best practices for accessible modal patterns using Portal for DOM
rendering, ScrollLock for background scroll prevention, FocusLock for focus
containment, and Dismiss for screen reader accessibility:`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:p}),`
`,(0,C.jsx)(t.h3,{id:`drawer`,children:`Drawer`}),`
`,(0,C.jsx)(t.p,{children:`Drawers use the same overlay primitives as modals but with different
positioning. This example shows a drawer sliding in from the right side:`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`uncontrolled-with-trigger`,children:`Uncontrolled with Trigger`}),`
`,(0,C.jsx)(t.p,{children:`An uncontrolled overlay that manages its own state internally. The trigger
button uses the trigger slot to receive toggle handlers from the Overlay
component:`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`non-modal-popover`,children:`Non-Modal Popover`}),`
`,(0,C.jsx)(t.p,{children:`A lightweight popover without ScrollLock or backdrop, suitable for non-blocking
UI elements:`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,C.jsx)(t.p,{children:`Overlay follows Bento's composition model by managing state and passing handlers
via slots to children. It does not render DOM elements itself but coordinates
the behavior of composed primitives.`}),`
`,(0,C.jsx)(t.h3,{id:`slot-system`,children:`Slot System`}),`
`,(0,C.jsx)(t.p,{children:`Overlay passes props to children through the slot system. Children with slot
assignments automatically receive the appropriate props:`}),`
`,(0,C.jsxs)(t.table,{children:[(0,C.jsx)(t.thead,{children:(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.th,{children:`Slot`}),(0,C.jsx)(t.th,{children:`Purpose`}),(0,C.jsx)(t.th,{children:`Props Provided`}),(0,C.jsx)(t.th,{children:`Required`})]})}),(0,C.jsxs)(t.tbody,{children:[(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:(0,C.jsx)(t.code,{children:`trigger`})}),(0,C.jsx)(t.td,{children:`Element that opens/closes the overlay`}),(0,C.jsxs)(t.td,{children:[(0,C.jsx)(t.code,{children:`triggerProps`}),` from React Aria (requires a pressable component)`]}),(0,C.jsx)(t.td,{children:`No`})]}),(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:(0,C.jsx)(t.code,{children:`backdrop`})}),(0,C.jsx)(t.td,{children:`Visual backdrop behind content`}),(0,C.jsxs)(t.td,{children:[(0,C.jsx)(t.code,{children:`overlayProps`}),` from React Aria`]}),(0,C.jsx)(t.td,{children:`No`})]}),(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:(0,C.jsx)(t.code,{children:`content`})}),(0,C.jsx)(t.td,{children:`Main overlay content container`}),(0,C.jsxs)(t.td,{children:[(0,C.jsx)(t.code,{children:`overlayProps`}),` from React Aria`]}),(0,C.jsx)(t.td,{children:`Yes`})]})]})]}),`
`,(0,C.jsxs)(t.blockquote,{children:[`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Note:`}),` The trigger slot must be filled with a component that consumes React Aria press events (for example `,(0,C.jsx)(t.code,{children:`@bento/button`}),` or any primitive built on `,(0,C.jsx)(t.code,{children:`@bento/pressable`}),`). Passing a raw DOM element (e.g. `,(0,C.jsx)(t.code,{children:`Container as="button"`}),`) leaves the `,(0,C.jsx)(t.code,{children:`onPress`}),` handler on the native element, which React ignores and will log warnings.`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`component-structure`,children:`Component Structure`}),`
`,(0,C.jsx)(t.p,{children:`The recommended overlay structure follows this hierarchy:`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{children:`Overlay (state management, coordination)
├─ Trigger (slot="trigger", optional)
└─ Portal (DOM rendering location, when open)
   ├─ ScrollLock (background scroll prevention)
   ├─ Backdrop (slot="backdrop", optional, for modal overlays)
   └─ FocusLock (focus trapping and restoration)
      └─ Content (slot="content", user-provided content)
         ├─ Dismiss (accessible dismiss at start)
         ├─ User content (Text, buttons, etc.)
         └─ Dismiss (accessible dismiss at end)
`})}),`
`,(0,C.jsx)(t.h3,{id:`controlled-vs-uncontrolled`,children:`Controlled vs Uncontrolled`}),`
`,(0,C.jsxs)(t.p,{children:[`Overlay supports both controlled and uncontrolled state management using React
Aria's `,(0,C.jsx)(t.code,{children:`useOverlayTriggerState`}),` hook.`]}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Controlled`}),` - Parent component manages state:`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`const [open, setOpen] = useState(false);
<Overlay open={open} onOpenChange={setOpen}>
  {/* content */}
</Overlay>
`})}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Uncontrolled`}),` - Overlay manages state internally:`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`<Overlay defaultOpen={false}>
  <Button slot="trigger">Open</Button>
  {/* content */}
</Overlay>
`})}),`
`,(0,C.jsx)(t.h2,{id:`react-aria-integration`,children:`React Aria Integration`}),`
`,(0,C.jsx)(t.p,{children:`Overlay integrates React Aria's overlay hooks to provide accessible behavior:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`useOverlayTriggerState`}),`: Manages controlled/uncontrolled state`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`useOverlayTrigger`}),`: Provides trigger and overlay props`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`useModalOverlay`}),`: For modal semantics (via composed children)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`useOverlay`}),`: For dismissal behavior (via composed children)`]}),`
`]}),`
`,(0,C.jsx)(t.p,{children:`The component passes React Aria hook return values to children via slots,
allowing consumers to manually compose primitives while maintaining proper
accessibility.`}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsx)(t.p,{children:`Overlay is designed with accessibility as a foundation:`}),`
`,(0,C.jsx)(t.p,{children:(0,C.jsx)(t.strong,{children:`State Management`})}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Controlled and uncontrolled state patterns via React Aria`}),`
`,(0,C.jsx)(t.li,{children:`Proper trigger-overlay relationship through ARIA attributes`}),`
`,(0,C.jsx)(t.li,{children:`State communicated to children via slots`}),`
`]}),`
`,(0,C.jsx)(t.p,{children:(0,C.jsx)(t.strong,{children:`Focus Management`})}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Delegated to FocusLock primitive when composed`}),`
`,(0,C.jsx)(t.li,{children:`Focus trapping for modal patterns`}),`
`,(0,C.jsx)(t.li,{children:`Focus restoration on close`}),`
`,(0,C.jsx)(t.li,{children:`Initial focus control`}),`
`]}),`
`,(0,C.jsx)(t.p,{children:(0,C.jsx)(t.strong,{children:`Keyboard Support`})}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`ESC key handling via React Aria overlayProps`}),`
`,(0,C.jsx)(t.li,{children:`Tab navigation contained within FocusLock`}),`
`,(0,C.jsx)(t.li,{children:`Trigger activation via Space/Enter`}),`
`]}),`
`,(0,C.jsx)(t.p,{children:(0,C.jsx)(t.strong,{children:`Screen Reader Support`})}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Proper ARIA attributes from React Aria hooks`}),`
`,(0,C.jsx)(t.li,{children:`Dismiss components for linear navigation`}),`
`,(0,C.jsx)(t.li,{children:`Modal semantics when appropriate`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,C.jsx)(t.p,{children:`Overlay applies the following data attribute to help with styling and testing:`}),`
`,(0,C.jsxs)(t.table,{children:[(0,C.jsx)(t.thead,{children:(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.th,{children:`Attribute`}),(0,C.jsx)(t.th,{children:`Description`}),(0,C.jsx)(t.th,{children:`Example Values`})]})}),(0,C.jsx)(t.tbody,{children:(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:(0,C.jsx)(t.code,{children:`data-state`})}),(0,C.jsx)(t.td,{children:`Current open state`}),(0,C.jsx)(t.td,{children:`"open" / "closed"`})]})})]}),`
`,(0,C.jsx)(t.p,{children:`These attributes are passed via the Box context to children, allowing styling based on overlay state:`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-css`,children:`.my-overlay [slot="content"][data-state="open"] {
  animation: fadeIn 200ms ease-in;
}

.my-overlay [slot="backdrop"][data-state="open"] {
  animation: fadeIn 200ms ease-in;
}
`})}),`
`,(0,C.jsx)(t.h2,{id:`related-packages`,children:`Related Packages`}),`
`,(0,C.jsx)(t.p,{children:`Overlay is designed to work with these Bento primitives:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/portal`}),`: Renders content outside normal DOM hierarchy`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/focus-lock`}),`: Traps focus within overlay boundaries`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/scroll-lock`}),`: Prevents background scrolling`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/dismiss`}),`: Accessible dismiss controls for screen readers`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/container`}),`: Base primitive for polymorphic rendering`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/button`}),`: Accessible button component for triggers and actions`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`@bento/text`}),`: Typography component for overlay content`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`server-side-rendering`,children:`Server-Side Rendering`}),`
`,(0,C.jsx)(t.p,{children:`Overlay is SSR-safe and works correctly in server-side rendering environments.
The component only manages state and does not attempt to access browser APIs.
Ensure composed primitives like Portal are properly configured for SSR.`}),`
`,(0,C.jsx)(t.h2,{id:`browser-support`,children:`Browser Support`}),`
`,(0,C.jsx)(t.p,{children:`Overlay supports all modern browsers through React Aria's cross-browser
compatibility layer. The component handles platform-specific behavior
transparently.`}),`
`,(0,C.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,C.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,C.jsxs)(t.p,{children:[`Overlay is created using the `,(0,C.jsx)(t.code,{children:`@bento/slots`}),` package via
`,(0,C.jsx)(t.code,{children:`withSlots('BentoOverlay', ...)`}),`, which means it supports the standard `,(0,C.jsx)(t.code,{children:`slot`}),`
and `,(0,C.jsx)(t.code,{children:`slots`}),` props for integration with parent components.`]}),`
`,(0,C.jsx)(t.p,{children:`Overlay defines three slot assignments that children can use to receive overlay-specific props:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`trigger`}),`: Receives trigger props from `,(0,C.jsx)(t.code,{children:`useOverlayTrigger`})]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`backdrop`}),`: Receives overlay props for backdrop interactions`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`content`}),`: Receives overlay props for content container`]}),`
`]}),`
`,(0,C.jsxs)(t.p,{children:[`See the `,(0,C.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,C.jsx)(t.code,{children:`slot`}),` and `,(0,C.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,C.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,C.jsxs)(t.p,{children:[`Since Overlay doesn't render DOM elements itself, styling is applied to composed
children. Use the `,(0,C.jsx)(t.code,{children:`className`}),` or `,(0,C.jsx)(t.code,{children:`style`}),` props on Portal children, or target
elements using data attributes:`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`<Overlay open={open} onOpenChange={setOpen}>
  <Container slot="backdrop" className="my-backdrop" />
  <Container slot="content" className="my-content">
    {/* content */}
  </Container>
</Overlay>
`})}),`
`,(0,C.jsx)(t.p,{children:`CSS targeting:`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-css`,children:`.my-backdrop[data-state="open"] {
  animation: fadeIn 200ms;
}

.my-content[data-state="open"] {
  animation: slideUp 300ms;
}
`})}),`
`,(0,C.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Always provide a way to close`}),`: Ensure users can dismiss overlays via backdrop click, ESC key, close button, or Dismiss controls.
`,(0,C.jsx)(t.strong,{children:`Use appropriate patterns`}),`: Modal overlays should use FocusLock and ScrollLock. Non-modal popovers may skip these primitives for lightweight interactions.
`,(0,C.jsx)(t.strong,{children:`Position carefully`}),`: Use Portal to avoid clipping issues. Consider viewport boundaries and scrolling when positioning overlay content.
`,(0,C.jsx)(t.strong,{children:`Manage focus`}),`: Always use FocusLock with `,(0,C.jsx)(t.code,{children:`restoreFocus`}),` for modal patterns to ensure focus returns to the trigger.
`,(0,C.jsx)(t.strong,{children:`Screen reader accessibility`}),`: Include Dismiss controls at start and end of modal content for users navigating linearly.
`,(0,C.jsx)(t.strong,{children:`Semantic HTML`}),`: Use appropriate heading levels and ARIA labels within overlay content.`]}),`
`,(0,C.jsx)(t.h2,{id:`performance`,children:`Performance`}),`
`,(0,C.jsx)(t.p,{children:`Overlay is lightweight and only manages state and context. Performance
characteristics depend on composed children. Use conditional rendering to avoid
mounting Portal, FocusLock, and other primitives when the overlay is closed.`})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),s(),o(),u(),f(),m(),g(),v(),b()}))();export{S as default};