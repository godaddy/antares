import { ModalTrigger, Button, Flex, Text, Icon } from '@godaddy/antares';
import { Modal } from '../src/index-a3-slotted-child.tsx';

/**
 * Prototype a3 (slotted child): the Modal is a thin container; the consumer authors
 * the whole interior and marks their OWN button with `slot="close"`. RAC's Dialog wires
 * the close behavior to it via context - no Antares subcomponent involved.
 */
export function SlottedChildExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open (slotted child)</Button>

      <Modal>
        {/* Or a <Heading /> */}
        <Text>Delete file?</Text>
        <Text>This action cannot be undone.</Text>

        <Flex gap="md" justifyContent="end">
          <Button slot="close" variant="secondary">
            Cancel
          </Button>
          <Button variant="critical">Delete</Button>
        </Flex>

        <Button
          slot="close"
          aria-label="Close dialog"
          data-track="modal-close"
          style={{ position: 'absolute', top: 8, right: 8, outline: '2px solid hotpink', outlineOffset: 2 }}
          onPress={() => console.log('slotted-child close: extra onPress (modal still closes)')}
        >
          <Icon icon="x" />
        </Button>
      </Modal>
    </ModalTrigger>
  );
}
