import{j as e}from"./iframe-Cmkc_zNT.js";import{useMDXComponents as s}from"./index-e0NckJKE.js";import{M as i,A as a,S as o}from"./blocks-CCA1xv68.js";import{S as l,P as c}from"./overlay.stories-DThzJcWw.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNYGrzkj.js";import"./index-_sy_8S40.js";import"./index-zTpLJ-5v.js";import"./Overlay-DgLv4dt3.js";import"./DOMFunctions-BADGQOBX.js";import"./FocusScope-BledyWsZ.js";import"./mergeProps-COV7KoS4.js";import"./SSRProvider-C-Mckw8c.js";import"./clsx-B-dksMZM.js";import"./platform-BULRNHlZ.js";import"./utils-b2Nzz-mJ.js";import"./useHover-Bj4nM2PE.js";import"./useFocusable-Mlx9Lagw.js";import"./useObjectRef-CJgbyJ_r.js";import"./useFocusWithin-Bh6Uosyd.js";import"./useOverlayTriggerState-CpJIW7Ub.js";import"./useControlledState-CppJbEw4.js";import"./PortalProvider-PXWhfH9G.js";import"./usePress-DuIRiI4D.js";import"./usePreventScroll-pbBMLVSP.js";import"./keyboard-BlyT3oQC.js";import"./index-D9VeQ76N.js";import"./index-DLl4a_pS.js";import"./slots-CRAqpFQb.js";import"./index-CLj43KZG.js";import"./index-CvCxQCUq.js";import"./index-Nh_7LiZG.js";import"./index-BSm9AbGX.js";import"./index-BzpOOsJU.js";import"./useFocusRing-BFvaSFf5.js";import"./useButton-DXDVp7zX.js";import"./filterDOMProps-BNnC3YgW.js";import"./index-ChJpH0wg.js";import"./index-K6TagP66.js";import"./index-Bm9jRT3g.js";import"./index-ByioGijG.js";import"./index-Ds8e0i3N.js";import"./index-DsG5oGNl.js";import"./VisuallyHidden-DOcjGNPq.js";const d=`/* v8 ignore next */
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
`,p=`/* v8 ignore next */
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
`,h=`/* v8 ignore next */
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
`,m=`/* v8 ignore next */
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
`,x=`/* v8 ignore next */
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
`;function r(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"overlay",children:"Overlay"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/overlay"})," package provides the ",e.jsx(n.strong,{children:"Overlay"}),` component, a foundational
primitive for creating layered UI experiences where content appears above the
main application view. Overlay manages state and coordinates React Aria hooks,
passing props via slots to children for flexible composition.`]}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:`Overlay serves as a coordinator that brings together focused primitives like
Portal, FocusLock, ScrollLock, and Dismiss. It handles state management and
React Aria integration while delegating rendering and behavior to composed
primitives.`}),`
`,e.jsx(n.h3,{id:"use-cases",children:"Use Cases"}),`
`,e.jsx(n.p,{children:"Overlay addresses several key scenarios:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Modal dialogs"}),": Displaying content that requires immediate user attention"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Drawers and sheets"}),": Side panels or bottom sheets common in mobile interfaces"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Loading states"}),": Fullscreen loading indicators that block interaction"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image viewers"}),": Lightbox-style image viewing experiences"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Onboarding flows"}),": Step-by-step tutorials that overlay the application"]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/overlay @bento/portal @bento/focus-lock @bento/scroll-lock @bento/dismiss
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/overlay"})," package exports the ",e.jsx(n.code,{children:"Overlay"})," component:"]}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.p,{children:"The simplest overlay usage demonstrates controlled state management:"}),`
`,e.jsx(o,{language:"tsx",code:d}),`
`,e.jsx(n.h3,{id:"complete-modal",children:"Complete Modal"}),`
`,e.jsx(n.p,{children:`A complete modal dialog combining all overlay primitives. This example
demonstrates best practices for accessible modal patterns using Portal for DOM
rendering, ScrollLock for background scroll prevention, FocusLock for focus
containment, and Dismiss for screen reader accessibility:`}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsx(n.h3,{id:"drawer",children:"Drawer"}),`
`,e.jsx(n.p,{children:`Drawers use the same overlay primitives as modals but with different
positioning. This example shows a drawer sliding in from the right side:`}),`
`,e.jsx(o,{language:"tsx",code:h}),`
`,e.jsx(n.h3,{id:"uncontrolled-with-trigger",children:"Uncontrolled with Trigger"}),`
`,e.jsx(n.p,{children:`An uncontrolled overlay that manages its own state internally. The trigger
button uses the trigger slot to receive toggle handlers from the Overlay
component:`}),`
`,e.jsx(o,{language:"tsx",code:m}),`
`,e.jsx(n.h3,{id:"non-modal-popover",children:"Non-Modal Popover"}),`
`,e.jsx(n.p,{children:`A lightweight popover without ScrollLock or backdrop, suitable for non-blocking
UI elements:`}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsx(n.p,{children:`Overlay follows Bento's composition model by managing state and passing handlers
via slots to children. It does not render DOM elements itself but coordinates
the behavior of composed primitives.`}),`
`,e.jsx(n.h3,{id:"slot-system",children:"Slot System"}),`
`,e.jsx(n.p,{children:`Overlay passes props to children through the slot system. Children with slot
assignments automatically receive the appropriate props:`}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot"}),e.jsx(n.th,{children:"Purpose"}),e.jsx(n.th,{children:"Props Provided"}),e.jsx(n.th,{children:"Required"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"trigger"})}),e.jsx(n.td,{children:"Element that opens/closes the overlay"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"triggerProps"})," from React Aria (requires a pressable component)"]}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"backdrop"})}),e.jsx(n.td,{children:"Visual backdrop behind content"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"overlayProps"})," from React Aria"]}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"content"})}),e.jsx(n.td,{children:"Main overlay content container"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"overlayProps"})," from React Aria"]}),e.jsx(n.td,{children:"Yes"})]})]})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The trigger slot must be filled with a component that consumes React Aria press events (for example ",e.jsx(n.code,{children:"@bento/button"})," or any primitive built on ",e.jsx(n.code,{children:"@bento/pressable"}),"). Passing a raw DOM element (e.g. ",e.jsx(n.code,{children:'Container as="button"'}),") leaves the ",e.jsx(n.code,{children:"onPress"})," handler on the native element, which React ignores and will log warnings."]}),`
`]}),`
`,e.jsx(n.h3,{id:"component-structure",children:"Component Structure"}),`
`,e.jsx(n.p,{children:"The recommended overlay structure follows this hierarchy:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Overlay (state management, coordination)
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
`,e.jsx(n.h3,{id:"controlled-vs-uncontrolled",children:"Controlled vs Uncontrolled"}),`
`,e.jsxs(n.p,{children:[`Overlay supports both controlled and uncontrolled state management using React
Aria's `,e.jsx(n.code,{children:"useOverlayTriggerState"})," hook."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Controlled"})," - Parent component manages state:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const [open, setOpen] = useState(false);
<Overlay open={open} onOpenChange={setOpen}>
  {/* content */}
</Overlay>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Uncontrolled"})," - Overlay manages state internally:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Overlay defaultOpen={false}>
  <Button slot="trigger">Open</Button>
  {/* content */}
</Overlay>
`})}),`
`,e.jsx(n.h2,{id:"react-aria-integration",children:"React Aria Integration"}),`
`,e.jsx(n.p,{children:"Overlay integrates React Aria's overlay hooks to provide accessible behavior:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlayTriggerState"}),": Manages controlled/uncontrolled state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlayTrigger"}),": Provides trigger and overlay props"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useModalOverlay"}),": For modal semantics (via composed children)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlay"}),": For dismissal behavior (via composed children)"]}),`
`]}),`
`,e.jsx(n.p,{children:`The component passes React Aria hook return values to children via slots,
allowing consumers to manually compose primitives while maintaining proper
accessibility.`}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"Overlay is designed with accessibility as a foundation:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"State Management"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Controlled and uncontrolled state patterns via React Aria"}),`
`,e.jsx(n.li,{children:"Proper trigger-overlay relationship through ARIA attributes"}),`
`,e.jsx(n.li,{children:"State communicated to children via slots"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Focus Management"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delegated to FocusLock primitive when composed"}),`
`,e.jsx(n.li,{children:"Focus trapping for modal patterns"}),`
`,e.jsx(n.li,{children:"Focus restoration on close"}),`
`,e.jsx(n.li,{children:"Initial focus control"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Keyboard Support"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"ESC key handling via React Aria overlayProps"}),`
`,e.jsx(n.li,{children:"Tab navigation contained within FocusLock"}),`
`,e.jsx(n.li,{children:"Trigger activation via Space/Enter"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Screen Reader Support"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Proper ARIA attributes from React Aria hooks"}),`
`,e.jsx(n.li,{children:"Dismiss components for linear navigation"}),`
`,e.jsx(n.li,{children:"Modal semantics when appropriate"}),`
`]}),`
`,e.jsx(n.h2,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(n.p,{children:"Overlay applies the following data attribute to help with styling and testing:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-state"})}),e.jsx(n.td,{children:"Current open state"}),e.jsx(n.td,{children:'"open" / "closed"'})]})})]}),`
`,e.jsx(n.p,{children:"These attributes are passed via the Box context to children, allowing styling based on overlay state:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-overlay [slot="content"][data-state="open"] {
  animation: fadeIn 200ms ease-in;
}

.my-overlay [slot="backdrop"][data-state="open"] {
  animation: fadeIn 200ms ease-in;
}
`})}),`
`,e.jsx(n.h2,{id:"related-packages",children:"Related Packages"}),`
`,e.jsx(n.p,{children:"Overlay is designed to work with these Bento primitives:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/portal"}),": Renders content outside normal DOM hierarchy"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/focus-lock"}),": Traps focus within overlay boundaries"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/scroll-lock"}),": Prevents background scrolling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/dismiss"}),": Accessible dismiss controls for screen readers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/container"}),": Base primitive for polymorphic rendering"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/button"}),": Accessible button component for triggers and actions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/text"}),": Typography component for overlay content"]}),`
`]}),`
`,e.jsx(n.h2,{id:"server-side-rendering",children:"Server-Side Rendering"}),`
`,e.jsx(n.p,{children:`Overlay is SSR-safe and works correctly in server-side rendering environments.
The component only manages state and does not attempt to access browser APIs.
Ensure composed primitives like Portal are properly configured for SSR.`}),`
`,e.jsx(n.h2,{id:"browser-support",children:"Browser Support"}),`
`,e.jsx(n.p,{children:`Overlay supports all modern browsers through React Aria's cross-browser
compatibility layer. The component handles platform-specific behavior
transparently.`}),`
`,e.jsx(n.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(n.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["Overlay is created using the ",e.jsx(n.code,{children:"@bento/slots"}),` package via
`,e.jsx(n.code,{children:"withSlots('BentoOverlay', ...)"}),", which means it supports the standard ",e.jsx(n.code,{children:"slot"}),`
and `,e.jsx(n.code,{children:"slots"})," props for integration with parent components."]}),`
`,e.jsx(n.p,{children:"Overlay defines three slot assignments that children can use to receive overlay-specific props:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"trigger"}),": Receives trigger props from ",e.jsx(n.code,{children:"useOverlayTrigger"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"backdrop"}),": Receives overlay props for backdrop interactions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"content"}),": Receives overlay props for content container"]}),`
`]}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(n.code,{children:"slot"})," and ",e.jsx(n.code,{children:"slots"})," properties."]}),`
`,e.jsx(n.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(n.p,{children:[`Since Overlay doesn't render DOM elements itself, styling is applied to composed
children. Use the `,e.jsx(n.code,{children:"className"})," or ",e.jsx(n.code,{children:"style"}),` props on Portal children, or target
elements using data attributes:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Overlay open={open} onOpenChange={setOpen}>
  <Container slot="backdrop" className="my-backdrop" />
  <Container slot="content" className="my-content">
    {/* content */}
  </Container>
</Overlay>
`})}),`
`,e.jsx(n.p,{children:"CSS targeting:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-backdrop[data-state="open"] {
  animation: fadeIn 200ms;
}

.my-content[data-state="open"] {
  animation: slideUp 300ms;
}
`})}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Always provide a way to close"}),`: Ensure users can dismiss overlays via backdrop click, ESC key, close button, or Dismiss controls.
`,e.jsx(n.strong,{children:"Use appropriate patterns"}),`: Modal overlays should use FocusLock and ScrollLock. Non-modal popovers may skip these primitives for lightweight interactions.
`,e.jsx(n.strong,{children:"Position carefully"}),`: Use Portal to avoid clipping issues. Consider viewport boundaries and scrolling when positioning overlay content.
`,e.jsx(n.strong,{children:"Manage focus"}),": Always use FocusLock with ",e.jsx(n.code,{children:"restoreFocus"}),` for modal patterns to ensure focus returns to the trigger.
`,e.jsx(n.strong,{children:"Screen reader accessibility"}),`: Include Dismiss controls at start and end of modal content for users navigating linearly.
`,e.jsx(n.strong,{children:"Semantic HTML"}),": Use appropriate heading levels and ARIA labels within overlay content."]}),`
`,e.jsx(n.h2,{id:"performance",children:"Performance"}),`
`,e.jsx(n.p,{children:`Overlay is lightweight and only manages state and context. Performance
characteristics depend on composed children. Use conditional rendering to avoid
mounting Portal, FocusLock, and other primitives when the overlay is closed.`})]})}function se(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{se as default};
