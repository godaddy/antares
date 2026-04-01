import { Menu, MenuHeader, MenuItem, MenuSection, MenuSeparator, Text } from '@godaddy/antares';

/**
 * Standalone menu rendering without MenuTrigger/Popover.
 * Ensures menu internals (MenuItem, extractIconSlots, MenuSection, etc.)
 * are exercised during SSR.
 */
export function StandaloneExample() {
  return (
    <Menu>
      <MenuSection>
        <MenuHeader>Actions</MenuHeader>
        <MenuItem id="text-only">Plain text item</MenuItem>
        <MenuItem id="with-slots">
          <span slot="check">✅</span>
          <span slot="dot">▪</span>
          <span slot="chevron">→</span>
          <Text slot="label">Item with icon slots</Text>
        </MenuItem>
        <MenuItem id="mixed-children">
          <Text slot="label">Mixed children</Text>
          <span>Extra content</span>
        </MenuItem>
      </MenuSection>
      <MenuSeparator />
      <MenuSeparator variant="partial" />
    </Menu>
  );
}
