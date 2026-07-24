import { RangeField } from '@godaddy/antares';

export function RangeFieldDefaultExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} />;
}
