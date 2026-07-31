import { Button, Icon, Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from '@godaddy/antares';

/**
 * Labeled groups separated by dividers, a multi-select checkbox group mixed with
 * plain action groups, leading icons, a disabled item, and a link.
 */
export function GroupsExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">View</Button>
      <Menu aria-label="View options">
        {/* Unlabeled multi-select group: items render as checkboxes. */}
        <MenuGroup selectionMode="multiple" defaultSelectedKeys={['name', 'date']}>
          <MenuItem id="name">Name</MenuItem>
          <MenuItem id="date">Date modified</MenuItem>
          <MenuItem id="size">Size</MenuItem>
        </MenuGroup>

        <MenuSeparator />

        {/* Labeled group of plain action items, with leading icons + a disabled item. */}
        <MenuGroup label="Actions">
          <MenuItem id="refresh" icon={<Icon icon="circle-half" />}>
            Refresh
          </MenuItem>
          <MenuItem id="export" icon={<Icon icon="grid" />}>
            Export
          </MenuItem>
          <MenuItem id="archive" isDisabled>
            Archive (unavailable)
          </MenuItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup label="More">
          <MenuItem id="docs" href="https://example.com" target="_blank" textValue="Documentation">
            <span>Documentation</span>
          </MenuItem>
        </MenuGroup>
      </Menu>
    </MenuTrigger>
  );
}
