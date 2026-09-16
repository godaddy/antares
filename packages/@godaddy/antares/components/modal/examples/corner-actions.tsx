import { Button, CloseButton, Content, CornerActions, Heading, Modal, ModalTrigger } from '@godaddy/antares';

/**
 * Place a dismiss action in CornerActions to compose the modal's corner controls.
 * @title Corner Actions
 * @order 3
 */
export function CornerActionsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal with corner actions</Button>
      <Modal>
        <Heading slot="title">Corner actions modal</Heading>
        <CornerActions>
          <CloseButton />
        </CornerActions>
        <Content>Close this modal from its always-visible corner actions.</Content>
      </Modal>
    </ModalTrigger>
  );
}
