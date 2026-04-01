import { Box, Carousel, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function EventsExample() {
  const [message, setMessage] = useState('Listening for change events...');
  const [messagePrev, setMessagePrev] = useState('Listening for prev events...');
  const [messageNext, setMessageNext] = useState('Listening for next events...');

  function handleChange(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessage(`onChange: ${index}, firstSlide: ${values.atFirstSlide}, lastSlide: ${values.atLastSlide}`);
  }

  function handlePrev(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessagePrev(`onPrev: ${index}, firstSlide: ${values.atFirstSlide}, lastSlide: ${values.atLastSlide}`);
  }

  function handleNext(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessageNext(`onNext: ${index}, firstSlide: ${values.atFirstSlide}, lastSlide: ${values.atLastSlide}`);
  }
  return (
    <Flex direction="column" gap="md">
      <Box>{message}</Box>
      <Box>{messagePrev}</Box>
      <Box>{messageNext}</Box>

      <Carousel
        style={{ maxWidth: 400 }}
        defaultActiveIndex={2}
        onChange={handleChange}
        onPrev={handlePrev}
        onNext={handleNext}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
            Slide {index + 1}
          </Flex>
        ))}
      </Carousel>
    </Flex>
  );
}
