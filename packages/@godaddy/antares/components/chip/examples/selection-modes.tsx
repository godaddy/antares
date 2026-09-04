import { Chip, ChipGroup, ChipList } from '@godaddy/antares';

/** @ignore */
export function SelectionModesExample() {
  return (
    <>
      <ChipGroup aria-label="Single filters" selectionMode="single" defaultSelectedKeys={['single-a']}>
        <ChipList>
          <Chip id="single-a">Single A</Chip>
          <Chip id="single-b">Single B</Chip>
        </ChipList>
      </ChipGroup>
      <ChipGroup
        aria-label="Required filters"
        selectionMode="multiple"
        defaultSelectedKeys={['required']}
        disallowEmptySelection
      >
        <ChipList>
          <Chip id="required">Required</Chip>
          <Chip id="optional">Optional</Chip>
        </ChipList>
      </ChipGroup>
    </>
  );
}
