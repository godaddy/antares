import { Card, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  /** Card heading. */
  heading?: string;
  /** Card description. */
  description?: string;
}

export function PlaygroundExample({
  heading = 'Playground card',
  description = 'Compose any content inside the surface.'
}: PlaygroundExampleProps) {
  return (
    <Card>
      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          Preview
        </Tag>
        <Heading slot="title" level={3}>
          {heading}
        </Heading>
        <Text slot="body">{description}</Text>
      </TextLockup>
    </Card>
  );
}
