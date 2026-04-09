import { ModalTrigger, Modal, ModalHeading, ModalFooter, Button } from '@godaddy/antares';

export function WithMediaExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">View details</Button>
      <Modal
        isDismissable
        media={<img src="https://picsum.photos/800/300" alt="Placeholder" />}
        mediaVariant="inset"
      >
        {({ close }) => (
          <>
            <ModalHeading>Featured content</ModalHeading>
            <p>This modal includes an inset media element displayed above the content.</p>
            <ModalFooter>
              <Button variant="primary" onPress={close}>Close</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
