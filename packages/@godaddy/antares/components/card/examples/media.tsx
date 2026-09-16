import { Card, Flex, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22480%22 cy=%22110%22 r=%2270%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 300 180 150l120 100 90-75 250 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

/** An inset media card using the default Card padding and a slotted Image. */
export function MediaExample() {
  return (
    <Card>
      <Image slot="media" src={image} alt="Blue mountain landscape" width="640" height="360" />
      <Flex direction="column" gap="sm">
        <Heading level={3}>Inset media</Heading>
        <Text>The image participates in the consumer-owned layout and keeps the card's standard inset.</Text>
      </Flex>
    </Card>
  );
}
