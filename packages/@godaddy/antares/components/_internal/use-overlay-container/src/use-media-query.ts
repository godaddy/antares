import { useCallback, useMemo, useSyncExternalStore } from 'react';

export interface UseMediaQueryOptions {
  /** Match returned on the server and during initial hydration, or when matchMedia is unavailable. */
  ssrMatch: boolean;
}

/** Observes an internal overlay query with a stable server fallback. */
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

  return useSyncExternalStore(
    subscribe,
    function getSnapshot() {
      return mediaQuery?.matches ?? ssrMatch;
    },
    function getServerSnapshot() {
      return ssrMatch;
    }
  );
}
