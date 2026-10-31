import { useContext, useEffect, type RefObject } from 'react';
import { OverlayTriggerStateContext as RACOverlayTriggerStateContext } from 'react-aria-components';

/**
 * Finishes a close that Sheet missed. Sheet unmounts once its observer sees the panel leave, but it
 * reads only the first entry of a batch, so a slow frame can leave the drawer stuck while exiting.
 *
 * @param panelRef - The Sheet panel element.
 */
export function useFinishClose(panelRef: RefObject<HTMLElement | null>) {
  const isOpen = useContext(RACOverlayTriggerStateContext)?.isOpen ?? false;

  useEffect(
    function watchExit() {
      const scroller = panelRef.current?.closest<HTMLElement>('[data-sheet-scroll]');
      const overlay = scroller?.parentElement;
      if (isOpen || !scroller || !overlay) return;

      function finish() {
        const box = panelRef.current?.getBoundingClientRect();
        if (!box || !overlay) return;
        const isGone =
          box.bottom <= 0 || box.right <= 0 || box.top >= window.innerHeight || box.left >= window.innerWidth;
        if (isGone) overlay.dispatchEvent(new CustomEvent('react-aria-sheet-close'));
      }

      scroller.addEventListener('scrollend', finish);
      return function stopWatching() {
        scroller.removeEventListener('scrollend', finish);
      };
    },
    [isOpen, panelRef]
  );
}
