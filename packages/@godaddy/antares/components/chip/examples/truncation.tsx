import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

/**
 * By default, long labels truncate visually when space is constrained, while
 * the complete accessible value remains available.
 * @order 7
 */
export function TruncationExample() {
  return (
    <ChipGroup>
      <Label>Filters</Label>
      <ChipList>
        <Chip id="category">Category</Chip>
        <Chip id="long">Discounted price up to $20,000</Chip>
        <Chip id="status">Active</Chip>
      </ChipList>
    </ChipGroup>
  );
}
