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

const NEWSLETTERS = [
  { id: 'trends', title: 'Join our mailing list', body: 'Stay up to date on the latest trends.' },
  { id: 'product', title: 'Product updates', body: 'Hear about new features as they ship.' }
];

/**
 * Inside a CardGroup, `onAction` runs when the row is pressed or activated with Enter. Nested
 * buttons keep their own presses, so Save does not open the Modal. Compose a Card inside the Modal
 * when the action is a focused form.
 * @title Actions
 * @order 6
 */
export function ActionsExample() {
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  return (
    <>
      <CardGroup aria-label="Newsletters">
        {NEWSLETTERS.map((newsletter) => (
          <Card
            key={newsletter.id}
            id={newsletter.id}
            textValue={newsletter.title}
            onAction={() => setSubscribing(newsletter.title)}
          >
            <TextLockup>
              <Tag slot="eyebrow">Newsletter</Tag>
              <Heading slot="title">{newsletter.title}</Heading>
              <Text slot="body">{newsletter.body} Press the Card to subscribe, or save it for later.</Text>
            </TextLockup>

            <ButtonGroup justifyContent="end">
              <Button variant="primary" onPress={() => setSaved((ids) => [...ids, newsletter.id])}>
                {saved.includes(newsletter.id) ? 'Saved' : 'Save'}
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </CardGroup>

      <Modal
        isOpen={subscribing != null}
        onOpenChange={(isOpen) => !isOpen && setSubscribing(null)}
        aria-label={subscribing ?? undefined}
      >
        <Card elevation="base">
          <TextLockup>
            <Heading slot="title">{subscribing}</Heading>
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
