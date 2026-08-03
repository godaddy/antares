import { MetricsLockup } from '@godaddy/antares';

/**
 * Use the `compact` prop to render the metric value and description inline rather than stacked.
 * @order 3
 */
export function CompactExample() {
  return <MetricsLockup title="Sessions" data="8,021" description="-12% vs. last week" trend="negative" compact />;
}
