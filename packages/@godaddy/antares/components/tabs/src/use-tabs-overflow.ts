import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

interface TabsOverflowOptions {
  readonly isRTL?: boolean;
}

interface TabsOverflowState {
  readonly hasOverflow: boolean;
  readonly canScrollPrev: boolean;
  readonly canScrollNext: boolean;
}

export interface TabsOverflowResult {
  readonly shellRef: RefObject<HTMLDivElement | null>;
  readonly contentRef: RefObject<HTMLDivElement | null>;
  readonly viewportRef: RefObject<HTMLDivElement | null>;
  readonly state: TabsOverflowState;
  readonly scrollPrevious: () => void;
  readonly scrollNext: () => void;
}

function readOverflowState(
  shell: HTMLDivElement | null,
  content: HTMLDivElement | null,
  viewport: HTMLDivElement | null
): TabsOverflowState {
  if (!shell || !content || !viewport) return { hasOverflow: false, canScrollPrev: false, canScrollNext: false };
  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  const position = Math.abs(viewport.scrollLeft);
  return {
    hasOverflow: content.scrollWidth > shell.clientWidth + 1,
    canScrollPrev: position > 1,
    canScrollNext: position < maxScroll - 1
  };
}

/**
 * Measures a horizontal tab-list conveyor and moves one tab at a time.
 *
 * @returns Conveyor refs, boundary state, and scroll handlers.
 */
export function useTabsOverflow(options: TabsOverflowOptions = {}): TabsOverflowResult {
  const { isRTL = false } = options;
  const shellRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TabsOverflowState>({
    hasOverflow: false,
    canScrollPrev: false,
    canScrollNext: false
  });

  const update = useCallback(function update() {
    setState(readOverflowState(shellRef.current, contentRef.current, viewportRef.current));
  }, []);

  useEffect(
    function observeOverflow() {
      const viewport = viewportRef.current;
      const content = contentRef.current;
      const shell = shellRef.current;
      if (!shell || !viewport || !content) return;
      const observer = new ResizeObserver(update);
      observer.observe(shell);
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
    function scrollToTab(action: 'next' | 'previous') {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const tabs = contentRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
      if (!tabs?.length) return;

      const viewportRect = viewport.getBoundingClientRect();
      const target =
        action === 'next'
          ? Array.from(tabs).find(function findNextTab(tab) {
              const tabRect = tab.getBoundingClientRect();
              return isRTL ? tabRect.right < viewportRect.right - 1 : tabRect.left > viewportRect.left + 1;
            })
          : Array.from(tabs).findLast(function findPreviousTab(tab) {
              const tabRect = tab.getBoundingClientRect();
              return isRTL ? tabRect.right > viewportRect.right + 1 : tabRect.left < viewportRect.left - 1;
            });
      if (!target) {
        viewport.scrollBy({
          left:
            action === 'next'
              ? isRTL
                ? -viewport.clientWidth
                : viewport.clientWidth
              : isRTL
                ? viewport.clientWidth
                : -viewport.clientWidth,
          behavior: 'smooth'
        });
        return;
      }

      const targetRect = target.getBoundingClientRect();
      const delta = isRTL ? targetRect.right - viewportRect.right : targetRect.left - viewportRect.left;
      viewport.scrollBy({ left: delta, behavior: 'smooth' });
    },
    [isRTL]
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

  return { shellRef, contentRef, viewportRef, state, scrollPrevious, scrollNext };
}
