import { useRef, type MutableRefObject, type RefObject, type ForwardedRef } from 'react';

/**
 * Converts a ForwardedRef into a safe RefObject that works with React Aria hooks.
 * React Aria hooks require a RefObject, but forwardRef provides a ForwardedRef which can be null or a callback.
 * This utility ensures we always have a stable RefObject to pass to hooks.
 *
 * @param ref - The forwarded ref from React.forwardRef
 * @returns A stable RefObject that can be used with React Aria hooks
 * @internal
 */
export function useSafeObjectRef<T>(ref: ForwardedRef<T>): RefObject<T> {
  const internalRef = useRef<T>(null);

  // If ref is a callback ref, call it whenever internalRef.current changes
  if (typeof ref === 'function') {
    const current = internalRef.current;
    if (current !== null) {
      ref(current);
    }
  } else if (ref) {
    // If ref is a RefObject, sync it with our internal ref
    (ref as MutableRefObject<T | null>).current = internalRef.current;
  }

  return internalRef;
}
