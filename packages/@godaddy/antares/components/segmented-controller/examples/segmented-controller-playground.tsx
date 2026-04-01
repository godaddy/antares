import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  value?: string;
}

export function PlaygroundExample({ size = 'md', isDisabled = false, value = 'day' }: PlaygroundExampleProps) {
  return (
    <SegmentedController aria-label="View" size={size} isDisabled={isDisabled} value={value}>
      <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
      <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
      <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
      <SegmentedControllerItem value="year">Year</SegmentedControllerItem>
    </SegmentedController>
  );
}
