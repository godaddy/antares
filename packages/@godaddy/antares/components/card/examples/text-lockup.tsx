import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Compose Card with TextLockup for eyebrow, title, and body.
 * @title Text lockup
 * @order 2
 */
export function TextLockupExample() {
  return (
    <Card>
      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          New
        </Tag>
        <Heading slot="title">A composed card</Heading>
        <Text slot="body">Cards provide a surface while consumers own the interior layout.</Text>
      </TextLockup>
    </Card>
  );
}
