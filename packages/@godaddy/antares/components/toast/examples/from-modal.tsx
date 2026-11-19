import { useState } from 'react';
import { Button, CloseButton, Content, Heading, Modal, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * A toast raised from inside a Modal opened after the host exists, to test it paints above the
 * Modal's backdrop.
 * @ignore
 */
export function FromModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        onPress={function showToast() {
          queue.add({ message: 'Before the modal', timeout: null });
        }}
      >
        Toast before modal
      </Button>
      <Button
        onPress={function openModal() {
          setIsOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Heading slot="title">Settings</Heading>
        <CloseButton />
        <Content>
          <Button
            onPress={function showToast() {
              queue.add({ message: 'From the modal', timeout: null });
            }}
          >
            Toast from modal
          </Button>
        </Content>
      </Modal>
    </>
  );
}
