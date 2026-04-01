import { Carousel, Flex, type CarouselProps } from '@godaddy/antares';

/** Props for the carousel playground example. */
export interface PlaygroundExampleProps
  extends Pick<CarouselProps, 'hideDots' | 'hideNavigationControls' | 'hideMaskEdges'> {}

const colors = ['lavender', 'lightyellow', 'mistyrose', 'honeydew', 'aliceblue'];

export function PlaygroundExample({
  hideDots = false,
  hideNavigationControls = false,
  hideMaskEdges = false
}: PlaygroundExampleProps) {
  return (
    <Carousel
      hideDots={hideDots}
      hideNavigationControls={hideNavigationControls}
      hideMaskEdges={hideMaskEdges}
      style={{ maxWidth: 400 }}
    >
      {colors.map(function renderSlide(color, index) {
        return (
          <Flex key={color} alignItems="center" justifyContent="center" style={{ height: 200, background: color }}>
            Slide {index + 1}
          </Flex>
        );
      })}
    </Carousel>
  );
}
