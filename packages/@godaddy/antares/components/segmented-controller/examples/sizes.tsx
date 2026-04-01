import { Flex, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="lg" alignItems="start">
      <SegmentedController aria-label="View (small)" size="sm" defaultValue="day">
        <SegmentedControllerItem value="day">Day sm</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week sm</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month sm</SegmentedControllerItem>
      </SegmentedController>

      <SegmentedController aria-label="View (medium)" size="md" defaultValue="day">
        <SegmentedControllerItem value="day">Day md</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week md</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month md</SegmentedControllerItem>
      </SegmentedController>

      <SegmentedController aria-label="View (large)" size="lg" defaultValue="day">
        <SegmentedControllerItem value="day">Day lg</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week lg</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month lg</SegmentedControllerItem>
      </SegmentedController>
    </Flex>
  );
}
