import { ModalTrigger, Modal, ModalHeading, ModalFooter, Button } from '@godaddy/antares';
import type { ModalProps } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: ModalProps['size'];
  isDismissable?: boolean;
  mediaVariant?: ModalProps['mediaVariant'];
  alignment?: ModalProps['alignment'];
  mediaPosition?: ModalProps['mediaPosition'];
  textAlign?: ModalProps['textAlign'];
  showMedia?: boolean;
  fixedActions?: boolean;
}

export function PlaygroundExample({
  size,
  isDismissable = true,
  mediaVariant,
  alignment,
  mediaPosition,
  textAlign,
  showMedia,
  fixedActions
}: PlaygroundExampleProps) {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        size={size}
        isDismissable={isDismissable}
        media={showMedia ? <img src="https://picsum.photos/800/400" alt="Placeholder" /> : undefined}
        mediaVariant={showMedia ? mediaVariant : undefined}
        alignment={showMedia ? alignment : undefined}
        mediaPosition={showMedia ? mediaPosition : undefined}
        textAlign={textAlign}
      >
        {({ close }) => (
          <>
            <ModalHeading>Modal title</ModalHeading>
            <p>This is the modal content. Adjust the controls to explore different configurations.</p>
            <ModalFooter fixedActions={fixedActions}>
              <Button variant="secondary" onPress={close}>Cancel</Button>
              <Button variant="primary" onPress={close}>Confirm</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </ModalTrigger>
  );
}
