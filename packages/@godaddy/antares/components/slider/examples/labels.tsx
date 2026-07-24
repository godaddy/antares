import { Slider } from '@godaddy/antares';

export function SliderLabelsExample() {
  return (
    <Slider
      label="Quality"
      defaultValue={6}
      valueLabel
      minValue={0}
      maxValue={8}
      step={1}
      minLabel="Low"
      maxLabel="High"
      description="Choose the desired quality level."
      isRequired
    />
  );
}
