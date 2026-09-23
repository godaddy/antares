import { useRef, type MouseEvent, type MouseEventHandler } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [data-react-aria-pressable], [role="button"], [role="link"], [tabindex], [data-corner-actions], [data-card-selection-control]';

function isSurfaceTarget(event: MouseEvent<HTMLDivElement>, view: Window & typeof globalThis) {
  const { target, currentTarget } = event;
  if (!(target instanceof view.Element) || target.closest('[data-card]') !== currentTarget) return false;

  const control = target.closest(NESTED_CONTROL);
  return !control || control === currentTarget || !currentTarget.contains(control);
}

/** Forwards surface clicks, leaving text selection and independent controls alone. */
export function useForwardedClick(
  getTarget: (card: HTMLDivElement) => HTMLElement | null,
  onClick: MouseEventHandler<HTMLDivElement> | undefined
): MouseEventHandler<HTMLDivElement> {
  const forwardingRef = useRef(false);

  return function forwardClick(event) {
    if (forwardingRef.current) {
      event.stopPropagation();
      return;
    }
    onClick?.(event);
    const { ownerDocument } = event.currentTarget;
    const view = ownerDocument.defaultView;
    if (!view || event.defaultPrevented || event.button !== 0 || !isSurfaceTarget(event, view)) return;

    const selection = ownerDocument.getSelection();
    if (selection?.toString() && selection.containsNode(event.currentTarget, true)) return;

    const destination = getTarget(event.currentTarget);
    if (!destination) return;
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    forwardingRef.current = true;
    try {
      destination.focus({ preventScroll: true });
      destination.dispatchEvent(
        new view.MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          composed: true,
          view,
          altKey,
          ctrlKey,
          metaKey,
          shiftKey
        })
      );
    } finally {
      forwardingRef.current = false;
    }
  };
}
