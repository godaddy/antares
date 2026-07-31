import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

/**
 * An uncontrolled segmented controller with a default selection. The component manages its own state internally via `defaultValue`.
 * @order 1
 */
export function DefaultExample() {
  return (
    <SegmentedController aria-label="View" defaultValue="day">
      <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
      <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
      <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
    </SegmentedController>
  );
}
