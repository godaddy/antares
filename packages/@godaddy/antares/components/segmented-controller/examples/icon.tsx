import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

/**
 * Segments can include an `Icon` alongside text for added visual context.
 * @title Icon + Text
 * @order 4
 */
export function IconExample() {
  return (
    <SegmentedController aria-label="Layout" defaultValue="list">
      <SegmentedControllerItem value="list">
        <Icon icon="bulleted-list" />
        List
      </SegmentedControllerItem>
      <SegmentedControllerItem value="grid">
        <Icon icon="grid" />
        Grid
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
