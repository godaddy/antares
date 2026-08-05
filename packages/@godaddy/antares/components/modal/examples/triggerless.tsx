import { useState } from 'react';
import { Button, ButtonGroup, CloseButton, Content, Header, Heading, Modal, Text } from '@godaddy/antares';

/**
 * `Modal` accepts `isOpen` and `onOpenChange` directly, so it can be controlled without a
 * `ModalTrigger`. Useful when the modal is opened from several places at once.
 * @title Triggerless
 * @order 4
 */
export function TriggerlessExample() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Header>
          <Heading slot="title">Triggerless modal</Heading>
          <CloseButton />
        </Header>
        <Content>This is the content of the modal.</Content>
        <ButtonGroup>
          <Button slot="close" variant="primary">
            Done
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}
