import {
  Button,
  CloseButton,
  Content,
  Heading,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  ModalTrigger,
  Popover
} from '@godaddy/antares';

/**
 * The menu trigger lives in a dialog. Opening the menu leaves the dialog in place.
 * @title Open from dialog
 * @order 9
 */
export function OpenFromDialogExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open dialog</Button>
      <Modal>
        <Heading slot="title">Edit file</Heading>
        <CloseButton />
        <Content>
          <MenuTrigger>
            <Button>Open menu</Button>
            <Popover aria-label="Menu">
              <Menu aria-label="File">
                <MenuItem id="new-text">New text file</MenuItem>
                <MenuItem id="new-file">New file…</MenuItem>
                <MenuItem id="new-window">New window</MenuItem>
                <MenuItem id="open-file">Open file…</MenuItem>
                <MenuItem id="export">Export</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </Content>
      </Modal>
    </ModalTrigger>
  );
}
