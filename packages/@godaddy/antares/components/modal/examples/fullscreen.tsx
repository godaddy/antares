import { ModalTrigger, Modal, ModalHeading, ModalFooter, Button } from '@godaddy/antares';

export function FullscreenExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open fullscreen</Button>
      <Modal size="fullscreen" isDismissable>
        {({ close }) => (
          <>
            <ModalHeading>Fullscreen modal</ModalHeading>
            <p>This modal takes up the entire viewport. Useful for complex workflows or immersive content.</p>
            <ModalFooter>
              <Button variant="secondary" onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>Done</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
