import { useRef, type MouseEvent, type MouseEventHandler } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, [contenteditable]:not([contenteditable="false"]), [data-react-aria-pressable], [role="button"], [role="link"], [tabindex], [data-corner-actions], [data-card-selection-control]';

function isSurfaceTarget(event: MouseEvent<HTMLDivElement>) {
  const { target, currentTarget } = event;
  if (!(target instanceof Element) || target.closest('[data-card]') !== currentTarget) return false;

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
    if (event.defaultPrevented || event.button !== 0 || !isSurfaceTarget(event)) return;

    const selection = event.currentTarget.ownerDocument.getSelection();
    if (selection?.toString() && selection.containsNode(event.currentTarget, true)) return;

    const destination = getTarget(event.currentTarget);
    if (!destination) return;
    forwardingRef.current = true;
    try {
      destination.click();
    } finally {
      forwardingRef.current = false;
    }
  };
}
