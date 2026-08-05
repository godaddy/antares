import { RangeField } from '@godaddy/antares';

/**
 * Pass a `number[]` to render a range with two thumbs and step markers.
 * @order 7
 */
export function RangeExample() {
  return (
    <RangeField
      aria-label="Price range"
      defaultValue={[25, 75]}
      thumbLabels={['Minimum price', 'Maximum price']}
      minValue={0}
      maxValue={100}
      step={25}
      markers
    />
  );
}
