import { Chip, ChipGroup, ChipList, Label } from '@godaddy/antares';

/**
 * Start with a labeled group of related values. Add selection or removal when
 * the group needs interactive behavior.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ChipGroup>
      <Label>Location</Label>
      <ChipList>
        <Chip id="austin">Austin</Chip>
        <Chip id="chicago">Chicago</Chip>
        <Chip id="denver">Denver</Chip>
      </ChipList>
    </ChipGroup>
  );
}
