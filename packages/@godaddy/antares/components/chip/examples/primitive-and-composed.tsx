import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

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
        <Chip id="sized-icon" textValue="Sized icon">
          <Icon icon="star" width={12} height={12} />
          <Text>Sized icon</Text>
          <Icon icon="checkmark" width={10} height={10} />
        </Chip>
        <Chip id="link" href="/filters">
          Filters
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}
