import { Box, Chip, ChipGroup, ChipList } from '@godaddy/antares';

/** @ignore */
export function LabelLengthExample() {
  const shortLabel = 'Category';
  const longLabel = 'Discounted price up to twenty thousand dollars';

  return (
    <Box style={{ maxInlineSize: '14rem' }}>
      <ChipGroup aria-label="Label length">
        <ChipList>
          <Chip id="short" textValue={shortLabel}>
            {shortLabel}
          </Chip>
          <Chip id="long" textValue={longLabel}>
            {longLabel}
          </Chip>
        </ChipList>
      </ChipGroup>
    </Box>
  );
}
