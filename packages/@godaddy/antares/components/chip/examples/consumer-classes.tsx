import { Button, Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

/**
 * Consumer classes compose with the presentation supplied by Chip contexts.
 * @ignore
 */
export function ConsumerClassesExample() {
  return (
    <ChipGroup
      className="consumer-group"
      defaultSelectedKeys={['custom']}
      selectionMode="multiple"
      onRemove={function noop() {
        /* test only */
      }}
    >
      <Label className="consumer-label">Custom classes</Label>
      <ChipList className="consumer-list">
        <Chip
          id="custom"
          textValue="Custom"
          className={function consumerChipClassName({ isSelected }) {
            return isSelected ? 'consumer-chip consumer-selected' : 'consumer-chip';
          }}
        >
          <Icon icon="star" className="consumer-icon" />
          <Text className="consumer-text">Custom</Text>
          <Button slot="remove" className="consumer-remove" data-consumer-prop="preserved" />
        </Chip>
      </ChipList>
      <Text slot="description" className="consumer-description">
        Description
      </Text>
      <Text slot="errorMessage" className="consumer-error">
        Error message
      </Text>
    </ChipGroup>
  );
}
