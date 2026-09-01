import { Button, Flex, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

/**
 * Menu filters use a rounded Button as the trigger that opens a Menu. This is
 * a related pattern rather than a Chip inside ChipGroup.
 * @title Menu filter trigger
 * @order 9
 */
export function MenuFilterTriggerExample() {
  return (
    <MenuTrigger>
      <Flex as={Button} alignItems="center" gap="sm" rounding="full" variant="secondary">
        <Icon icon="map-pin" />
        <Text>Location</Text>
        <Icon icon="chevron-down" />
      </Flex>
      <Menu aria-label="Location">
        <MenuItem id="austin">Austin</MenuItem>
        <MenuItem id="chicago">Chicago</MenuItem>
        <MenuItem id="denver">Denver</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
