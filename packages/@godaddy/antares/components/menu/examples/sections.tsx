import {
  Box,
  Button,
  Header,
  Heading,
  Menu,
  MenuGroup,
  MenuItem,
  Separator,
  MenuTrigger,
  Popover
} from '@godaddy/antares';

/**
 * A title sits beside the menu. Use `MenuGroup` and `Header` with `Heading` to label sections of items, separated by `Separator`.
 * @title Title and groups
 * @order 5
 */
export function TitleAndGroupsExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Publish</Button>
      <Popover aria-label="Menu">
        <Box blockPaddingStart="md" inlinePadding="lg">
          <Heading size="md">Menu Title</Heading>
        </Box>
        <Menu aria-label="Publish">
          <MenuGroup>
            <Header>
              <Heading>Export</Heading>
            </Header>
            <MenuItem id="image">Image…</MenuItem>
            <MenuItem id="video">Video…</MenuItem>
            <MenuItem id="text">Text…</MenuItem>
          </MenuGroup>
          <Separator />
          <MenuGroup>
            <Header>
              <Heading>Share</Heading>
            </Header>
            <MenuItem id="youtube">YouTube…</MenuItem>
            <MenuItem id="instagram">Instagram…</MenuItem>
            <MenuItem id="email">Email…</MenuItem>
          </MenuGroup>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
