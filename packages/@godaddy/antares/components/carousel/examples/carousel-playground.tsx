import { Carousel, Flex, type CarouselProps } from '@godaddy/antares';

/** Props for the carousel playground example. */
export interface PlaygroundExampleProps
  extends Pick<CarouselProps, 'hideDots' | 'hideNavigationControls' | 'hideMaskEdges'> {
  /** Number of slides (and therefore dots) to render. */
  slideCount?: number;
}

const colors = ['lavender', 'lightyellow', 'mistyrose', 'honeydew', 'aliceblue'];

export function PlaygroundExample({
  hideDots = false,
  hideNavigationControls = false,
  hideMaskEdges = false,
  slideCount = 5
}: PlaygroundExampleProps) {
  return (
    <Carousel
      hideDots={hideDots}
      hideNavigationControls={hideNavigationControls}
      hideMaskEdges={hideMaskEdges}
      style={{ maxWidth: 400 }}
    >
      {Array.from({ length: slideCount }, (_, index) => colors[index % colors.length]).map(
        function renderSlide(color, index) {
          return (
            <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 200, background: color }}>
              Slide {index + 1}
            </Flex>
          );
        }
      )}
    </Carousel>
  );
}
