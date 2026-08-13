import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

interface TabsOverflowState {
  readonly hasOverflow: boolean;
  readonly canScrollPrev: boolean;
  readonly canScrollNext: boolean;
}

export interface TabsOverflowResult {
  readonly contentRef: RefObject<HTMLDivElement | null>;
  readonly viewportRef: RefObject<HTMLDivElement | null>;
  readonly state: TabsOverflowState;
  readonly scrollPrevious: () => void;
  readonly scrollNext: () => void;
}

function readOverflowState(element: HTMLDivElement | null): TabsOverflowState {
  if (!element) return { hasOverflow: false, canScrollPrev: false, canScrollNext: false };
  const maxScroll = element.scrollWidth - element.clientWidth;
  const position = Math.abs(element.scrollLeft);
  return {
    hasOverflow: maxScroll > 1,
    canScrollPrev: position > 1,
    canScrollNext: position < maxScroll - 1
  };
}

/**
 * Measures a horizontal tab-list conveyor and moves one tab at a time.
 *
 * @returns Conveyor refs, boundary state, and scroll handlers.
 */
export function useTabsOverflow(): TabsOverflowResult {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TabsOverflowState>({
    hasOverflow: false,
    canScrollPrev: false,
    canScrollNext: false
  });

  const update = useCallback(function update() {
    setState(readOverflowState(viewportRef.current));
  }, []);

  useEffect(
    function observeOverflow() {
      const viewport = viewportRef.current;
      const content = contentRef.current;
      if (!viewport || !content) return;
      const observer = new ResizeObserver(update);
      observer.observe(viewport);
      observer.observe(content);
      viewport.addEventListener('scroll', update, { passive: true });
      update();
      return function cleanup() {
        observer.disconnect();
        viewport.removeEventListener('scroll', update);
      };
    },
    [update]
  );

  const scrollToTab = useCallback(
    function scrollToTab(direction: 'next' | 'previous') {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const tabs = contentRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
      if (!tabs?.length) return;

      const viewportRect = viewport.getBoundingClientRect();
      const target =
        direction === 'next'
          ? Array.from(tabs).find(function findNextTab(tab) {
              return tab.getBoundingClientRect().left > viewportRect.left + 1;
            })
          : Array.from(tabs).findLast(function findPreviousTab(tab) {
              return tab.getBoundingClientRect().left < viewportRect.left - 1;
            });
      if (!target) return;

      viewport.scrollLeft += target.getBoundingClientRect().left - viewportRect.left;
    },
    [update]
  );

  const scrollPrevious = useCallback(
    function scrollPrevious() {
      scrollToTab('previous');
    },
    [scrollToTab]
  );

  const scrollNext = useCallback(
    function scrollNext() {
      scrollToTab('next');
    },
    [scrollToTab]
  );

  return { contentRef, viewportRef, state, scrollPrevious, scrollNext };
}
