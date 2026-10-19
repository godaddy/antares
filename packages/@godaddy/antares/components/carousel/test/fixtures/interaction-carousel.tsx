import type { Ref } from 'react';
import { Carousel, type CarouselRef, Flex } from '@godaddy/antares';

export function InteractionCarousel({
  carouselRef,
  dir = 'ltr'
}: {
  carouselRef: Ref<CarouselRef>;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <Carousel
      ref={carouselRef}
      hideDots
      hideNavigationControls
      emblaOptions={{ direction: dir }}
      style={{ width: 400 }}
    >
      {[1, 2, 3].map((slide) => (
        <Flex key={slide} alignItems="center" justifyContent="center" style={{ height: 200 }}>
          Slide {slide}
        </Flex>
      ))}
    </Carousel>
  );
}
