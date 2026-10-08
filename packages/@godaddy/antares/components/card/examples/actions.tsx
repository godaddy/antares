import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
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
 * Inside a CardGroup, `onAction` runs when the row is pressed or activated with Enter. Nested
 * buttons keep their own presses, so Save does not open the Modal. Compose a Card inside the Modal
 * when the action is a focused form.
 * @title Actions
 * @order 6
 */
export function ActionsExample() {
  const [subscribing, setSubscribing] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <CardGroup aria-label="Newsletters">
        <Card id="newsletter" textValue="Join our mailing list" onAction={() => setSubscribing(true)}>
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
      </CardGroup>

      <Modal isOpen={subscribing} onOpenChange={setSubscribing} aria-label="Join our mailing list">
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
