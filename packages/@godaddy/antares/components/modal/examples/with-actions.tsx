import { ModalTrigger, Modal, ModalHeading, ModalFooter, Button } from '@godaddy/antares';

export function WithActionsExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Confirm action</Button>
      <Modal isDismissable>
        {({ close }) => (
          <>
            <ModalHeading>Confirm changes</ModalHeading>
            <p>Are you sure you want to save these changes? This action cannot be undone.</p>
            <ModalFooter>
              <Button variant="secondary" onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>Save changes</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
