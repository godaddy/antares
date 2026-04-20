import{j as e}from"./iframe-BwwayHwL.js";import{useMDXComponents as r}from"./index-CYG46D1d.js";import{M as t}from"./blocks-BMDnQ5cq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-yiqH1db5.js";import"./index-uAhaQxh8.js";import"./index-99z7f_MC.js";import"./index-DrFu-skq.js";function s(i){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Architecture/PDRs/ScrollLock"}),`
`,e.jsx(n.h1,{id:"scrolllock-primitive-pdr",children:"ScrollLock Primitive PDR"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(n.p,{children:["The ScrollLock primitive provides a Bento-wrapped interface around React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," hook, focusing primarily on API consistency and data attributes for debugging purposes."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Research Finding"}),": React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," includes comprehensive scroll prevention and layout stability features. According to the official documentation: ",e.jsx(n.em,{children:'"Prevents scrolling on the document body on mount, and restores it on unmount. Also ensures that content does not shift due to the scrollbars disappearing."'})]}),`
`,e.jsx(n.p,{children:"This research indicates that scrollbar compensation is already handled by the underlying React Aria implementation."}),`
`,e.jsx(n.h3,{id:"actual-unique-attributes",children:"Actual Unique Attributes"}),`
`,e.jsx(n.p,{children:"Given React Aria's comprehensive implementation, the ScrollLock primitive provides:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Attributes"}),": Adds debugging and styling hooks via ",e.jsx(n.code,{children:"data-scroll-locked"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Environment Integration"}),": Uses Bento's Box context for consistent document/window access"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"TypeScript Types"}),": Provides Bento-aligned type definitions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistent API"}),": Follows Bento's hook patterns for familiarity"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Optional Enhancements"}),": Additional configuration options if needed"]}),`
`]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsx(n.p,{children:"The ScrollLock primitive is built using:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"React Aria Foundation"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"usePreventScroll"})," - Comprehensive scroll prevention including:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Touch events, iOS Safari issues, and proper cleanup"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Built-in scrollbar compensation"})," (prevents layout shift)"]}),`
`,e.jsx(n.li,{children:"Keyboard scroll prevention and scroll chain management"}),`
`,e.jsx(n.li,{children:"Cross-browser normalization"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Minimal Bento Enhancements"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Data attributes using ",e.jsx(n.code,{children:"@bento/use-data-attributes"})," for debugging"]}),`
`,e.jsx(n.li,{children:"Consistent TypeScript types with Bento patterns"}),`
`,e.jsx(n.li,{children:"API alignment with other Bento hooks"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Given React Aria's built-in scrollbar compensation and layout shift prevention, this primitive serves as a ",e.jsx(n.strong,{children:"thin wrapper"})," that adds Bento-specific conventions while leveraging the underlying functionality."]}),`
`,e.jsx(n.h2,{id:"implementation-patterns",children:"Implementation Patterns"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Concept"}),e.jsx(n.th,{children:"Implementation"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"React Aria"}),e.jsx(n.td,{children:"Direct use of usePreventScroll with all its built-in features"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Bento Environment"}),e.jsx(n.td,{children:"Uses Box context for document/window access"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"State Management"}),e.jsx(n.td,{children:"React Aria manages scroll state and layout compensation"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Platform Detection"}),e.jsx(n.td,{children:"React Aria provides iOS/Android and scrollbar support"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Cleanup"}),e.jsx(n.td,{children:"React Aria manages listeners and style restoration"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"TypeScript"}),e.jsx(n.td,{children:"Potentially extends PreventScrollOptions if needed"})]})]})]}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(n.p,{children:["Given that React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," already handles scrollbar compensation, the ScrollLock primitive becomes much simpler:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Simplified hook structure
export function useScrollLock(options: ScrollLockOptions = {}) {
  // React Aria handles everything including scrollbar compensation
  usePreventScroll(options);

  // Add minimal Bento-specific enhancements
  useDataAttributes(options);
  // Environment integration if needed
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Scope Refinement"}),": Given React Aria's comprehensive feature set, this primitive focuses on:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data attributes"}),": For debugging and styling hooks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API consistency"}),": Aligning with Bento's hook patterns"]}),`
`]}),`
`,e.jsx(n.p,{children:"The implementation leverages React Aria's existing capabilities rather than duplicating functionality."}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(n.p,{children:["ScrollLock is built directly on top of React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," hook, which provides comprehensive scroll prevention including:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Touch event handling for mobile devices"}),`
`,e.jsx(n.li,{children:"iOS Safari rubber-band scrolling prevention"}),`
`,e.jsx(n.li,{children:"Proper cleanup and restoration"}),`
`,e.jsx(n.li,{children:"Support for both document and element-level scroll locking"}),`
`,e.jsx(n.li,{children:"Chain-based scroll prevention for nested elements"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Our Adoption of React Aria"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// React Aria's usePreventScroll provides the core functionality
import { usePreventScroll } from '@react-aria/overlays';

// Bento wraps it for consistency with our patterns
import { useScrollLock } from '@bento/use-scroll-lock';

function BentoModal(props) {
  // React Aria for modal behavior
  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(props, ref);

  // Bento wrapper around usePreventScroll
  useScrollLock({
    isDisabled: !props.isOpen,
    preserveScrollBarGap: true // Our addition
  });

  // Combine for complete solution
  return <div {...modalProps} {...overlayProps} />;
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"What Bento Adds"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Data attributes for debugging and styling"}),`
`,e.jsx(n.li,{children:"Consistent API with other Bento hooks"}),`
`,e.jsx(n.li,{children:"TypeScript types aligned with Bento patterns"}),`
`]}),`
`,e.jsx(n.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsx(n.h3,{id:"hook-api",children:"Hook API"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { PreventScrollOptions } from '@react-aria/overlays';

interface ScrollLockOptions extends PreventScrollOptions {
  // From React Aria's PreventScrollOptions:
  // - isDisabled?: boolean
  // React Aria includes built-in scrollbar compensation

  // Note: Data attributes are automatically generated using @bento/use-data-attributes
  // The hook exposes scroll lock state as data-scroll-locked="true|false"
}
`})}),`
`,e.jsx(n.h3,{id:"implementation-details",children:"Implementation Details"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { usePreventScroll } from '@react-aria/overlays';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useLayoutEffect } from 'react';

export function useScrollLock(options: ScrollLockOptions = {}) {
  const { isDisabled = false, ...reactAriaOptions } = options;

  // React Aria provides comprehensive scroll prevention
  usePreventScroll({
    isDisabled,
    ...reactAriaOptions
  });

  // Generate data attributes for debugging
  const dataAttributes = useDataAttributes({
    scrollLocked: !isDisabled
  });

  // Apply data attributes to document body
  useLayoutEffect(() => {
    const entries = Object.entries(dataAttributes);

    entries.forEach(([key, value]) => {
      if (value) {
        document.body.setAttribute(key, value);
      }
    });

    return () => {
      entries.forEach(([key]) => {
        document.body.removeAttribute(key);
      });
    };
  }, [dataAttributes]);
};
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Implementation Note"}),": React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," provides the following features:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Scrollbar width calculation and compensation"}),`
`,e.jsx(n.li,{children:"Layout shift prevention"}),`
`,e.jsx(n.li,{children:"Cross-browser scroll prevention"}),`
`,e.jsx(n.li,{children:"Touch event handling"}),`
`,e.jsx(n.li,{children:"iOS Safari fixes"}),`
`,e.jsx(n.li,{children:"Proper cleanup and restoration"}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility-highlights",children:"Accessibility Highlights"}),`
`,e.jsxs(n.p,{children:["React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," provides comprehensive accessibility support that we inherit:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader Compatibility"}),": Doesn't interfere with virtual cursor navigation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus Management Integration"}),": Works seamlessly with React Aria's ",e.jsx(n.code,{children:"useFocusScope"})," and ",e.jsx(n.code,{children:"useModal"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Support"}),": Prevents all keyboard-based scrolling (arrows, Page Up/Down, Home/End, spacebar)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Touch Accessibility"}),": Handles touch events properly on mobile devices"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Scroll Chains"}),": Prevents scroll propagation through parent containers"]}),`
`]}),`
`,e.jsx(n.p,{children:"Our Bento additions maintain accessibility by:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Non-intrusive"}),": Data attributes don't interfere with React Aria's accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Debug Support"}),": Helps with accessibility testing without affecting ARIA semantics"]}),`
`]}),`
`,e.jsx(n.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsxs(n.p,{children:["React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," handles:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile Safari"}),": iOS rubber-band scrolling and position:fixed issues"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Android Chrome"}),": Touch event handling and pull-to-refresh prevention"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-Browser"}),": Normalized behavior across all major browsers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Touch Events"}),": Comprehensive touch, wheel, and keyboard event prevention"]}),`
`]}),`
`,e.jsx(n.p,{children:"Our minimal Bento wrapper ensures:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Full Compatibility"}),": Inherits all React Aria's RTL and mobile support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Interference"}),": Data attributes don't affect React Aria's cross-platform behavior"]}),`
`]}),`
`,e.jsx(n.h2,{id:"data-attributes-and-slot-map",children:"Data Attributes and Slot Map"}),`
`,e.jsxs(n.h3,{id:"expected-data--attributes",children:["Expected ",e.jsx(n.code,{children:"data-*"})," Attributes"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-scroll-locked"})}),e.jsx(n.td,{children:"Indicates when scroll lock is active"}),e.jsx(n.td,{children:'"true" / "false"'})]})})]}),`
`,e.jsx(n.p,{children:"Note: As a behavioral hook, ScrollLock doesn't use slots but does apply data attributes for debugging and potential styling hooks."}),`
`,e.jsx(n.h2,{id:"competitive-research",children:"Competitive Research"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["React Aria ",e.jsx(n.code,{children:"usePreventScroll"})]}),": Comprehensive solution with scrollbar compensation, mobile support, and accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Radix UI ",e.jsx(n.code,{children:"RemoveScroll"})]}),": Good ref counting but less iOS support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Headless UI"}),": Built into Dialog, not available as standalone"]}),`
`,e.jsx(n.li,{children:"**body-scroll-lock`: Popular but abandoned, has memory leaks"}),`
`,e.jsx(n.li,{children:"**react-remove-scroll`: Comprehensive but heavy dependency"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Key Finding"}),": React Aria's ",e.jsx(n.code,{children:"usePreventScroll"})," is already the best-in-class solution. Our wrapper adds minimal value beyond API consistency and debugging attributes."]}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(n.h3,{id:"basic-integration-with-react-aria-modal",children:"Basic Integration with React Aria Modal"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useModal, useOverlay, useDialog } from '@react-aria/overlays';
import { useScrollLock } from '@bento/use-scroll-lock';
import { withSlots } from '@bento/slots';

export const Modal = withSlots('BentoModal', function Modal(props) {
  const { isOpen, onClose, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  // React Aria hooks for modal behavior
  const { overlayProps, underlayProps } = useOverlay(
    { isOpen, onClose, isDismissable: true },
    ref
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({}, ref);

  // Bento scroll lock (thin wrapper around React Aria's usePreventScroll)
  useScrollLock({
    isDisabled: !isOpen
  });

  if (!isOpen) return null;

  return (
    <div {...underlayProps} className="underlay">
      <div
        {...overlayProps}
        {...dialogProps}
        {...modalProps}
        ref={ref}
        slot="modal"
      >
        {children}
      </div>
    </div>
  );
});
`})})]})}function x(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{x as default};
