import { DonutChart } from '@godaddy/antares';

/**
 * When there is only one slice, the ring is full. Add `subLabel` if you want a smaller second line under the main center text.
 * @title Single slice
 * @order 2
 */
export function SingleSliceExample() {
  return (
    <DonutChart
      data={[{ id: 'only', name: 'Total', value: 100 }]}
      label="$1,000"
      subLabel="Sub label"
      aria-label="Donut chart with a single full ring"
    />
  );
}
