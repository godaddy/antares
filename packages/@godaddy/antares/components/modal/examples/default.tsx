import { ModalTrigger, Modal, Button, CloseButton, Header, Heading, Content, ButtonGroup } from '@godaddy/antares';

/**
 * Compose a Modal from `Header`, `Content`, and `ButtonGroup`. `ModalTrigger` opens the Modal
 * and manages its open/close state.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Header>
          <Heading slot="title">Delete file?</Heading>
          <CloseButton />
        </Header>
        <Content>This action cannot be undone. The file will be permanently removed.</Content>
        <ButtonGroup>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="critical">
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
