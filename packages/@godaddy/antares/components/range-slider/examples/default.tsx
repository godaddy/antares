import { RangeSlider } from '@godaddy/antares';

export function RangeSliderDefaultExample() {
  return (
    <RangeSlider aria-label="Price range" defaultValue={[20, 80]} thumbLabels={['Minimum price', 'Maximum price']} />
  );
}
