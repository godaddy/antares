import { useState } from 'react';
import { Button, ButtonGroup, CloseButton, Content, Header, Heading, Modal, Text } from '@godaddy/antares';

/**
 * `Modal` accepts `isOpen` and `onOpenChange` directly, so it can be controlled without a
 * `ModalTrigger` - useful when the modal is opened from several places at once.
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
        <Content>
          <Text as="p">Controlled with a flat `isOpen` prop, no trigger required.</Text>
        </Content>
        <ButtonGroup>
          <Button slot="close" variant="primary">
            Done
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}
