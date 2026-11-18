import { useContext, useEffect, type RefObject } from 'react';
import { OverlayTriggerStateContext as RACOverlayTriggerStateContext } from 'react-aria-components';

/**
 * Scrolls an open drawer back on screen after a swipe dismissal its owner rejected. Sheet leaves
 * the panel off screen, still mounted and modal, when `onOpenChange(false)` keeps `isOpen`.
 *
 * @param panelRef - The Sheet panel element.
 */
export function useRestWhileOpen(panelRef: RefObject<HTMLElement | null>) {
  const isOpen = useContext(RACOverlayTriggerStateContext)?.isOpen ?? false;

  useEffect(
    function watchPanel() {
      const stage = panelRef.current?.parentElement;
      const scroller = stage?.closest<HTMLElement>('[data-sheet-scroll]');
      const overlay = scroller?.parentElement;
      if (!isOpen || !stage || !scroller || !overlay) return;

      let frame = 0;
      function restore() {
        cancelAnimationFrame(frame);
        // An accepted close re-renders closed and tears this down before the frame runs.
        frame = requestAnimationFrame(function bringBack() {
          if (!stage || !scroller) return;
          const box = stage.getBoundingClientRect();
          if (Math.abs(box.top) < 1 && Math.abs(box.left) < 1) return;

          // The panel rests when Sheet's viewport-sized stage lines up with the viewport.
          scroller.scrollTo({
            top: scroller.scrollTop + box.top,
            left: scroller.scrollLeft + box.left,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
          });
        });
      }

      overlay.addEventListener('react-aria-sheet-close', restore);
      return function stopWatching() {
        cancelAnimationFrame(frame);
        overlay.removeEventListener('react-aria-sheet-close', restore);
      };
    },
    [isOpen, panelRef]
  );
}
