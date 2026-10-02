import { useCallback, useMemo, useSyncExternalStore } from 'react';

export interface UseMediaQueryOptions {
  /** Match returned on the server and during initial hydration, or when matchMedia is unavailable. */
  ssrMatch: boolean;
}

/**
 * Observes a viewport or device media query. Prefer CSS for responsive styling.
 *
 * The explicit server fallback keeps hydration consistent. After hydration, the browser's
 * match is used; a different result can change the rendered content. Container queries are
 * evaluated by CSS and are not supported by this hook.
 *
 * @example
 * ```tsx
 * const isLarge = useMediaQuery(viewportQueries.lg, { ssrMatch: false });
 * ```
 */
export function useMediaQuery(query: string, { ssrMatch }: UseMediaQueryOptions): boolean {
  const mediaQuery = useMemo(
    function createMediaQuery() {
      return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia(query)
        : undefined;
    },
    [query]
  );

  const subscribe = useCallback(
    function subscribe(onChange: () => void) {
      mediaQuery?.addEventListener('change', onChange);
      return function unsubscribe() {
        mediaQuery?.removeEventListener('change', onChange);
      };
    },
    [mediaQuery]
  );

  const getSnapshot = useCallback(
    function getSnapshot() {
      return mediaQuery?.matches ?? ssrMatch;
    },
    [mediaQuery, ssrMatch]
  );

  const getServerSnapshot = useCallback(
    function getServerSnapshot() {
      return ssrMatch;
    },
    [ssrMatch]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
