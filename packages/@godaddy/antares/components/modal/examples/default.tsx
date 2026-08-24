import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup } from '@godaddy/antares';

/**
 * Compose a Modal from a `Heading slot="title"`, a `CloseButton`, `Content`, and a
 * `ButtonGroup`. `ModalTrigger` opens the Modal and manages its open/close state.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal>
        <Heading slot="title">Delete file?</Heading>
        <CloseButton />
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
