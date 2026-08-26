import { useState } from 'react';
import { Button, ButtonGroup, CloseButton, Content, Heading, Modal, Text, TextLockup } from '@godaddy/antares';

/**
 * A lockup nests inside a `Modal`. It adds its own type to the dialog's title slot without
 * replacing what the dialog provides there, so `slot="title"` still supplies the accessible
 * name via `aria-labelledby`.
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
        <CloseButton />
        <Content>
          <TextLockup size="lg">
            <Text slot="eyebrow">Billing</Text>
            <Heading slot="title">Cancel your subscription?</Heading>
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
