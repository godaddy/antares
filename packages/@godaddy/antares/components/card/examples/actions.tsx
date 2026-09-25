import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Heading,
  Input,
  Label,
  Modal,
  Tag,
  Text,
  TextField,
  TextLockup
} from '@godaddy/antares';

/**
 * `onPress` is the Card primary. Nested buttons keep their own hits, so Save does not open the
 * Modal. Compose a Card inside the Modal when the action is a focused form.
 * @title Actions
 * @order 6
 */
export function ActionsExample() {
  const [isOpen, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Card aria-label="Join mailing list" onPress={() => setOpen(true)}>
        <TextLockup>
          <Tag slot="eyebrow">Newsletter</Tag>
          <Heading slot="title">Join our mailing list</Heading>
          <Text slot="body">
            Stay up to date on the latest trends. Press the Card to subscribe, or save it for later.
          </Text>
        </TextLockup>

        <ButtonGroup justifyContent="end">
          <Button variant="primary" onPress={() => setSaved(true)}>
            {saved ? 'Saved' : 'Save'}
          </Button>
        </ButtonGroup>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={setOpen} aria-label="Join our mailing list">
        <Card elevation="base">
          <TextLockup>
            <Heading slot="title">Join our mailing list</Heading>
            <Text slot="body">The market is evolving. Stay up to date on the latest trends.</Text>
          </TextLockup>

          <TextField type="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </TextField>

          <ButtonGroup justifyContent="end">
            <Button slot="close">Cancel</Button>
            <Button slot="close" variant="primary">
              Submit
            </Button>
          </ButtonGroup>
        </Card>
      </Modal>
    </>
  );
}
