import { GaugeChart } from '@godaddy/antares';

export function DefaultExample() {
  return <GaugeChart value={50} label="50%" aria-label="Default gauge" rangeLabel={{ min: 0, max: 100 }} />;
}
