import { useContext, useEffect, type RefObject } from 'react';
import { useEffectEvent } from '@react-aria/utils';
import { OverlayTriggerStateContext as RACOverlayTriggerStateContext } from 'react-aria-components';

/**
 * Recovers missed Sheet exit reports on scrollend.
 * Remove once https://github.com/adobe/react-spectrum/issues/10897 is fixed.
 */
export function useFinishClose(panelRef: RefObject<HTMLElement | null>, preventDismissal?: boolean) {
  const state = useContext(RACOverlayTriggerStateContext);
  const isOpen = state?.isOpen ?? false;
  const close = useEffectEvent(function requestClose() {
    state?.close();
  });

  useEffect(
    function watchExit() {
      const scroller = panelRef.current?.closest<HTMLElement>('[data-sheet-scroll]');
      const overlay = scroller?.parentElement;
      if (!scroller || !overlay) return;

      let hasEntered = false;

      function finish(event?: Event) {
        if (event?.type === 'scroll' && hasEntered) return;
        const box = panelRef.current?.getBoundingClientRect();
        if (!box || !overlay) return;
        const isGone =
          box.bottom <= 0 || box.right <= 0 || box.top >= window.innerHeight || box.left >= window.innerWidth;
        if (!isGone) {
          hasEntered = true;
          return;
        }
        if (event?.type === 'scroll' || (isOpen && (!hasEntered || preventDismissal))) return;

        if (isOpen) close();
        overlay.dispatchEvent(new CustomEvent('react-aria-sheet-close'));
      }

      scroller.addEventListener('scroll', finish);
      scroller.addEventListener('scrollend', finish);
      finish();
      return function stopWatching() {
        scroller.removeEventListener('scroll', finish);
        scroller.removeEventListener('scrollend', finish);
      };
    },
    [isOpen, panelRef, preventDismissal, close]
  );
}
