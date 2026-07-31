import { Button, Icon, Menu, MenuItem, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';

/** Nested menus via `SubmenuTrigger`. */
export function SubmenuExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Share</Button>
      <Menu aria-label="Share">
        <MenuItem id="copy">Copy link</MenuItem>

        <SubmenuTrigger>
          <MenuItem id="resources" icon={<Icon icon="ok" />}>
            Resources
          </MenuItem>
          <Menu aria-label="Resources">
            <MenuItem id="file">File</MenuItem>
            <MenuItem id="folder">Folder</MenuItem>
          </Menu>
        </SubmenuTrigger>

        <SubmenuTrigger>
          <MenuItem id="dates" icon={<Icon icon="calendar" />}>
            Dates
          </MenuItem>
          <Menu aria-label="Dates">
            <MenuItem id="monday">Monday</MenuItem>
            <MenuItem id="friday">Friday</MenuItem>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  );
}
