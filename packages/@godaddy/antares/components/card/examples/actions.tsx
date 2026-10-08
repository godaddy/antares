import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  FieldError,
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
 * Open a newsletter signup from the Card, or save it without opening the form. Submit a valid
 * email to see a local confirmation.
 * @title Actions
 * @order 6
 */
export function ActionsExample() {
  const [subscribing, setSubscribing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribedEmail(String(new FormData(event.currentTarget).get('email')));
    setSubscribing(false);
  }

  return (
    <>
      <CardGroup aria-label="Newsletters">
        <Card id="newsletter" textValue="Join our mailing list" onAction={() => setSubscribing(true)}>
          <TextLockup>
            <Tag slot="eyebrow">Newsletter</Tag>
            <Heading slot="title">Join our mailing list</Heading>
            <Text slot="body">Get practical tips for growing your business, delivered to your inbox every month.</Text>
          </TextLockup>

          <ButtonGroup justifyContent="end">
            <Button variant="primary" aria-pressed={saved} onPress={() => setSaved(!saved)}>
              {saved ? 'Saved' : 'Save'}
            </Button>
          </ButtonGroup>
        </Card>
      </CardGroup>
      <Text role="status">{subscribedEmail ? `Subscribed with ${subscribedEmail}` : ''}</Text>

      <Modal isOpen={subscribing} onOpenChange={setSubscribing} aria-label="Join our mailing list">
        <Box as="form" onSubmit={subscribe}>
          <Card elevation="base">
            <TextLockup>
              <Heading slot="title">Join our mailing list</Heading>
              <Text slot="body">One email a month. Unsubscribe whenever you like.</Text>
            </TextLockup>

            <TextField type="email" name="email" isRequired>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <Box style={{ minHeight: '1.5em' }}>
                <FieldError>Enter a valid email address.</FieldError>
              </Box>
            </TextField>

            <ButtonGroup justifyContent="end">
              <Button slot="close">Cancel</Button>
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </ButtonGroup>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
