import { MetricsLockup, type MetricsLockupProps } from '@godaddy/antares';

/**
 * A metric with a title, info tooltip, value, and description.
 * @order 1
 */
export function DefaultExample(props: Partial<MetricsLockupProps> = {}) {
  return (
    <MetricsLockup
      title="Total Revenue"
      titleInfo="The total revenue across all products for the selected period."
      data="$1,234.56"
      description="vs. last month"
      {...props}
    />
  );
}
