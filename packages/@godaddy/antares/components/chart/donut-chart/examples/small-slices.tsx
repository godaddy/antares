import { DonutChart } from '@godaddy/antares';

/** Two large slices with two separate clusters of small slices — hover a small slice to see only that adjacent group (A–C or E–G) in the tooltip. */
const data = [
  { id: 'main', name: 'Primary', value: 88 },
  { id: 'a', name: 'Slice A', value: 3 },
  { id: 'b', name: 'Slice B', value: 3 },
  { id: 'c', name: 'Slice C', value: 3 },
  { id: 'd', name: 'Slice D', value: 90 },
  { id: 'e', name: 'Slice E', value: 5 },
  { id: 'f', name: 'Slice F', value: 4 },
  { id: 'g', name: 'Slice G', value: 3 }
];

/**
 * Very thin slices can be noisy to hover. Anything at or below `smallSliceThreshold` (default `0.05` of the total) is treated as “small,” and if those slices sit next to each other on the ring, one hover opens a single tooltip that lists the whole group.
 * @title Small slices
 * @order 4
 */
export function SmallSlicesExample() {
  return <DonutChart data={data} label="88%" aria-label="Donut with small slices for combined tooltip" />;
}
