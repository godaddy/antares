import { Button, Icon, Menu, MenuItem, MenuTrigger, Popover, SubmenuTrigger, Text } from '@godaddy/antares';

/**
 * Two levels, and nothing is selected. Hover the submenu row, or press Arrow Right, to open it.
 * @title Submenu
 * @order 2
 */
export function SubmenuExample() {
  return (
    <MenuTrigger>
      <Button variant="primary">Share</Button>
      <Popover aria-label="Menu">
        <Menu aria-label="Share">
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="cut">Cut</MenuItem>
          <SubmenuTrigger>
            <MenuItem id="share" textValue="Share">
              <Text slot="label">Share</Text>
              <Icon icon="chevron-right" />
            </MenuItem>
            <Popover aria-label="Menu">
              <Menu aria-label="Share with">
                <MenuItem id="email">Email</MenuItem>
                <MenuItem id="sms">SMS</MenuItem>
                <MenuItem id="link">Copy link</MenuItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
