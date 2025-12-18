// v8 ignore: Import statement is not executable code and doesn't affect coverage.
/* v8 ignore next */
import { type ForwardedRef, useEffect, useRef } from 'react';

/**
 * Safe alternative to React Aria's useObjectRef that handles frozen/sealed refs in test environments.
 *
 * Vitest browser mode can freeze ref objects during test isolation, causing React Aria's useObjectRef
 * to throw when attempting assignment. This hook creates an internal ref that always works, and
 * gracefully handles forwarding to frozen external refs.
 *
 * Trade-off: If the external ref is frozen, it stays null but the component still functions.
 *
 * @param ref - The forwarded ref to handle safely
 * @returns A safe ref object that works even with frozen refs
 * @public
 */
export function useSafeObjectRef<T>(ref: ForwardedRef<T>): React.RefObject<T> {
  const internalRef = useRef<T>(null);

  useEffect(function updateForwardedRef() {
    const current = internalRef.current;

    if (typeof ref === 'function') {
      ref(current);
    } else if (ref && 'current' in ref) {
      // Vitest browser mode can freeze refs during test isolation, check before attempting assignment
      if (Object.isFrozen(ref) || Object.isSealed(ref)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[useSafeObjectRef] Could not update forwarded ref (frozen/sealed). Component renders correctly but external ref stays null.'
          );
        }
      } else {
        // ForwardedRef<T> is a union; we've handled function refs and null, so this must be MutableRefObject
        (ref as React.MutableRefObject<T | null>).current = current;
      }
    }
  });

  return internalRef;
}
