import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Introduce the next step in setting up a business website.
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
        <Heading slot="title">Connect your domain</Heading>
        <Text slot="body">Give your website a memorable address so customers can find your business.</Text>
      </TextLockup>
    </Card>
  );
}
