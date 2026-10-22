import { useState, useSyncExternalStore } from 'react';

const popoverQuery =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(min-width: 40rem)')
    : undefined;

function subscribe(onChange: () => void) {
  popoverQuery?.addEventListener('change', onChange);
  return function unsubscribe() {
    popoverQuery?.removeEventListener('change', onChange);
  };
}

function prefersPopover() {
  return popoverQuery?.matches ?? true;
}

function serverPrefersPopover() {
  return true;
}

export interface UseOverlayContainerOptions {
  /** Effective open state of the overlay. */
  isOpen: boolean;

  /** Whether a narrow viewport uses a drawer. @default 'responsive' */
  overlay?: 'responsive' | 'popover';
}

/** Chooses the container at opening and keeps it mounted through closing. */
export function useOverlayContainer({ isOpen, overlay = 'responsive' }: UseOverlayContainerOptions) {
  const matches = useSyncExternalStore(subscribe, prefersPopover, serverPrefersPopover);
  const preferred: 'popover' | 'drawer' = overlay === 'popover' || matches ? 'popover' : 'drawer';
  const [session, setSession] = useState({ isOpen, container: preferred });

  if (session.isOpen !== isOpen) {
    setSession({ isOpen, container: isOpen ? preferred : session.container });
  }

  return session.container;
}
