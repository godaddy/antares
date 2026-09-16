import { Card, Heading, Text, TextLockup } from '@godaddy/antares';

/** Compose a TextLockup when the card needs coordinated eyebrow, title, and body type. */
export function TextLockupExample() {
  return (
    <Card>
      <TextLockup>
        <Text slot="eyebrow">Recommended</Text>
        <Heading slot="title" level={3}>
          A coordinated text lockup
        </Heading>
        <Text slot="body">TextLockup keeps the type hierarchy together while Card owns only the surface.</Text>
      </TextLockup>
    </Card>
  );
}
