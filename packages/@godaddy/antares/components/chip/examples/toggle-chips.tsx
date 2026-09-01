import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

/**
 * Use Toggle Chips for multiple peer filters. Selected items show a check while
 * unselected items remain available in the same group.
 * @order 2
 */
export function ToggleChipsExample() {
  return (
    <ChipGroup defaultSelectedKeys={['home']} selectionMode="multiple">
      <Label>Amenities</Label>
      <ChipList>
        <Chip id="home" textValue="Home">
          {({ isSelected }) => (
            <>
              <Icon icon="home" />
              <Text>Home</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
        <Chip id="star" textValue="Featured">
          {({ isSelected }) => (
            <>
              <Icon icon="star" />
              <Text>Featured</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
        <Chip id="wifi" textValue="Wifi">
          {({ isSelected }) => (
            <>
              <Text>Wifi</Text>
              {isSelected ? <Icon icon="checkmark" /> : null}
            </>
          )}
        </Chip>
      </ChipList>
    </ChipGroup>
  );
}
