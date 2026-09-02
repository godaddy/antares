import { Button, Chip, ChipGroup, ChipList, Flex, Icon, Label, Text } from '@godaddy/antares';

/** @ignore */
export function InteractionStatesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ChipGroup selectionMode="multiple" defaultSelectedKeys={['selected']}>
        <Label>Toggle states</Label>
        <ChipList>
          <Chip id="default">Default</Chip>
          <Chip id="selected" textValue="Selected">
            {({ isSelected }) => (
              <>
                <Icon icon="star" />
                <Text>Selected</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
        </ChipList>
      </ChipGroup>
      <ChipGroup
        aria-label="Removable states"
        onRemove={function noop() {
          /* visual test only */
        }}
      >
        <ChipList>
          <Chip id="removable" textValue="Removable">
            <Text>Removable</Text>
            <Button slot="remove" />
          </Chip>
        </ChipList>
      </ChipGroup>
    </Flex>
  );
}
