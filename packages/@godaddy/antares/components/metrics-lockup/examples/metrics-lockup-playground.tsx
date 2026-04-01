import { MetricsLockup, type MetricsLockupProps } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  title?: MetricsLockupProps['title'];
  titleInfo?: string;
  data?: MetricsLockupProps['data'];
  description?: MetricsLockupProps['description'];
  compact?: MetricsLockupProps['compact'];
  trend?: MetricsLockupProps['trend'];
}

export function PlaygroundExample({
  title = 'Total Revenue',
  titleInfo = 'Additional information about this metric.',
  data = '$1,234.56',
  description = 'vs. last month',
  compact = false,
  trend
}: PlaygroundExampleProps) {
  return (
    <MetricsLockup
      title={title}
      titleInfo={titleInfo}
      data={data}
      description={description}
      compact={compact}
      trend={trend}
    />
  );
}
