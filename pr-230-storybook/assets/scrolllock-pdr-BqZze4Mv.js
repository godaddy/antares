import{i as e}from"./preload-helper-BnI5NLmJ.js";import{y as t}from"./iframe-CYlfG3ez.js";import{S as n,s as r,u as i}from"./blocks-DKHekxfZ.js";import{t as a}from"./mdx-react-shim-BOW4Oiqi.js";function o(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/ScrollLock`}),`
`,(0,c.jsx)(t.h1,{id:`scrolllock-primitive-pdr`,children:`ScrollLock Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`The ScrollLock primitive provides a Bento-wrapped interface around React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` hook, focusing primarily on API consistency and data attributes for debugging purposes.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Research Finding`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` includes comprehensive scroll prevention and layout stability features. According to the official documentation: `,(0,c.jsx)(t.em,{children:`"Prevents scrolling on the document body on mount, and restores it on unmount. Also ensures that content does not shift due to the scrollbars disappearing."`})]}),`
`,(0,c.jsx)(t.p,{children:`This research indicates that scrollbar compensation is already handled by the underlying React Aria implementation.`}),`
`,(0,c.jsx)(t.h3,{id:`actual-unique-attributes`,children:`Actual Unique Attributes`}),`
`,(0,c.jsx)(t.p,{children:`Given React Aria's comprehensive implementation, the ScrollLock primitive provides:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Data Attributes`}),`: Adds debugging and styling hooks via `,(0,c.jsx)(t.code,{children:`data-scroll-locked`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Environment Integration`}),`: Uses Bento's Box context for consistent document/window access`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`TypeScript Types`}),`: Provides Bento-aligned type definitions`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Consistent API`}),`: Follows Bento's hook patterns for familiarity`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Optional Enhancements`}),`: Additional configuration options if needed`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsx)(t.p,{children:`The ScrollLock primitive is built using:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`React Aria Foundation`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`usePreventScroll`}),` - Comprehensive scroll prevention including:`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Touch events, iOS Safari issues, and proper cleanup`}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Built-in scrollbar compensation`}),` (prevents layout shift)`]}),`
`,(0,c.jsx)(t.li,{children:`Keyboard scroll prevention and scroll chain management`}),`
`,(0,c.jsx)(t.li,{children:`Cross-browser normalization`}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Minimal Bento Enhancements`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Data attributes using `,(0,c.jsx)(t.code,{children:`@bento/use-data-attributes`}),` for debugging`]}),`
`,(0,c.jsx)(t.li,{children:`Consistent TypeScript types with Bento patterns`}),`
`,(0,c.jsx)(t.li,{children:`API alignment with other Bento hooks`}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Given React Aria's built-in scrollbar compensation and layout shift prevention, this primitive serves as a `,(0,c.jsx)(t.strong,{children:`thin wrapper`}),` that adds Bento-specific conventions while leveraging the underlying functionality.`]}),`
`,(0,c.jsx)(t.h2,{id:`implementation-patterns`,children:`Implementation Patterns`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Concept`}),(0,c.jsx)(t.th,{children:`Implementation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsx)(t.td,{children:`Direct use of usePreventScroll with all its built-in features`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Bento Environment`}),(0,c.jsx)(t.td,{children:`Uses Box context for document/window access`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`State Management`}),(0,c.jsx)(t.td,{children:`React Aria manages scroll state and layout compensation`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Platform Detection`}),(0,c.jsx)(t.td,{children:`React Aria provides iOS/Android and scrollbar support`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Cleanup`}),(0,c.jsx)(t.td,{children:`React Aria manages listeners and style restoration`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`TypeScript`}),(0,c.jsx)(t.td,{children:`Potentially extends PreventScrollOptions if needed`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.p,{children:[`Given that React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` already handles scrollbar compensation, the ScrollLock primitive becomes much simpler:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Simplified hook structure
export function useScrollLock(options: ScrollLockOptions = {}) {
  // React Aria handles everything including scrollbar compensation
  usePreventScroll(options);

  // Add minimal Bento-specific enhancements
  useDataAttributes(options);
  // Environment integration if needed
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Scope Refinement`}),`: Given React Aria's comprehensive feature set, this primitive focuses on:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Data attributes`}),`: For debugging and styling hooks`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API consistency`}),`: Aligning with Bento's hook patterns`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The implementation leverages React Aria's existing capabilities rather than duplicating functionality.`}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.p,{children:[`ScrollLock is built directly on top of React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` hook, which provides comprehensive scroll prevention including:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Touch event handling for mobile devices`}),`
`,(0,c.jsx)(t.li,{children:`iOS Safari rubber-band scrolling prevention`}),`
`,(0,c.jsx)(t.li,{children:`Proper cleanup and restoration`}),`
`,(0,c.jsx)(t.li,{children:`Support for both document and element-level scroll locking`}),`
`,(0,c.jsx)(t.li,{children:`Chain-based scroll prevention for nested elements`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Our Adoption of React Aria`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// React Aria's usePreventScroll provides the core functionality
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`What Bento Adds`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Data attributes for debugging and styling`}),`
`,(0,c.jsx)(t.li,{children:`Consistent API with other Bento hooks`}),`
`,(0,c.jsx)(t.li,{children:`TypeScript types aligned with Bento patterns`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsx)(t.h3,{id:`hook-api`,children:`Hook API`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { PreventScrollOptions } from '@react-aria/overlays';

interface ScrollLockOptions extends PreventScrollOptions {
  // From React Aria's PreventScrollOptions:
  // - isDisabled?: boolean
  // React Aria includes built-in scrollbar compensation

  // Note: Data attributes are automatically generated using @bento/use-data-attributes
  // The hook exposes scroll lock state as data-scroll-locked="true|false"
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`implementation-details`,children:`Implementation Details`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { usePreventScroll } from '@react-aria/overlays';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Implementation Note`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` provides the following features:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Scrollbar width calculation and compensation`}),`
`,(0,c.jsx)(t.li,{children:`Layout shift prevention`}),`
`,(0,c.jsx)(t.li,{children:`Cross-browser scroll prevention`}),`
`,(0,c.jsx)(t.li,{children:`Touch event handling`}),`
`,(0,c.jsx)(t.li,{children:`iOS Safari fixes`}),`
`,(0,c.jsx)(t.li,{children:`Proper cleanup and restoration`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`accessibility-highlights`,children:`Accessibility Highlights`}),`
`,(0,c.jsxs)(t.p,{children:[`React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` provides comprehensive accessibility support that we inherit:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Screen Reader Compatibility`}),`: Doesn't interfere with virtual cursor navigation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus Management Integration`}),`: Works seamlessly with React Aria's `,(0,c.jsx)(t.code,{children:`useFocusScope`}),` and `,(0,c.jsx)(t.code,{children:`useModal`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Keyboard Support`}),`: Prevents all keyboard-based scrolling (arrows, Page Up/Down, Home/End, spacebar)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Touch Accessibility`}),`: Handles touch events properly on mobile devices`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Scroll Chains`}),`: Prevents scroll propagation through parent containers`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Our Bento additions maintain accessibility by:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Non-intrusive`}),`: Data attributes don't interfere with React Aria's accessibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Debug Support`}),`: Helps with accessibility testing without affecting ARIA semantics`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsxs)(t.p,{children:[`React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` handles:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mobile Safari`}),`: iOS rubber-band scrolling and position:fixed issues`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Android Chrome`}),`: Touch event handling and pull-to-refresh prevention`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Cross-Browser`}),`: Normalized behavior across all major browsers`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Touch Events`}),`: Comprehensive touch, wheel, and keyboard event prevention`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Our minimal Bento wrapper ensures:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Full Compatibility`}),`: Inherits all React Aria's RTL and mobile support`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No Interference`}),`: Data attributes don't affect React Aria's cross-platform behavior`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-and-slot-map`,children:`Data Attributes and Slot Map`}),`
`,(0,c.jsxs)(t.h3,{id:`expected-data--attributes`,children:[`Expected `,(0,c.jsx)(t.code,{children:`data-*`}),` Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsx)(t.tbody,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-scroll-locked`})}),(0,c.jsx)(t.td,{children:`Indicates when scroll lock is active`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]})})]}),`
`,(0,c.jsx)(t.p,{children:`Note: As a behavioral hook, ScrollLock doesn't use slots but does apply data attributes for debugging and potential styling hooks.`}),`
`,(0,c.jsx)(t.h2,{id:`competitive-research`,children:`Competitive Research`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`React Aria `,(0,c.jsx)(t.code,{children:`usePreventScroll`})]}),`: Comprehensive solution with scrollbar compensation, mobile support, and accessibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Radix UI `,(0,c.jsx)(t.code,{children:`RemoveScroll`})]}),`: Good ref counting but less iOS support`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Headless UI`}),`: Built into Dialog, not available as standalone`]}),`
`,(0,c.jsx)(t.li,{children:"**body-scroll-lock`: Popular but abandoned, has memory leaks"}),`
`,(0,c.jsx)(t.li,{children:"**react-remove-scroll`: Comprehensive but heavy dependency"}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Key Finding`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),` is already the best-in-class solution. Our wrapper adds minimal value beyond API consistency and debugging attributes.`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-integration-with-react-aria-modal`,children:`Basic Integration with React Aria Modal`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { useModal, useOverlay, useDialog } from '@react-aria/overlays';
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
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};