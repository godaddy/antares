import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

/**
 * For compact layouts, segments can contain only icons. Provide an `aria-label` on each item so screen readers can identify the action.
 * @order 5
 */
export function IconOnlyExample() {
  return (
    <SegmentedController aria-label="Layout">
      <SegmentedControllerItem value="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </SegmentedControllerItem>
      <SegmentedControllerItem value="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
