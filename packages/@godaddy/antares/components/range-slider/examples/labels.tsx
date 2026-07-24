import { RangeSlider } from '@godaddy/antares';

export function RangeSliderLabelsExample() {
  return (
    <RangeSlider
      label="Price range"
      defaultValue={[20, 80]}
      minValue={0}
      maxValue={100}
      step={10}
      thumbLabels={['Minimum price', 'Maximum price']}
      minLabel="Low"
      maxLabel="High"
      description="Choose the minimum and maximum price."
      isRequired
      valueLabel
    />
  );
}
