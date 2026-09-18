import { useRef, type DOMAttributes, type MouseEvent, type PointerEvent } from 'react';

const NESTED_CONTROL =
  'a, button, input, textarea, select, summary, label, [contenteditable]:not([contenteditable="false"]), [data-react-aria-pressable], [role="button"], [role="link"], [tabindex], [data-corner-actions], [data-card-selection-control]';
const CLICK_MS = 200;
const DRAG_PX = 5;

type SurfaceHandlers = Pick<
  DOMAttributes<HTMLDivElement>,
  'onClick' | 'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel'
>;

interface PointerPress {
  id: number;
  x: number;
  y: number;
  startedAt: number;
  released: boolean;
}

function isSurfaceTarget(event: MouseEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) {
  const target = event.target;
  return (
    target instanceof Element &&
    target.closest('[data-card]') === event.currentTarget &&
    !target.closest(NESTED_CONTROL)
  );
}

function hasMoved(press: PointerPress, event: PointerEvent<HTMLDivElement>) {
  return Math.hypot(event.clientX - press.x, event.clientY - press.y) > DRAG_PX;
}

/** Forwards short surface clicks, leaving drags and independent controls alone. */
export function useForwardedClick(
  isEnabled: boolean,
  getTarget: (card: HTMLDivElement) => HTMLElement | null,
  handlers: SurfaceHandlers
): SurfaceHandlers {
  const pressRef = useRef<PointerPress | null>(null);
  const forwardingRef = useRef(false);

  if (!isEnabled) return handlers;

  return {
    onPointerDown(event) {
      handlers.onPointerDown?.(event);
      pressRef.current = null;
      if (event.defaultPrevented || event.button !== 0 || !isSurfaceTarget(event)) return;
      pressRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        startedAt: event.timeStamp,
        released: false
      };
    },
    onPointerMove(event) {
      handlers.onPointerMove?.(event);
      const press = pressRef.current;
      if (press?.id === event.pointerId && (event.defaultPrevented || hasMoved(press, event))) {
        pressRef.current = null;
      }
    },
    onPointerUp(event) {
      handlers.onPointerUp?.(event);
      const press = pressRef.current;
      if (
        !press ||
        press.id !== event.pointerId ||
        event.defaultPrevented ||
        event.button !== 0 ||
        hasMoved(press, event) ||
        event.timeStamp - press.startedAt > CLICK_MS
      ) {
        pressRef.current = null;
        return;
      }
      press.released = true;
    },
    onPointerCancel(event) {
      handlers.onPointerCancel?.(event);
      if (pressRef.current?.id === event.pointerId) pressRef.current = null;
    },
    onClick(event) {
      if (forwardingRef.current) {
        event.stopPropagation();
        return;
      }
      const press = pressRef.current;
      pressRef.current = null;
      handlers.onClick?.(event);
      if (
        !press?.released ||
        event.defaultPrevented ||
        event.button !== 0 ||
        !isSurfaceTarget(event) ||
        window.getSelection()?.toString()
      )
        return;

      const destination = getTarget(event.currentTarget);
      if (!destination) return;
      forwardingRef.current = true;
      try {
        destination.click();
      } finally {
        forwardingRef.current = false;
      }
    }
  };
}
