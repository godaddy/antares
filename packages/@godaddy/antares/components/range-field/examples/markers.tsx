import { RangeField } from '@godaddy/antares';

export function RangeFieldMarkersExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} step={10} markers />;
}
