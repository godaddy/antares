import { Button, Menu, MenuHeader, MenuItem, MenuSection, MenuSeparator, MenuTrigger } from '@godaddy/antares';

export function SectionsExample() {
  return (
    <MenuTrigger>
      <Button>View</Button>
      <Menu>
        <MenuSection>
          <MenuHeader>Zoom</MenuHeader>
          <MenuItem id="zoom-in">Zoom In</MenuItem>
          <MenuItem id="zoom-out">Zoom Out</MenuItem>
          <MenuItem id="zoom-reset">Reset Zoom</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection>
          <MenuHeader>Layout</MenuHeader>
          <MenuItem id="sidebar">Toggle Sidebar</MenuItem>
          <MenuItem id="panel">Toggle Panel</MenuItem>
          <MenuItem id="fullscreen">Fullscreen</MenuItem>
        </MenuSection>
        <MenuSeparator variant="partial" />
        <MenuSection>
          <MenuHeader>Appearance</MenuHeader>
          <MenuItem id="theme-light">Light Theme</MenuItem>
          <MenuItem id="theme-dark">Dark Theme</MenuItem>
          <MenuItem id="theme-auto">Auto</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  );
}
