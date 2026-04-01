import { useCallback, useEffect, useRef, useState } from 'react';

type UseHorizontalScrollProps = {
  /** Whether the layout is right-to-left. */
  isRTL?: boolean;

  /** The number of pixels to scroll on each navigation action. @default 200 */
  scrollStep?: number;
};

/**
 * A hook to handle horizontal scrolling of a container.
 *
 * @param props - {@link UseHorizontalScrollProps}.
 * @returns An object containing refs, scroll state, and scroll handlers.
 */
export function useHorizontalScroll(props: UseHorizontalScrollProps) {
  const { isRTL = false, scrollStep = 200 } = props ?? {};
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollButtonsRef = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState({
    hasOverflow: false,
    canScrollPrev: false,
    canScrollNext: false
  });

  //
  // Updates the scroll state when the container or scroll buttons change.
  // Determines if the scroll buttons should be shown.
  //
  const update = useCallback(function update() {
    const el = containerRef.current;
    if (!el) return;

    const scrollButtonsWidth = scrollButtonsRef.current?.clientWidth ?? 0;

    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);

    const hasOverflow = max - scrollButtonsWidth > 0;

    setState({
      hasOverflow,
      canScrollPrev: pos > 1,
      canScrollNext: pos < max - 1
    });
  }, []);

  //
  // Sets up a ResizeObserver and a scroll event listener to update
  // the scroll state when the container changes size or scrolls.
  //
  useEffect(
    function handleResizeObserver() {
      const el = containerRef.current;
      if (!el) return;

      const ro = new ResizeObserver(update);
      ro.observe(el);

      el.addEventListener('scroll', update, { passive: true });
      update();

      return function unmount() {
        ro.disconnect();
        el.removeEventListener('scroll', update);
      };
    },
    [update]
  );

  const scrollPrev = useCallback(
    function handleScrollPrev() {
      containerRef.current?.scrollBy({ top: 0, left: isRTL ? scrollStep : -scrollStep, behavior: 'smooth' });
    },
    [isRTL, scrollStep]
  );

  const scrollNext = useCallback(
    function handleScrollNext() {
      containerRef.current?.scrollBy({ top: 0, left: isRTL ? -scrollStep : scrollStep, behavior: 'smooth' });
    },
    [isRTL, scrollStep]
  );

  return {
    containerRef,
    scrollButtonsRef,
    ...state,
    scrollPrev,
    scrollNext
  };
}
