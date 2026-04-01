import { useCallback, useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

interface UseAccessibilityProps {
  /** The Embla API instance. */
  emblaApi: EmblaCarouselType | undefined;

  /** The previous button element. */
  previousButton: HTMLElement | null;

  /** The next button element. */
  nextButton: HTMLElement | null;

  /** The pagination dots element. */
  paginationDots: HTMLElement | null;

  /** The live region element. */
  liveRegion: HTMLElement | null;
}

/**
 * Hook to setup the accessibility features of the carousel using Embla Accessibility Plugin.
 *
 * @param props - The props for the useAccessibility hook.
 */
export function useAccessibility(props: UseAccessibilityProps) {
  const { emblaApi, previousButton, nextButton, paginationDots, liveRegion } = props;
  const setupAccessibility = useCallback(
    function setupAccessibility(emblaApi: EmblaCarouselType) {
      const accessibility = emblaApi.plugins().accessibility;

      if (!accessibility || !previousButton || !nextButton || !paginationDots || !liveRegion) return;

      accessibility.setupLiveRegion(liveRegion);
      accessibility.setupDotButtons(paginationDots);
      accessibility.setupPrevAndNextButtons(previousButton, nextButton);
    },
    [emblaApi, previousButton, nextButton, paginationDots, liveRegion]
  );

  useEffect(
    function handleEventAttachments() {
      if (!emblaApi) return;

      emblaApi.on('reinit', setupAccessibility);
      setupAccessibility(emblaApi);

      return function cleanup() {
        emblaApi.off('reinit', setupAccessibility);
      };
    },
    [emblaApi, setupAccessibility]
  );
}
