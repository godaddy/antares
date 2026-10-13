import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  /** Card heading. */
  heading?: string;
  /** Card description. */
  description?: string;
}

export function PlaygroundExample({
  heading = 'Connect your domain',
  description = 'Give your website a memorable address so customers can find your business.'
}: PlaygroundExampleProps) {
  return (
    <Card>
      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          Preview
        </Tag>
        <Heading slot="title">{heading}</Heading>
        <Text slot="body">{description}</Text>
      </TextLockup>
    </Card>
  );
}
