import { useState } from 'react';
import { Button, ButtonGroup, CloseButton, Content, Heading, Modal, Text, TextLockup } from '@godaddy/antares';

/**
 * A lockup nests inside a `Modal`. Slots resolve against the lockup, so the dialog still
 * needs its own `<Heading slot="title">` as a direct child, per `Modal`'s API.
 * @order 7
 */
export function InModalExample() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Heading slot="title">Cancel your subscription?</Heading>
        <CloseButton />
        <Content>
          <TextLockup size="lg">
            <Text slot="eyebrow">Billing</Text>
            <Text>You will keep access until the end of the current billing period.</Text>
          </TextLockup>
        </Content>
        <ButtonGroup>
          <Button slot="close">Keep it</Button>
          <Button slot="close" variant="critical">
            Cancel plan
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}
