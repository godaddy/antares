import { RangeSlider } from '@godaddy/antares';

export function RangeSliderMarkersExample() {
  return (
    <RangeSlider
      aria-label="Price range"
      defaultValue={[20, 80]}
      minValue={0}
      maxValue={100}
      step={20}
      thumbLabels={['Minimum price', 'Maximum price']}
      markers
    />
  );
}
