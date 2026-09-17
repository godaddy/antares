import { useCallback, useEffect, useRef, type PointerEvent, type RefObject } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, [contenteditable]:not([contenteditable="false"])';
const CLICK_MS = 200;

/**
 * Forwards a short, non-dragging press on non-interactive content to the stretched primary.
 * Nested controls and nested Cards keep the event. Empty surface hits the primary natively.
 */
export function useForwardedClick(isEnabled: boolean, primaryRef: RefObject<HTMLElement | null>) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(function clearTimeoutOnUnmount() {
    return function clearPendingTimeout() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onPointerDown = useCallback(
    function startClickWindow() {
      if (!isEnabled) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(function expireClickWindow() {
        timeoutRef.current = null;
      }, CLICK_MS);
    },
    [isEnabled]
  );

  const onPointerUp = useCallback(
    function forwardShortPress(event: PointerEvent<HTMLDivElement>) {
      const primary = primaryRef.current;
      const target = event.target;
      if (!isEnabled || !(target instanceof Element) || !primary || timeoutRef.current == null) return;
      if (window.getSelection()?.toString()) return;
      if (target.closest(NESTED_CONTROL)) return;
      if (target.closest('[data-card]') !== event.currentTarget) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      primary.click();
    },
    [isEnabled, primaryRef]
  );

  if (!isEnabled) return {};
  return { onPointerDown, onPointerUp };
}
