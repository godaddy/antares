import { MetricsLockup } from '@godaddy/antares';

/**
 * Use the `trend` prop to show a directional icon next to the description. Accepts `'positive'`, `'negative'`, or `'neutral'`.
 * @order 2
 */
export function WithTrendExample() {
  return <MetricsLockup title="Conversion Rate" data="42%" description="+3.2% vs. last month" trend="positive" />;
}
