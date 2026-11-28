import { DonutChart } from '@godaddy/antares';

const data = Array.from({ length: 20 }, (_, i) => ({ id: `slice-${i}`, name: `Slice ${i}`, value: 1 }));

/** @ignore */
export function AllSmallSlicesExample() {
  return <DonutChart data={data} aria-label="Donut chart where every slice is small" />;
}
