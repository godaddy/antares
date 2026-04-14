import { GaugeChart } from '@godaddy/antares';

export function BasicExample() {
  return <GaugeChart value={50} label="50%" aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }} />;
}
