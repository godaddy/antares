import { ModalTrigger, Modal, ModalHeading, ModalFooter, Button } from '@godaddy/antares';

export function HorizontalMediaExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Product details</Button>
      <Modal
        size="large"
        isDismissable
        media={<img src="https://picsum.photos/600/800" alt="Product" />}
        mediaVariant="full-bleed"
        alignment="horizontal"
        mediaPosition="start"
      >
        {({ close }) => (
          <>
            <ModalHeading>Product details</ModalHeading>
            <p>This modal uses a horizontal layout with the media positioned at the start.</p>
            <p>The content area scrolls independently while the media stays in place.</p>
            <ModalFooter fixedActions>
              <Button variant="secondary" onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>Add to cart</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
