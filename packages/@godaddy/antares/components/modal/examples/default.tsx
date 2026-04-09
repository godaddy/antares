import { ModalTrigger, Modal, ModalHeading, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal isDismissable>
        <ModalHeading>Modal title</ModalHeading>
        <p>This is the modal content. It provides a contextual dialog that temporarily interrupts the user.</p>
      </Modal>
    </ModalTrigger>
  );
}
