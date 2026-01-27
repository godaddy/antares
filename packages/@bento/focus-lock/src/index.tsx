import React, { Children, cloneElement, isValidElement, type ReactNode, useState } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useFocusWithin } from '@react-aria/interactions';
import { withSlots, type Slots } from '@bento/slots';
import { FocusScope } from '@react-aria/focus';
import { useProps } from '@bento/use-props';

/**
 * State object passed to render prop functions
 * @public
 */
export interface FocusLockState {
  /**
   * Whether focus is currently within the scope
   */
  hasFocus: boolean;

  /**
   * Whether focus is contained within the scope
   */
  isContained: boolean;
}

export interface FocusLockProps extends Slots {
  /**
   * Whether to contain focus within the scope.
   * When true, focus will cycle between focusable elements within the scope.
   *
   * @default false
   */
  contain?: boolean;

  /**
   * Whether to restore focus to the previously focused element when the focus scope unmounts.
   *
   * @default false
   */
  restoreFocus?: boolean;

  /**
   * Whether to automatically focus the first focusable element when the focus scope mounts.
   *
   * @default false
   */
  autoFocus?: boolean;

  /**
   * The content to render inside the focus lock.
   * Can be a single element or multiple elements.
   */
  children?: ReactNode;

  /**
   * Callback fired when focus enters the scope
   */
  onFocusEnter?: (e: React.FocusEvent) => void;

  /**
   * Callback fired when focus leaves the scope
   */
  onFocusLeave?: (e: React.FocusEvent) => void;

  /**
   * Render prop for className
   */
  className?: ((state: FocusLockState) => string) | string;

  /**
   * Render prop for style
   */
  style?: ((state: FocusLockState) => React.CSSProperties) | React.CSSProperties;
}

/**
 * FocusLock manages focus within a scope, preventing focus from escaping and optionally
 * restoring focus when the scope is removed. Built on top of React ARIA's FocusScope.
 *
 * The FocusLock primitive provides essential focus management for modals, dialogs, drawers,
 * select popovers, and other overlay components that need to trap focus within their boundaries.
 *
 * This component does not add any wrapper elements - it applies data attributes directly to
 * its children, allowing for flexible composition with multiple elements or single elements.
 *
 * @component
 * @param args - The properties {@link FocusLockProps} passed to the FocusLock component.
 *
 * @example
 * ```tsx
 * // Overlay with multiple children (backdrop + content)
 * <FocusLock contain restoreFocus autoFocus>
 *   <div slot="backdrop" />
 *   <div slot="content">
 *     <h2>Modal Title</h2>
 *     <button>Close</button>
 *   </div>
 * </FocusLock>
 * ```
 *
 * @example
 * ```tsx
 * // Select popover with single child
 * <FocusLock contain restoreFocus autoFocus>
 *   <div className="popover">
 *     <ListBox>
 *       <ListBoxItem>Option 1</ListBoxItem>
 *       <ListBoxItem>Option 2</ListBoxItem>
 *     </ListBox>
 *   </div>
 * </FocusLock>
 * ```
 *
 * @example
 * ```tsx
 * // With render props for dynamic styling
 * <FocusLock
 *   contain
 *   className={({ hasFocus, isContained }) =>
 *     `modal ${isContained ? 'contained' : ''} ${hasFocus ? 'focused' : ''}`
 *   }
 *   style={({ hasFocus }) => ({
 *     opacity: hasFocus ? 1 : 0.8
 *   })}
 * >
 *   <div>Content</div>
 * </FocusLock>
 * ```
 *
 * @public
 */
export const FocusLock = withSlots('BentoFocusLock', function FocusLock(args: FocusLockProps) {
  const { contain = false, restoreFocus = false, autoFocus = false, children, onFocusEnter, onFocusLeave } = args;
  const [hasFocus, setHasFocus] = useState(false);

  // Track focus within the scope using React ARIA
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: function onFocusWithinChange(isFocusWithin) {
      setHasFocus(isFocusWithin);
    },
    onFocusWithin: onFocusEnter,
    onBlurWithin: onFocusLeave
  });

  // Create state object for render props
  const state: FocusLockState = {
    hasFocus,
    isContained: contain
  };

  // Pass state to useProps so render props can access it
  const { apply } = useProps(args, state);

  // Generate data attributes for focus lock state
  const data = useDataAttributes({
    'focus-contained': contain,
    'has-focus': hasFocus
  });

  if (!children) return null;

  //
  // Apply props to FocusScope for slot inheritance
  //
  const spread = apply({ contain, restoreFocus, autoFocus }, ['children', 'onFocusEnter', 'onFocusLeave']);

  //
  // Merge focus tracking props with data attributes to apply to children
  //
  const kids = { ...focusWithinProps, ...data };

  return (
    <FocusScope {...spread}>
      {Children.map(children, function applyDataAttributes(child) {
        return isValidElement(child) ? cloneElement(child as React.ReactElement, kids) : child;
      })}
    </FocusScope>
  );
}) as (props: FocusLockProps) => React.ReactElement | null;
