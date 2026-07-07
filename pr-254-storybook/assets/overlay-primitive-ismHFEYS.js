import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-BL6-qkEO.js";import{S as n,s as r,u as i}from"./blocks-C7gLgkpK.js";import{t as a}from"./mdx-react-shim-7RMMlnRu.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Overlay`}),`
`,(0,c.jsx)(t.h1,{id:`overlay`,children:`Overlay`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay primitive serves as a foundational building block for creating
layered UI experiences where content appears above the main application view.`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component addresses several key scenarios:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Modal dialogs`}),`: Displaying content that requires immediate user attention`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Drawers and sheets`}),`: Side panels or bottom sheets common in mobile interfaces`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Loading states`}),`: Fullscreen loading indicators that block interaction`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Image viewers`}),`: Lightbox-style image viewing experiences`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Onboarding flows`}),`: Step-by-step tutorials that overlay the application`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`core-primitive-packages`,children:`Core Primitive Packages`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Already exist:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/focus-lock`}),`: Contains keyboard focus within a boundary. Manages focus trapping, restoration, and initial focus placement. See `,(0,c.jsx)(t.code,{children:`focus-lock-primitive.mdx`}),` for details.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/scroll-lock`}),`: Prevents background scrolling while overlay is open. Handles cross-browser scroll prevention including iOS Safari edge cases. See `,(0,c.jsx)(t.code,{children:`scrolllock-pdr.mdx`}),` for details.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/visually-hidden`}),`: Provides screen reader helpers for accessible content that should not be visually displayed. See `,(0,c.jsx)(t.code,{children:`visually-hidden-primitive.mdx`}),` for details.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/container`}),`: Base primitive for polymorphic rendering, used for overlay content structure.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`New to add:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/portal`}),`: Handles DOM rendering placement outside the normal hierarchy. Renders overlay content at a specific DOM location (typically `,(0,c.jsx)(t.code,{children:`document.body`}),` or a custom container). Enables proper z-index stacking and avoids DOM hierarchy issues.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/dismiss`}),`: Wrapper for React Aria's `,(0,c.jsx)(t.code,{children:`DismissButton`}),` component. Provides accessible dismiss functionality for screen readers, typically placed at the start and end of overlay content.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component manages state (open/close) and passes handlers and props via slots to children, following Bento's composition guidelines.`}),`
`,(0,c.jsx)(t.h3,{id:`react-aria-integration`,children:`React Aria Integration`}),`
`,(0,c.jsxs)(t.p,{children:[`Bento's Overlay component uses React Aria's hooks directly rather than React Aria's `,(0,c.jsx)(t.code,{children:`Overlay`}),` component. This allows for maximum composition flexibility, where consumers manually compose Portal, FocusLock, and ScrollLock primitives.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`React Aria hooks used:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useModalOverlay`}),`: For backdrop and modal behavior (hiding content from screen readers, backdrop interactions)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useOverlay`}),`: For core overlay behavior (dismissal, escape key handling, outside click detection)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useModal`}),`: For hiding content outside overlay container from assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useOverlayTrigger`}),`: For trigger elements to open/close overlays (props passed via slots)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`usePreventScroll`}),`: For scroll locking (wrapped in @bento/scroll-lock primitive)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note:`}),` React Aria also provides an `,(0,c.jsx)(t.code,{children:`Overlay`}),` component (see `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/Overlay.tsx`,rel:`nofollow`,children:`React Aria Overlay.tsx`}),`) that combines portal rendering and focus scope. Bento intentionally separates these concerns into individual primitives (`,(0,c.jsx)(t.code,{children:`@bento/portal`}),` and `,(0,c.jsx)(t.code,{children:`@bento/focus-lock`}),`) to enable more flexible composition patterns, following Bento's composition guidelines.`]}),`
`,(0,c.jsx)(t.h3,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component is designed as a coordinator that brings together focused
primitives. It manages React Aria hooks and coordinates all child components via
slots, following Bento's composition model.`}),`
`,(0,c.jsx)(t.h3,{id:`component-structure`,children:`Component Structure`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component structure follows this hierarchy:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`Overlay (state management, coordination)
├─ Trigger (slot="trigger", optional)
└─ Portal (DOM rendering location, conditionally rendered when open)
   ├─ ScrollLock (background scroll prevention, sibling)
   └─ FocusLock (focus trapping and restoration)
      ├─ Backdrop (slot="backdrop", optional, for modal overlays)
      └─ Content (slot="content", user-provided content)
         ├─ Dismiss (accessible dismiss at start)
         ├─ User content (Text, buttons, etc.)
         └─ Dismiss (accessible dismiss at end)
`})}),`
`,(0,c.jsx)(t.p,{children:`Each piece can be used independently:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Portal`}),`: Use alone for tooltips, popovers (no backdrop needed)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`FocusLock`}),`: Use for focus trapping without full overlay pattern`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ScrollLock`}),`: Use for preventing background scroll in any context`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Overlay`}),`: Use as complete solution for overlay patterns`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`foundations-and-requirements`,children:`Foundations and Requirements`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`MUST integrate React Aria for a11y behaviors:`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useModalOverlay`}),` (modal semantics, underlay/backdrop interactions, ESC/outside-click dismissal)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),` (trigger relationship)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useOverlay`}),` / `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),` (non-modal patterns)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`usePreventScroll`}),` (via Scroll Lock primitive)`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`MUST follow composition guidelines:`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Pass state/handlers via slots (no custom context for these concerns)`}),`
`,(0,c.jsx)(t.li,{children:`Semantic slot names`}),`
`,(0,c.jsxs)(t.li,{children:[`Prefer `,(0,c.jsx)(t.code,{children:`Container`}),` for structure and polymorphism`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`MUST use existing primitives where applicable: `,(0,c.jsx)(t.code,{children:`@bento/container`}),`, `,(0,c.jsx)(t.code,{children:`@bento/text`}),`, `,(0,c.jsx)(t.code,{children:`@bento/focus-lock`}),`, `,(0,c.jsx)(t.code,{children:`@bento/scroll-lock`}),`, `,(0,c.jsx)(t.code,{children:`@bento/visually-hidden`})]}),`
`,(0,c.jsx)(t.li,{children:`MUST expose data-* attributes to support styling, animations, testing etc`}),`
`,(0,c.jsx)(t.li,{children:`MUST be composable: consumers can replace, or remove pieces via slots without losing behavior`}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`integration-approach`,children:`Integration Approach`}),`
`,(0,c.jsx)(t.p,{children:`We extend and wrap React Aria's hooks to fit Bento's composition model:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`State management`}),`: Uses React Aria's `,(0,c.jsx)(t.code,{children:`useOverlayTriggerState`}),` for controlled/uncontrolled state handling`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props distribution`}),`: React Aria's hook return values are distributed via slots to children, following Bento's composition guidelines`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Primitive wrapping`}),`: React Aria hooks are wrapped in Bento primitives (FocusLock, ScrollLock) for consistent API and behavior`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No gaps`}),`: React Aria handles all edge cases for overlay behavior across devices - no additional logic needed beyond integration`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsx)(t.h3,{id:`props-interface`,children:`Props Interface`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component accepts the following props:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface OverlayProps extends Slots {
  /**
   * Whether the overlay is open (controlled).
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Content to render inside the overlay.
   * Consumers provide Portal, ScrollLock, FocusLock, and content via slots.
   */
  children?: React.ReactNode;
}
`})}),`
`,(0,c.jsx)(t.p,{children:`The Overlay component manages state and coordinates React Aria hooks, passing
props via slots to children. Dismissal behavior, modal configuration, and other
overlay behaviors are controlled by the consumer through manual composition of
primitives (Portal, ScrollLock, FocusLock, Dismiss, etc.) as shown in the
Composition section.`}),`
`,(0,c.jsx)(t.h3,{id:`controlled-vs-uncontrolled-usage`,children:`Controlled vs Uncontrolled Usage`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay supports both controlled and uncontrolled state management:`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Controlled`}),` - Component manages state externally:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const [open, setOpen] = useState(false);
<Overlay open={open} onOpenChange={setOpen}>
  {/* content */}
</Overlay>
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Uncontrolled`}),` - Overlay manages state internally:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Overlay defaultOpen={false}>
  <Button slot="trigger">
    Requires a trigger slot so it can set the relevant props on the trigger element
  </Button>
</Overlay>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`State management uses React Aria's `,(0,c.jsx)(t.code,{children:`useOverlayTriggerState`}),` hook, which handles
synchronization and event composition automatically.`]}),`
`,(0,c.jsx)(t.h3,{id:`dismissal-behavior`,children:`Dismissal Behavior`}),`
`,(0,c.jsx)(t.p,{children:`Dismissal behavior is controlled by the consumer through manual composition:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Click outside`}),`: Handled via React Aria's `,(0,c.jsx)(t.code,{children:`underlayProps`}),` passed to `,(0,c.jsx)(t.code,{children:`slot="backdrop"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Escape key`}),`: Handled via React Aria's `,(0,c.jsx)(t.code,{children:`overlayProps`}),` passed to `,(0,c.jsx)(t.code,{children:`slot="content"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Programmatic`}),`: Consumers control dismissal via state updates (`,(0,c.jsx)(t.code,{children:`onOpenChange`}),`) or Dismiss components with `,(0,c.jsx)(t.code,{children:`onDismiss`}),` callbacks`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`focus-management`,children:`Focus Management`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus trapping`}),`: Prevents tabbing outside the overlay while it's open (modal only, via FocusLock primitive)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Initial focus control`}),`: Allows specifying which element receives focus when opened (autoFocus)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Return focus`}),`: Returns focus to the trigger element when closed (restoreFocus)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus visibility`}),`: Keyboard focus indicators shown appropriately for keyboard users`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`keyboard-support`,children:`Keyboard Support`}),`
`,(0,c.jsx)(t.p,{children:`Keyboard support is provided through React Aria hooks and primitives:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Escape key`}),`: Handled via React Aria's `,(0,c.jsx)(t.code,{children:`overlayProps`}),` passed to `,(0,c.jsx)(t.code,{children:`slot="content"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Tab navigation`}),`: Contained within overlay via FocusLock primitive (configured by consumer)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus restoration`}),`: Handled by FocusLock primitive's `,(0,c.jsx)(t.code,{children:`restoreFocus`}),` prop (configured by consumer)`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsx)(t.p,{children:`The Overlay primitive is designed to work across different languages and layouts:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Direction-agnostic`}),`: The overlay is direction-agnostic and uses logical properties for layout`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Portal rendering`}),`: Portal rendering is direction-independent`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Text expansion`}),`: The component handles text expansion from different languages by using flexible layouts`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No hardcoded text`}),`: No text content in component itself - all text provided by consumers`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA labels`}),`: ARIA labels provided by consumers in appropriate locale`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Content direction`}),`: Content direction handled by consumers`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,c.jsxs)(t.p,{children:[`Parent composite (Overlay) owns state and passes handlers via slots. Children
(primitives like `,(0,c.jsx)(t.code,{children:`Container`}),`, `,(0,c.jsx)(t.code,{children:`Button`}),`, `,(0,c.jsx)(t.code,{children:`Text`}),`) receive state through slots.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import * as React from 'react';
import { Overlay } from '@bento/overlay';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
import { Portal } from '@bento/portal';
import { FocusLock } from '@bento/focus-lock';
import { ScrollLock } from '@bento/scroll-lock';
import { Dismiss } from '@bento/dismiss-button';
import { UNSAFE_PortalProvider } from 'react-aria';

function App() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setContainer(document.getElementById('target-example-container'));
  }, []);

  if (!container) return null;

  return (
    {/* Container could be provided through portal provider or passed into portal component*/}
    <UNSAFE_PortalProvider getContainer={() => container}>
      <Modal container={container} />
    </UNSAFE_PortalProvider>
  );
}

function ModalExampleCodeNotImplementationCodeDemonstratingCompositionPatterns({ container }: { container: HTMLElement }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Overlay open={open} onOpenChange={setOpen}>
      {/* Trigger provided via slot; Overlay merges triggerProps */}
      <Container slot="trigger" as="button" onClick={() => setOpen(true)}>
        <Text>Open modal</Text>
      </Container>

      {open && (
        <Portal container={container}>
          {/* Body scroll is prevented while open */}
          <ScrollLock />
          {/* Focus contained within modal, restores on close */}
          <FocusLock contain restoreFocus autoFocus>
            {/* Underlay/backdrop; Overlay injects React Aria underlayProps via slots */}
            <Container slot="backdrop" as="div" />

            {/* Foreground content; Overlay injects overlayProps via slots */}
            <Container slot="content" className="dialog" as="div">
              {/* Screen-reader accessible dismiss controls at start/end */}
              <Dismiss onDismiss={() => setOpen(false)} />

              <Text as="h2">Complete Modal</Text>
              <Text>All infrastructure in one example.</Text>

              {/* Visible close button for sighted users, i know, you can use BentoButton as well */}
              <Container as="button" onClick={() => setOpen(false)}>
                <Text>Close</Text>
              </Container>

              <DismissButton onDismiss={() => setOpen(false)} />
            </Container>
          </FocusLock>
        </Portal>
      )}
    </Overlay>
  );
}
`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`trigger`}),` slot: Element that opens/closes the overlay (uses React Aria's `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),`)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`backdrop`}),` slot: Visual backdrop behind content (conditionally rendered for modal overlays)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`content`}),` slot: Main overlay content with proper layering, focus handling, and dismissal`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`slot-map-and-state`,children:`Slot map and state`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot`}),(0,c.jsx)(t.th,{children:`Purpose`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`backdrop`})}),(0,c.jsx)(t.td,{children:`Underlay behind content`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`Yes`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`content`})}),(0,c.jsx)(t.td,{children:`Foreground content container`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:`Yes`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`trigger`})}),(0,c.jsx)(t.td,{children:`Element that opens/closes the overlay`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`data-attributes`,children:`Data attributes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-state`})}),(0,c.jsx)(t.td,{children:`Current state of the overlay`}),(0,c.jsx)(t.td,{children:`"open" / "closed"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Indicates customized behavior`}),(0,c.jsx)(t.td,{children:`"style", "className"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Component version (dev only)`}),(0,c.jsx)(t.td,{children:`"overlay@1.0"`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`Note: There is no separate `,(0,c.jsx)(t.code,{children:`data-topmost`}),` attribute; topmost determination relies on DOM/portal order and React Aria overlay container semantics.`]}),`
`,(0,c.jsx)(t.p,{children:`Example CSS-based animations:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.my-overlay [slot="content"][data-state="open"] { /* fade in */ }
.my-overlay [slot="content"][data-state="closed"] { /* fade out */ }
`})}),`
`,(0,c.jsx)(t.p,{children:`The component distributes the following props via slots:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`triggerProps`}),` (from useOverlayTrigger) to `,(0,c.jsx)(t.code,{children:`slot="trigger"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`underlayProps`}),` (from useModalOverlay) to `,(0,c.jsx)(t.code,{children:`slot="backdrop"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`overlayProps`}),` (from useOverlay) to `,(0,c.jsx)(t.code,{children:`slot="content"`}),` children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`modalProps`}),` (from useModal) to content container`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};