import { useState } from 'react';
import { useMediaQuery, viewportQueries } from '#components/responsive';

export interface UseOverlayContainerOptions {
  /** Effective open state of the overlay. */
  isOpen: boolean;

  /** Whether a narrow viewport uses a drawer. @default 'responsive' */
  overlay?: 'responsive' | 'popover';
}

/** Chooses the container at opening and keeps it mounted through closing. */
export function useOverlayContainer({ isOpen, overlay = 'responsive' }: UseOverlayContainerOptions) {
  const matches = useMediaQuery(viewportQueries.sm, { ssrMatch: true });
  const preferred = overlay === 'popover' || matches ? 'popover' : 'drawer';
  const [session, setSession] = useState<{ isOpen: boolean; container: 'popover' | 'drawer' }>({
    isOpen,
    container: preferred
  });

  if (session.isOpen !== isOpen) {
    setSession({ isOpen, container: isOpen ? preferred : session.container });
  }

  return isOpen && !session.isOpen ? preferred : session.container;
}
