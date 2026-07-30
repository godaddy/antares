import { ModalTrigger, Button } from '@godaddy/antares';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalActions,
  ModalCloseButton
} from '../src/index-a2-compound.tsx';

/**
 * Prototype a2 (compound): the consumer assembles the modal from Antares
 * subcomponents and controls the structure. The close button set (aria-label,
 * data-track, chained onPress, restyle) is applied directly to `ModalCloseButton`.
 * Reordering/omitting parts is just moving JSX around - full structural control.
 */
export function CompoundExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open (compound)</Button>

      <Modal>
        <ModalHeader>
          <ModalTitle>Delete file?</ModalTitle>
          <ModalCloseButton
            aria-label="Close dialog"
            data-track="modal-close"
            style={{ outline: '2px solid hotpink', outlineOffset: 2 }}
            onPress={() => console.log('compound close: extra onPress (modal still closes)')}
          />
        </ModalHeader>

        <ModalBody>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalBody>

        <ModalActions>
          <Button slot="close" variant="secondary">
            Cancel
          </Button>
          <Button variant="critical">Delete</Button>
        </ModalActions>
      </Modal>
    </ModalTrigger>
  );
}
