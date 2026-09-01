import { Button, Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

/**
 * Explicit remove-button presentation props override the defaults supplied by Chip.
 * @ignore
 */
export function ContextOverridesExample() {
  return (
    <ChipGroup
      onRemove={function noop() {
        /* test only */
      }}
    >
      <Label>Filters</Label>
      <ChipList>
        <Chip id="override" textValue="Override">
          Override
          <Button slot="remove" variant="critical" size="sm" />
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}
