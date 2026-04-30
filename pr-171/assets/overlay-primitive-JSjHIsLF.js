import{j as e}from"./iframe-Cmkc_zNT.js";import{useMDXComponents as r}from"./index-e0NckJKE.js";import{M as i}from"./blocks-CCA1xv68.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNYGrzkj.js";import"./index-_sy_8S40.js";import"./index-zTpLJ-5v.js";function o(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Architecture/PDRs/Overlay"}),`
`,e.jsx(n.h1,{id:"overlay",children:"Overlay"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:`The Overlay primitive serves as a foundational building block for creating
layered UI experiences where content appears above the main application view.`}),`
`,e.jsx(n.p,{children:"The Overlay component addresses several key scenarios:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Modal dialogs"}),": Displaying content that requires immediate user attention"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Drawers and sheets"}),": Side panels or bottom sheets common in mobile interfaces"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Loading states"}),": Fullscreen loading indicators that block interaction"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image viewers"}),": Lightbox-style image viewing experiences"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Onboarding flows"}),": Step-by-step tutorials that overlay the application"]}),`
`]}),`
`,e.jsx(n.h3,{id:"core-primitive-packages",children:"Core Primitive Packages"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Already exist:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/focus-lock"}),": Contains keyboard focus within a boundary. Manages focus trapping, restoration, and initial focus placement. See ",e.jsx(n.code,{children:"focus-lock-primitive.mdx"})," for details."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/scroll-lock"}),": Prevents background scrolling while overlay is open. Handles cross-browser scroll prevention including iOS Safari edge cases. See ",e.jsx(n.code,{children:"scrolllock-pdr.mdx"})," for details."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/visually-hidden"}),": Provides screen reader helpers for accessible content that should not be visually displayed. See ",e.jsx(n.code,{children:"visually-hidden-primitive.mdx"})," for details."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/container"}),": Base primitive for polymorphic rendering, used for overlay content structure."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"New to add:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/portal"}),": Handles DOM rendering placement outside the normal hierarchy. Renders overlay content at a specific DOM location (typically ",e.jsx(n.code,{children:"document.body"})," or a custom container). Enables proper z-index stacking and avoids DOM hierarchy issues."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/dismiss"}),": Wrapper for React Aria's ",e.jsx(n.code,{children:"DismissButton"})," component. Provides accessible dismiss functionality for screen readers, typically placed at the start and end of overlay content."]}),`
`]}),`
`,e.jsx(n.p,{children:"The Overlay component manages state (open/close) and passes handlers and props via slots to children, following Bento's composition guidelines."}),`
`,e.jsx(n.h3,{id:"react-aria-integration",children:"React Aria Integration"}),`
`,e.jsxs(n.p,{children:["Bento's Overlay component uses React Aria's hooks directly rather than React Aria's ",e.jsx(n.code,{children:"Overlay"})," component. This allows for maximum composition flexibility, where consumers manually compose Portal, FocusLock, and ScrollLock primitives."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"React Aria hooks used:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useModalOverlay"}),": For backdrop and modal behavior (hiding content from screen readers, backdrop interactions)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlay"}),": For core overlay behavior (dismissal, escape key handling, outside click detection)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useModal"}),": For hiding content outside overlay container from assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlayTrigger"}),": For trigger elements to open/close overlays (props passed via slots)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"usePreventScroll"}),": For scroll locking (wrapped in @bento/scroll-lock primitive)"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," React Aria also provides an ",e.jsx(n.code,{children:"Overlay"})," component (see ",e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/Overlay.tsx",rel:"nofollow",children:"React Aria Overlay.tsx"}),") that combines portal rendering and focus scope. Bento intentionally separates these concerns into individual primitives (",e.jsx(n.code,{children:"@bento/portal"})," and ",e.jsx(n.code,{children:"@bento/focus-lock"}),") to enable more flexible composition patterns, following Bento's composition guidelines."]}),`
`,e.jsx(n.h3,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsx(n.p,{children:`The Overlay component is designed as a coordinator that brings together focused
primitives. It manages React Aria hooks and coordinates all child components via
slots, following Bento's composition model.`}),`
`,e.jsx(n.h3,{id:"component-structure",children:"Component Structure"}),`
`,e.jsx(n.p,{children:"The Overlay component structure follows this hierarchy:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Overlay (state management, coordination)
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
`,e.jsx(n.p,{children:"Each piece can be used independently:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Portal"}),": Use alone for tooltips, popovers (no backdrop needed)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"FocusLock"}),": Use for focus trapping without full overlay pattern"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ScrollLock"}),": Use for preventing background scroll in any context"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Overlay"}),": Use as complete solution for overlay patterns"]}),`
`]}),`
`,e.jsx(n.h2,{id:"foundations-and-requirements",children:"Foundations and Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["MUST integrate React Aria for a11y behaviors:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useModalOverlay"})," (modal semantics, underlay/backdrop interactions, ESC/outside-click dismissal)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useOverlayTrigger"})," (trigger relationship)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useOverlay"})," / ",e.jsx(n.code,{children:"useOverlayPosition"})," (non-modal patterns)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"usePreventScroll"})," (via Scroll Lock primitive)"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["MUST follow composition guidelines:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Pass state/handlers via slots (no custom context for these concerns)"}),`
`,e.jsx(n.li,{children:"Semantic slot names"}),`
`,e.jsxs(n.li,{children:["Prefer ",e.jsx(n.code,{children:"Container"})," for structure and polymorphism"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["MUST use existing primitives where applicable: ",e.jsx(n.code,{children:"@bento/container"}),", ",e.jsx(n.code,{children:"@bento/text"}),", ",e.jsx(n.code,{children:"@bento/focus-lock"}),", ",e.jsx(n.code,{children:"@bento/scroll-lock"}),", ",e.jsx(n.code,{children:"@bento/visually-hidden"})]}),`
`,e.jsx(n.li,{children:"MUST expose data-* attributes to support styling, animations, testing etc"}),`
`,e.jsx(n.li,{children:"MUST be composable: consumers can replace, or remove pieces via slots without losing behavior"}),`
`]}),`
`,e.jsx(n.h3,{id:"integration-approach",children:"Integration Approach"}),`
`,e.jsx(n.p,{children:"We extend and wrap React Aria's hooks to fit Bento's composition model:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"State management"}),": Uses React Aria's ",e.jsx(n.code,{children:"useOverlayTriggerState"})," for controlled/uncontrolled state handling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props distribution"}),": React Aria's hook return values are distributed via slots to children, following Bento's composition guidelines"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primitive wrapping"}),": React Aria hooks are wrapped in Bento primitives (FocusLock, ScrollLock) for consistent API and behavior"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No gaps"}),": React Aria handles all edge cases for overlay behavior across devices - no additional logic needed beyond integration"]}),`
`]}),`
`,e.jsx(n.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsx(n.h3,{id:"props-interface",children:"Props Interface"}),`
`,e.jsx(n.p,{children:"The Overlay component accepts the following props:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface OverlayProps extends Slots {
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
`,e.jsx(n.p,{children:`The Overlay component manages state and coordinates React Aria hooks, passing
props via slots to children. Dismissal behavior, modal configuration, and other
overlay behaviors are controlled by the consumer through manual composition of
primitives (Portal, ScrollLock, FocusLock, Dismiss, etc.) as shown in the
Composition section.`}),`
`,e.jsx(n.h3,{id:"controlled-vs-uncontrolled-usage",children:"Controlled vs Uncontrolled Usage"}),`
`,e.jsx(n.p,{children:"The Overlay supports both controlled and uncontrolled state management:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Controlled"})," - Component manages state externally:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const [open, setOpen] = useState(false);
<Overlay open={open} onOpenChange={setOpen}>
  {/* content */}
</Overlay>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Uncontrolled"})," - Overlay manages state internally:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Overlay defaultOpen={false}>
  <Button slot="trigger">
    Requires a trigger slot so it can set the relevant props on the trigger element
  </Button>
</Overlay>
`})}),`
`,e.jsxs(n.p,{children:["State management uses React Aria's ",e.jsx(n.code,{children:"useOverlayTriggerState"}),` hook, which handles
synchronization and event composition automatically.`]}),`
`,e.jsx(n.h3,{id:"dismissal-behavior",children:"Dismissal Behavior"}),`
`,e.jsx(n.p,{children:"Dismissal behavior is controlled by the consumer through manual composition:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Click outside"}),": Handled via React Aria's ",e.jsx(n.code,{children:"underlayProps"})," passed to ",e.jsx(n.code,{children:'slot="backdrop"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Escape key"}),": Handled via React Aria's ",e.jsx(n.code,{children:"overlayProps"})," passed to ",e.jsx(n.code,{children:'slot="content"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Programmatic"}),": Consumers control dismissal via state updates (",e.jsx(n.code,{children:"onOpenChange"}),") or Dismiss components with ",e.jsx(n.code,{children:"onDismiss"})," callbacks"]}),`
`]}),`
`,e.jsx(n.h3,{id:"focus-management",children:"Focus Management"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus trapping"}),": Prevents tabbing outside the overlay while it's open (modal only, via FocusLock primitive)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Initial focus control"}),": Allows specifying which element receives focus when opened (autoFocus)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Return focus"}),": Returns focus to the trigger element when closed (restoreFocus)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus visibility"}),": Keyboard focus indicators shown appropriately for keyboard users"]}),`
`]}),`
`,e.jsx(n.h3,{id:"keyboard-support",children:"Keyboard Support"}),`
`,e.jsx(n.p,{children:"Keyboard support is provided through React Aria hooks and primitives:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Escape key"}),": Handled via React Aria's ",e.jsx(n.code,{children:"overlayProps"})," passed to ",e.jsx(n.code,{children:'slot="content"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tab navigation"}),": Contained within overlay via FocusLock primitive (configured by consumer)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus restoration"}),": Handled by FocusLock primitive's ",e.jsx(n.code,{children:"restoreFocus"})," prop (configured by consumer)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsx(n.p,{children:"The Overlay primitive is designed to work across different languages and layouts:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Direction-agnostic"}),": The overlay is direction-agnostic and uses logical properties for layout"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Portal rendering"}),": Portal rendering is direction-independent"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text expansion"}),": The component handles text expansion from different languages by using flexible layouts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No hardcoded text"}),": No text content in component itself - all text provided by consumers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA labels"}),": ARIA labels provided by consumers in appropriate locale"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content direction"}),": Content direction handled by consumers"]}),`
`]}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(n.p,{children:[`Parent composite (Overlay) owns state and passes handlers via slots. Children
(primitives like `,e.jsx(n.code,{children:"Container"}),", ",e.jsx(n.code,{children:"Button"}),", ",e.jsx(n.code,{children:"Text"}),") receive state through slots."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import * as React from 'react';
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
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"trigger"})," slot: Element that opens/closes the overlay (uses React Aria's ",e.jsx(n.code,{children:"useOverlayTrigger"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"backdrop"})," slot: Visual backdrop behind content (conditionally rendered for modal overlays)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"content"})," slot: Main overlay content with proper layering, focus handling, and dismissal"]}),`
`]}),`
`,e.jsx(n.h3,{id:"slot-map-and-state",children:"Slot map and state"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot"}),e.jsx(n.th,{children:"Purpose"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"backdrop"})}),e.jsx(n.td,{children:"Underlay behind content"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"Yes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"content"})}),e.jsx(n.td,{children:"Foreground content container"}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Yes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"trigger"})}),e.jsx(n.td,{children:"Element that opens/closes the overlay"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]})]})]}),`
`,e.jsx(n.h3,{id:"data-attributes",children:"Data attributes"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-state"})}),e.jsx(n.td,{children:"Current state of the overlay"}),e.jsx(n.td,{children:'"open" / "closed"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-override"})}),e.jsx(n.td,{children:"Indicates customized behavior"}),e.jsx(n.td,{children:'"style", "className"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-version"})}),e.jsx(n.td,{children:"Component version (dev only)"}),e.jsx(n.td,{children:'"overlay@1.0"'})]})]})]}),`
`,e.jsxs(n.p,{children:["Note: There is no separate ",e.jsx(n.code,{children:"data-topmost"})," attribute; topmost determination relies on DOM/portal order and React Aria overlay container semantics."]}),`
`,e.jsx(n.p,{children:"Example CSS-based animations:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-overlay [slot="content"][data-state="open"] { /* fade in */ }
.my-overlay [slot="content"][data-state="closed"] { /* fade out */ }
`})}),`
`,e.jsx(n.p,{children:"The component distributes the following props via slots:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"triggerProps"})," (from useOverlayTrigger) to ",e.jsx(n.code,{children:'slot="trigger"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"underlayProps"})," (from useModalOverlay) to ",e.jsx(n.code,{children:'slot="backdrop"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"overlayProps"})," (from useOverlay) to ",e.jsx(n.code,{children:'slot="content"'})," children"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"modalProps"})," (from useModal) to content container"]}),`
`]})]})}function x(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{x as default};
