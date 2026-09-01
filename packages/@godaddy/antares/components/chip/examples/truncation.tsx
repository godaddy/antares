import { Box, Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

/**
 * Keep labels brief so truncation is exceptional. Long labels stay on one
 * line and use an ellipsis when the available width is constrained.
 * @order 7
 */
export function TruncationExample() {
  return (
    <Box style={{ maxInlineSize: '18rem' }}>
      <ChipGroup>
        <Label>Filters</Label>
        <ChipList>
          <Chip id="category">Category</Chip>
          <Chip id="long">Discounted price up to twenty thousand dollars</Chip>
          <Chip id="status">Active</Chip>
        </ChipList>
      </ChipGroup>
    </Box>
  );
}
