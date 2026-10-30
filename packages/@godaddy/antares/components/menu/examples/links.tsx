import { Button, Menu, MenuItem, MenuTrigger, Popover } from '@godaddy/antares';

/**
 * A row with `href` is a link. The menu still closes after it is chosen.
 * @title Links
 * @order 8
 */
export function LinksExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Links</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Links">
          <MenuItem id="docs" href="https://example.com/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </MenuItem>
          <MenuItem id="blog" href="https://example.com/blog" target="_blank" rel="noopener noreferrer">
            Blog
          </MenuItem>
          <MenuItem id="support" href="https://example.com/support" target="_blank" rel="noopener noreferrer">
            Support
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
