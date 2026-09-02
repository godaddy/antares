import { Chip, ChipGroup, ChipList, Label, Text } from '@godaddy/antares';

/** @ignore */
export function PrimitiveAndComposedExample() {
  return (
    <ChipGroup>
      <Label>Mixed values</Label>
      <ChipList>
        <Chip id="count">42</Chip>
        <Chip id="composed" textValue="Composed value">
          <Text>Composed value</Text>
        </Chip>
        <Chip id="link" href="/filters">
          Filters
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}
