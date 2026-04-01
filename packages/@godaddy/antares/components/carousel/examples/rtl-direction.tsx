import { Carousel, Flex } from '@godaddy/antares';

export function RTLDirectionExample() {
  return (
    <Carousel style={{ maxWidth: 400 }} dir="rtl">
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
