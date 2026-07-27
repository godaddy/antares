import { Button, Flex, RangeSlider } from '@godaddy/antares';
import type { FormEvent } from 'react';

export function RangeSliderFormExample() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    alert(`Min: ${data.get('priceMin')}, Max: ${data.get('priceMax')}`);
  }

  return (
    <Flex as="form" direction="column" gap="sm" onSubmit={handleSubmit}>
      <RangeSlider
        label="Price range"
        defaultValue={[20, 80]}
        thumbLabels={['Minimum price', 'Maximum price']}
        thumbNames={['priceMin', 'priceMax']}
        valueLabel
      />
      <Button type="submit">Apply filter</Button>
    </Flex>
  );
}
