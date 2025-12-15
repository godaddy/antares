/* v8 ignore next */
import { type ForwardedRef, useEffect, useRef } from 'react';

/**
 * Safe wrapper for React Aria's useObjectRef that handles test environments where refs are not extensible.
 *
 * **Critical for Vitest Browser Mode Testing**: When running tests in Vitest's browser mode with Playwright,
 * the test environment can freeze or make objects non-extensible. React Aria's `useObjectRef` attempts to
 * dynamically add properties to ref objects, which fails with "Cannot add property current, object is not extensible"
 * in these constrained test environments.
 *
 * **Technical Details:**
 * - Vitest browser mode uses Playwright's Chrome DevTools Protocol for test execution
 * - The V8 engine's security model can freeze objects during test isolation
 * - React Aria's useObjectRef uses `Object.defineProperty()` to add reactive properties to refs
 * - This conflicts with frozen objects in browser testing scenarios
 *
 * **Why This Solution Works:**
 * - Creates an internal ref that's always mutable (created in our controlled environment)
 * - Safely forwards values to the external ref using try/catch for frozen object scenarios
 * - Maintains the same ref forwarding behavior as React Aria's useObjectRef in normal environments
 * - Gracefully degrades in test environments without breaking functionality
 *
 * **Production Impact**: Zero. Object freezing only occurs in specific test configurations.
 * In production and development, this behaves identically to React Aria's useObjectRef.
 *
 * @template T - The type of the ref element
 * @param {React.ForwardedRef<T>} ref - The forwarded ref to handle safely
 * @returns {React.RefObject<T>} A safe ref object that works in all environments including frozen test contexts
 * @public
 */
export function useSafeObjectRef<T>(ref: ForwardedRef<T>): React.RefObject<T> {
  const internalRef = useRef<T>(null);

  useEffect(function updateForwardedRef() {
    const current = internalRef.current;

    if (typeof ref === 'function') {
      ref(current);
    } else if (ref && 'current' in ref) {
      try {
        (ref as React.MutableRefObject<T | null>).current = current;
        /* v8 ignore start */
      } catch {
        //
        // Silently ignore errors in test environments where objects might be frozen.
        // This specifically handles Vitest browser mode with Playwright where the V8 engine
        // may freeze ref objects during test isolation, preventing dynamic property assignment.
        //
      }
      /* v8 ignore stop */
    }
  });

  return internalRef;
}
