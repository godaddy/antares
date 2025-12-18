import { useDataAttributes } from '@bento/use-data-attributes';
import { usePreventScroll } from '@react-aria/overlays';
import { withSlots, type Slots } from '@bento/slots';
import { Box, type BoxContext } from '@bento/box';
import { useEffect, useContext } from 'react';
import { useProps } from '@bento/use-props';
import type { ReactNode } from 'react';

/**
 * Options for the useScrollLock hook.
 *
 * @public
 */
export interface ScrollLockOptions {
  /**
   * Whether scroll locking is disabled.
   * When true, scrolling is not prevented.
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Hook that prevents scrolling on the document body while active.
 *
 * This hook wraps React Aria's `usePreventScroll` hook and adds Bento-specific
 * data attributes for debugging and styling purposes. React Aria handles all
 * scroll prevention including:
 * - Touch events and iOS Safari rubber-band scrolling
 * - Scrollbar width compensation to prevent layout shift
 * - Cross-browser normalization
 * - Proper cleanup and restoration
 *
 * @param options - Configuration options for scroll locking
 *
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   useScrollLock({ isDisabled: !isOpen });
 *   return <div>Modal content</div>;
 * }
 * ```
 *
 * @public
 */
export function useScrollLock(options: ScrollLockOptions = {}) {
  const { isDisabled = false } = options;
  const { env } = useContext<BoxContext<any>>(Box);

  // React Aria provides comprehensive scroll prevention
  usePreventScroll({
    isDisabled
  });

  // Generate data attributes for debugging
  const dataAttributes = useDataAttributes({
    scrollLocked: !isDisabled
  });

  // Apply data attributes to document body using Box environment
  useEffect(
    function applyScrollLockAttributes() {
      const doc = env.document();
      if (!doc) return;

      const entries = Object.entries(dataAttributes);

      entries.forEach(function applyAttribute([key, value]) {
        // Always set the attribute, even if the value is "false"
        doc?.body?.setAttribute(key, value as string);
      });

      return function cleanup() {
        entries.forEach(function removeAttribute([key]) {
          doc?.body?.removeAttribute(key);
        });
      };
    },
    [dataAttributes, env]
  );
}

/**
 * Props for the ScrollLock component.
 *
 * @public
 */
export interface ScrollLockProps extends Slots, ScrollLockOptions {
  /**
   * Optional children to render.
   * ScrollLock doesn't render any DOM elements, so children are optional.
   */
  children?: ReactNode;
}

/**
 * Component that prevents background scrolling while mounted.
 *
 * This component is a thin wrapper around the `useScrollLock` hook, providing
 * a declarative API for scroll locking. It doesn't render any DOM elements and
 * simply calls the hook to manage scroll prevention.
 *
 * The component integrates with React Aria's scroll prevention and adds
 * data attributes to `document.body` for debugging and styling.
 *
 * @component
 * @param args - The properties {@link ScrollLockProps} passed to the ScrollLock component.
 *
 * @example
 * ```tsx
 * // Basic usage - prevents scrolling while mounted
 * function App() {
 *   return (
 *     <>
 *       <ScrollLock />
 *       <Modal>Content</Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional scroll locking
 * function App({ isModalOpen }) {
 *   return (
 *     <>
 *       <ScrollLock isDisabled={!isModalOpen} />
 *       {isModalOpen && <Modal>Content</Modal>}
 *     </>
 *   );
 * }
 * ```
 *
 * @public
 */
export const ScrollLock = withSlots('BentoScrollLock', function ScrollLock(args: ScrollLockProps) {
  const { props } = useProps(args);

  //
  // We pass the props into the hook, this allows our ScrollLock component to be
  // used as a slot, and receive overrides if needed.
  //
  useScrollLock(props);

  // ScrollLock doesn't render any DOM elements
  // It only manages scroll prevention through the hook
  return props.children || null;
}) as (props: ScrollLockProps) => ReactNode;
