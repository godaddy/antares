import { RangeSlider } from '@godaddy/antares';

export function RangeSliderDisabledExample() {
  return (
    <RangeSlider
      label="Price range"
      defaultValue={[20, 80]}
      thumbLabels={['Minimum price', 'Maximum price']}
      isDisabled
    />
  );
}
