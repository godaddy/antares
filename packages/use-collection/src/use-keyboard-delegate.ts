import { useMemo, type RefObject } from 'react';
import { ListKeyboardDelegate } from 'react-aria';
import type { Orientation } from 'react-stately';

/**
 * Configuration for the keyboard delegate hook.
 * @public
 */
export interface KeyboardDelegateConfig {
  /** The collection of items */
  readonly collection: any;
  /** Intl collator for string comparison in type-ahead */
  readonly collator: Intl.Collator;
  /** Reference to the collection DOM element */
  readonly ref: RefObject<HTMLElement>;
  /** Selection manager from the state */
  readonly selectionManager: {
    readonly disabledBehavior?: 'selection' | 'all';
    readonly disabledKeys?: Set<any>;
  };
  /** Text direction */
  readonly direction: 'ltr' | 'rtl';
  /** Layout mode (stack or grid) */
  readonly layout?: 'stack' | 'grid';
  /** Primary orientation of the items */
  readonly orientation?: Orientation;
  /** Custom keyboard delegate to use instead of default */
  readonly keyboardDelegate?: ListKeyboardDelegate<unknown>;
}

/**
 * Creates and memoizes a keyboard delegate for collection components.
 *
 * **React Aria Delegation**: This hook delegates keyboard navigation to React Aria's
 * `ListKeyboardDelegate`, which implements WAI-ARIA APG 1.2 keyboard patterns for collections.
 *
 * **Explicit Dependencies (bento-invariants #44)**: Every value referenced inside the memoized
 * function appears in the dependency array to prevent stale closures and unnecessary re-renders.
 *
 * **Why React Aria's ListKeyboardDelegate**:
 * - React Aria defines canonical keyboard navigation patterns (arrow keys, home/end, type-ahead)
 * - bento-invariants #1 requires delegating keyboard behavior to React Aria hooks
 * - bento-invariants #21 requires WAI-ARIA compliance via React Aria
 * - No Bento primitive exists for keyboard delegation
 *
 * @param {KeyboardDelegateConfig} config - Configuration for the keyboard delegate
 * @returns {ListKeyboardDelegate<unknown>} A keyboard delegate instance for handling keyboard interactions
 * @public
 */
export function useKeyboardDelegate({
  collection,
  collator,
  ref,
  selectionManager,
  direction,
  layout,
  orientation,
  keyboardDelegate: providedDelegate
}: KeyboardDelegateConfig): ListKeyboardDelegate<unknown> {
  const { disabledBehavior, disabledKeys } = selectionManager;

  // Explicit dependency array - every referenced value included (bento-invariants #44)
  return useMemo(
    function createKeyboardDelegate() {
      return (
        providedDelegate ||
        new ListKeyboardDelegate({
          collection,
          collator,
          ref,
          disabledKeys,
          disabledBehavior,
          layout,
          orientation,
          direction
        })
      );
    },
    [collection, collator, ref, disabledKeys, disabledBehavior, layout, orientation, direction, providedDelegate]
  );
}
