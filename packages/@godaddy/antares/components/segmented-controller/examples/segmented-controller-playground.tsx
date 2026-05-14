import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  value?: string;
  collapseInactive?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  isDisabled = false,
  value = 'day',
  collapseInactive = false
}: PlaygroundExampleProps) {
  return (
    <SegmentedController
      aria-label="View"
      size={size}
      isDisabled={isDisabled}
      value={value}
      collapseInactive={collapseInactive}
    >
      <SegmentedControllerItem value="day" icon={<Icon icon="dot" width={24} height={24} />}>
        Day
      </SegmentedControllerItem>
      <SegmentedControllerItem value="week" icon={<Icon icon="bulleted-list" width={24} height={24} />}>
        Week
      </SegmentedControllerItem>
      <SegmentedControllerItem value="month" icon={<Icon icon="grid" width={24} height={24} />}>
        Month
      </SegmentedControllerItem>
      <SegmentedControllerItem value="year" icon={<Icon icon="star" width={24} height={24} />}>
        Year
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
