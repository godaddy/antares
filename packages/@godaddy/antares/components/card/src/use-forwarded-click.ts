import { useCallback, useEffect, useRef, type PointerEvent } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, [contenteditable]:not([contenteditable="false"]), [data-corner-actions], [data-card-selection-control]';
const CLICK_MS = 200;

/**
 * Forwards a short, non-dragging press on non-interactive content to the Card's primary or selection
 * control. Nested controls and nested Cards keep the event.
 */
export function useForwardedClick(isEnabled: boolean, getTarget: (card: HTMLDivElement) => HTMLElement | null) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(function clearTimeoutOnUnmount() {
    return function clearPendingTimeout() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onPointerDown = useCallback(
    function startClickWindow(event: PointerEvent<HTMLDivElement>) {
      if (!isEnabled || event.button !== 0) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(function expireClickWindow() {
        timeoutRef.current = null;
      }, CLICK_MS);
    },
    [isEnabled]
  );

  const onPointerUp = useCallback(
    function forwardShortPress(event: PointerEvent<HTMLDivElement>) {
      const target = event.target;
      if (!isEnabled || event.button !== 0 || !(target instanceof Element) || timeoutRef.current == null) return;
      if (window.getSelection()?.toString()) return;
      if (target.closest(NESTED_CONTROL)) return;
      if (target.closest('[data-card]') !== event.currentTarget) return;

      const destination = getTarget(event.currentTarget);
      if (!destination || destination === target || destination.contains(target)) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      destination.click();
    },
    [getTarget, isEnabled]
  );

  if (!isEnabled) return {};
  return { onPointerDown, onPointerUp };
}
