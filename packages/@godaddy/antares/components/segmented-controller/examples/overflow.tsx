import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function OverflowExample({ dir = 'ltr', maxWidth = '300px' }: { dir?: 'ltr' | 'rtl'; maxWidth?: string }) {
  return (
    <SegmentedController aria-label="Category" defaultValue="electronics" style={{ maxWidth }} dir={dir}>
      <SegmentedControllerItem value="electronics">Electronics</SegmentedControllerItem>
      <SegmentedControllerItem value="clothing">Clothing</SegmentedControllerItem>
      <SegmentedControllerItem value="home">Home</SegmentedControllerItem>
      <SegmentedControllerItem value="sports">Sports</SegmentedControllerItem>
      <SegmentedControllerItem value="toys">Toys</SegmentedControllerItem>
    </SegmentedController>
  );
}
