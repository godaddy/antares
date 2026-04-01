import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

type OnActionCallbackType = (index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) => void;

export interface UseNavigationControlsProps {
  /** The Embla API instance. */
  emblaApi: EmblaCarouselType | undefined;

  /** The active index of the carousel. */
  activeIndex?: number;

  /** The default active index of the carousel. */
  defaultActiveIndex?: number;

  /** The callback function to be called when the active index changes. */
  onChange?: OnActionCallbackType;

  /** The callback function to be called when the previous button is pressed. */
  onPrev?: OnActionCallbackType;

  /** The callback function to be called when the next button is pressed. */
  onNext?: OnActionCallbackType;
}

interface ReturnType {
  /** The active index of the carousel in uncontrolled mode. */
  uncontrolledActiveIndex: number;

  /** The scroll snaps of the carousel. */
  scrollSnaps: number[];

  /** Whether the carousel is at the first slide. */
  atFirstSlide: boolean;

  /** Whether the carousel is at the last slide. */
  atLastSlide: boolean;

  /** The callback function to be called when the previous button is pressed. */
  onPrevButtonPress: () => void;

  /** The callback function to be called when the next button is pressed. */
  onNextButtonPress: () => void;

  /** The callback function to be called when a pagination dot is pressed. */
  onPaginationDotPress: (index: number) => void;
}

/**
 * Hook to handle the navigation controls of the carousel with Embla API.
 *
 * @param props - The props for the useNavigationControls hook.
 * @returns Carousel navigation state and callbacks.
 */
export function useNavigationControls(props: UseNavigationControlsProps): ReturnType {
  const { emblaApi, activeIndex, defaultActiveIndex, onChange, onPrev, onNext } = props;
  const [atFirstSlide, setAtFirstSlide] = useState(true);
  const [atLastSlide, setAtLastSlide] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const controlledMode = activeIndex !== undefined;

  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] = useState(
    controlledMode ? activeIndex : (defaultActiveIndex ?? 0)
  );

  const updateValues = useCallback(function updateValues(emblaApi: EmblaCarouselType | undefined) {
    if (!emblaApi) return { scrollSnap: 0, scrollSnaps: [], atFirstSlide: true, atLastSlide: true };

    const scrollSnap = emblaApi.selectedSnap();
    const scrollSnaps = emblaApi.snapList();
    const atFirstSlide = !emblaApi.canGoToPrev();
    const atLastSlide = !emblaApi.canGoToNext();

    setUncontrolledActiveIndex(scrollSnap);
    setScrollSnaps(scrollSnaps);
    setAtFirstSlide(atFirstSlide);
    setAtLastSlide(atLastSlide);

    return { scrollSnap, scrollSnaps, atFirstSlide, atLastSlide };
  }, []);

  const onInit = useCallback(
    function handleInit(emblaApi: EmblaCarouselType) {
      updateValues(emblaApi);
    },
    [updateValues]
  );

  const onSelect = useCallback(
    function handleSelect(emblaApi: EmblaCarouselType) {
      const { scrollSnap, atFirstSlide, atLastSlide } = updateValues(emblaApi);
      onChange?.(scrollSnap, { atFirstSlide, atLastSlide });
    },
    [controlledMode, onChange, updateValues]
  );

  const onPrevButtonPress = useCallback(
    function handlePrevButtonPress() {
      if (!controlledMode) emblaApi?.goToPrev();
      const { scrollSnap, atFirstSlide, atLastSlide } = updateValues(emblaApi);
      onPrev?.(scrollSnap, { atFirstSlide, atLastSlide });
    },
    [emblaApi, controlledMode, updateValues, onPrev]
  );

  const onNextButtonPress = useCallback(
    function handleNextButtonPress() {
      if (!controlledMode) emblaApi?.goToNext();
      const { scrollSnap, atFirstSlide, atLastSlide } = updateValues(emblaApi);
      onNext?.(scrollSnap, { atFirstSlide, atLastSlide });
    },
    [emblaApi, controlledMode, updateValues, onNext]
  );

  const onPaginationDotPress = useCallback(
    function onPaginationDotPress(index: number) {
      emblaApi?.goTo(index);
    },
    [emblaApi]
  );

  // handle event attachments
  useEffect(
    function handleEventAttachments() {
      if (!emblaApi) return;

      onInit(emblaApi);
      emblaApi?.goTo(uncontrolledActiveIndex);
      emblaApi?.on('reinit', onInit).on('select', onSelect);

      return function cleanup() {
        emblaApi?.off('reinit', onInit).off('select', onSelect);
      };
    },
    [emblaApi, onInit, onSelect]
  );

  // handle active index changes for controlled mode
  useEffect(
    function handleActiveIndex() {
      if (controlledMode) emblaApi?.goTo(activeIndex);
    },
    [emblaApi, activeIndex]
  );

  return {
    uncontrolledActiveIndex,
    scrollSnaps,
    atFirstSlide,
    atLastSlide,
    onPrevButtonPress,
    onNextButtonPress,
    onPaginationDotPress
  };
}
