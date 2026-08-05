import { ModalTrigger, Modal, Button, CloseButton, Heading, Content, ButtonGroup, Flex, Text } from '@godaddy/antares';
import { useState } from 'react';

/**
 * Pass `isOpen` and `onOpenChange` to `ModalTrigger` to control the open state externally.
 * @order 2
 */
export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button variant="primary">Open modal</Button>
        <Modal>
          <Heading slot="title">Modal title</Heading>
          <CloseButton />
          <Content>
            She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
          </Content>
          <ButtonGroup>
            <Button slot="close" variant="primary">
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      </ModalTrigger>

      <Text>The modal is currently {isOpen ? 'open' : 'closed'}.</Text>

      <Button variant="primary" onPress={() => setIsOpen(true)}>
        Open from outside
      </Button>
    </Flex>
  );
}
