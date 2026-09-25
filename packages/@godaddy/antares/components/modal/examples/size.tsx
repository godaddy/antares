import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup, Text } from '@godaddy/antares';

/**
 * `size` sets the modal's text, controls, and spacing. Without it, the modal follows the size
 * scope around its trigger.
 * @order 6
 */
export function SizeExample() {
  return (
    <ModalTrigger>
      <Button>Open small modal</Button>
      <Modal size="sm">
        <Heading slot="title">Rename file</Heading>
        <CloseButton />
        <Content>
          <Text>The new name applies everywhere the file is shared.</Text>
        </Content>
        <ButtonGroup>
          <Button slot="close">Cancel</Button>
          <Button slot="close" variant="primary">
            Rename
          </Button>
        </ButtonGroup>
      </Modal>
    </ModalTrigger>
  );
}
