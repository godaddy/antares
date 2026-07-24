import { Flex, RangeSlider } from '@godaddy/antares';
import { useState } from 'react';

export function RangeSliderControlledExample() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <Flex direction="column" gap="sm">
      <RangeSlider
        label="Price range"
        value={value}
        onChange={setValue}
        thumbLabels={['Minimum price', 'Maximum price']}
        valueLabel
      />
      <p>Current range: {value.join(' – ')}</p>
    </Flex>
  );
}
