import { Flex, Slider } from '@godaddy/antares';
import { useState } from 'react';

export function SliderControlledExample() {
  const [value, setValue] = useState(30);

  return (
    <Flex direction="column" gap="sm">
      <Slider label="Opacity" value={value} onChange={setValue} valueLabel />
      <p>Current value: {value}</p>
    </Flex>
  );
}
