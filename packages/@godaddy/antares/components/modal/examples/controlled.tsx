import { ModalTrigger, Modal, Button, Flex, Text } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button variant="primary">Open modal</Button>
        <Modal
          title="Modal title"
          description="She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther."
          actions={[
            <Button key="close" slot="close" variant="primary">
              Close
            </Button>
          ]}
        />
      </ModalTrigger>

      <Text>The modal is currently {isOpen ? 'open' : 'closed'}.</Text>

      <Button variant="secondary" onPress={() => setIsOpen(true)}>
        Open from outside
      </Button>
    </Flex>
  );
}
