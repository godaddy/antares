import { Card, Heading, Text } from '@godaddy/antares';

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
      <Heading level={3}>{heading}</Heading>
      <Text>{description}</Text>
    </Card>
  );
}
