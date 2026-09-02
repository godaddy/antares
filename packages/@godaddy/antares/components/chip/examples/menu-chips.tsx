import { Button, Flex, Icon, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

/**
 * For a menu with a Chip-like appearance, compose a rounded Button inside
 * `MenuTrigger`.
 * @title Menu filter trigger
 * @order 9
 */
export function MenuFilterTriggerExample() {
  return (
    <MenuTrigger>
      <Flex as={Button} variant="secondary" size="md" rounding="full" blockPadding="sm" inlinePadding="md">
        <Text>Location</Text>
        <Icon aria-hidden icon="chevron-down" />
      </Flex>
      <Menu aria-label="Location">
        <MenuItem id="austin">Austin</MenuItem>
        <MenuItem id="chicago">Chicago</MenuItem>
        <MenuItem id="denver">Denver</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
