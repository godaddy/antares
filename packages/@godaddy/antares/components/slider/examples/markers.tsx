import { Slider } from '@godaddy/antares';

export function SliderMarkersExample() {
  return <Slider aria-label="Quality" defaultValue={6} minValue={0} maxValue={8} step={1} markers />;
}
