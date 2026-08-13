import { Flex, Menu, MenuGroup, MenuItem } from '@godaddy/antares';

/**
 * `size` controls item density. Shown here as two standalone menus so both
 * sizes are visible at once; in practice you set `size` on the `Menu` inside a
 * `MenuTrigger`.
 */
export function SizesExample() {
  return (
    <Flex gap="xl" alignItems="flex-start">
      <Menu aria-label="Small menu" size="sm" style={{ width: 220 }}>
        <MenuGroup label="Small">
          <MenuItem id="s-new">New file</MenuItem>
          <MenuItem id="s-open">Open</MenuItem>
          <MenuItem id="s-save">Save</MenuItem>
        </MenuGroup>
      </Menu>

      <Menu aria-label="Medium menu" size="md" style={{ width: 220 }}>
        <MenuGroup label="Medium">
          <MenuItem id="m-new">New file</MenuItem>
          <MenuItem id="m-open">Open</MenuItem>
          <MenuItem id="m-save">Save</MenuItem>
        </MenuGroup>
      </Menu>
    </Flex>
  );
}
