import { ModalTrigger, Modal, Button, Flex } from '@godaddy/antares';

/**
 * The default modal exposes a `title`, `description`, and `children` content area. Open and close state is managed automatically by `ModalTrigger`.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Open modal</Button>
      <Modal
        title="Modal title"
        description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
      >
        <Flex padding="md" elevation="card" justifyContent="center">
          This is the children content
        </Flex>
      </Modal>
    </ModalTrigger>
  );
}
