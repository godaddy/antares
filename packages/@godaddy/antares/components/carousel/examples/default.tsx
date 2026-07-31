import { Carousel, Flex } from '@godaddy/antares';

/**
 * The default carousel is a carousel that is uncontrolled, it shows the first slide by default. You can also pass the `defaultActiveIndex` prop to the `Carousel` component to set the initial active slide index.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Carousel style={{ maxWidth: 400 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
