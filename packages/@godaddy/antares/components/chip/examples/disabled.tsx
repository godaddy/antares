import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';

/**
 * Disable individual options with `disabledKeys`. Disabled behavior is
 * supported by the API but is not part of the supplied Chip design spec.
 * @order 6
 */
export function DisabledExample() {
  return (
    <>
      <ChipGroup selectionMode="multiple" disabledKeys={['a', 'b']} defaultSelectedKeys={['a']}>
        <Label>Unavailable options</Label>
        <ChipList>
          <Chip id="a">Disabled option</Chip>
          <Chip id="b" textValue="Also unavailable">
            <Icon icon="star" />
            <Text>Also unavailable</Text>
          </Chip>
        </ChipList>
      </ChipGroup>
      <ChipGroup selectionMode="multiple" disabledKeys={['off']} defaultSelectedKeys={['on']}>
        <Label>Mixed availability</Label>
        <ChipList>
          <Chip id="on">Enabled</Chip>
          <Chip id="off">Disabled option</Chip>
        </ChipList>
      </ChipGroup>
    </>
  );
}
