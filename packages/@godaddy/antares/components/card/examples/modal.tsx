import { Button, ButtonGroup, Card, Input, Label, Modal, ModalTrigger, Text, TextField } from '@godaddy/antares';

/**
 * Compose a subscribe Card inside a Modal. The Card owns the copy, field, and actions.
 * @title Modal
 * @order 10
 */
export function ModalExample() {
  return (
    <ModalTrigger>
      <Button variant="primary">Subscribe</Button>
      <Modal aria-label="Join our mailing list">
        <Card>
          <Text>The market is evolving. Stay up to date on the latest trends by joining our mailing list.</Text>
          <TextField type="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </TextField>

          <ButtonGroup>
            <Button slot="close">Cancel</Button>
            <Button slot="close" variant="primary">
              Submit
            </Button>
          </ButtonGroup>
        </Card>
      </Modal>
    </ModalTrigger>
  );
}
