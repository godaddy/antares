import { useRef, useState, type MouseEvent, type MouseEventHandler, type PointerEvent } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [data-react-aria-pressable], [role="button"], [role="link"], [tabindex], [data-corner-actions], [data-card-selection-control]';

function isSurfaceTarget(event: MouseEvent<HTMLDivElement>, view: Window & typeof globalThis) {
  const { target, currentTarget } = event;
  if (!(target instanceof view.Element) || target.closest('[data-card]') !== currentTarget) return false;

  const control = target.closest(NESTED_CONTROL);
  return !control || control === currentTarget || !currentTarget.contains(control);
}

function isOwnControl(target: EventTarget, control: HTMLElement | null, view: Window & typeof globalThis) {
  if (!control || !(target instanceof view.Node)) return false;
  const labels = control instanceof view.HTMLInputElement ? Array.from(control.labels ?? []) : [];
  return [control, ...labels].some((element) => element.contains(target));
}

/**
 * Tracks presses the Card owns and forwards its surface clicks, leaving text selection and
 * independent controls alone. A nested widget that stops `pointerdown` propagation keeps its press.
 */
export function useSurfacePress(
  getTarget: (card: HTMLDivElement) => HTMLElement | null,
  onClick: MouseEventHandler<HTMLDivElement> | undefined
) {
  const forwardingRef = useRef(false);
  const ownsPressRef = useRef(false);
  const [isPressed, setPressed] = useState(false);

  function onPointerDownCapture() {
    ownsPressRef.current = false;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const { ownerDocument } = event.currentTarget;
    const view = ownerDocument.defaultView;
    if (!view || event.button !== 0) return;
    ownsPressRef.current = isSurfaceTarget(event, view);
    if (!ownsPressRef.current && !isOwnControl(event.target, getTarget(event.currentTarget), view)) return;

    setPressed(true);
    function release() {
      setPressed(false);
      ownerDocument.removeEventListener('pointerup', release, true);
      ownerDocument.removeEventListener('pointercancel', release, true);
    }
    ownerDocument.addEventListener('pointerup', release, true);
    ownerDocument.addEventListener('pointercancel', release, true);
  }

  function forwardClick(event: MouseEvent<HTMLDivElement>) {
    if (forwardingRef.current) {
      event.stopPropagation();
      return;
    }
    onClick?.(event);
    const { ownerDocument } = event.currentTarget;
    const view = ownerDocument.defaultView;
    if (!view || event.defaultPrevented || event.button !== 0 || !isSurfaceTarget(event, view)) return;
    if (event.detail > 0 && !ownsPressRef.current) return;

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
  }

  return { isPressed, pressProps: { onPointerDown, onPointerDownCapture }, onClick: forwardClick };
}
