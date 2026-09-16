import { Box, Card, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 240%22%3E%3Crect width=%22640%22 height=%22240%22 fill=%22%23d45d3f%22/%3E%3Cpath d=%22M0 240 200 40l100 100 100-80 240 180H0z%22 fill=%22%23f1b24a%22/%3E%3C/svg%3E';

/** A vertical card can place its media after the content when that order serves the reading flow. */
export function VerticalExample() {
  return (
    <Card direction="column">
      <Box>
        <Heading level={3}>Vertical media order</Heading>
        <Text>Media may follow the content when the consumer's information hierarchy calls for it.</Text>
      </Box>
      <Image
        slot="media"
        src={image}
        alt="Abstract orange landscape"
        width="640"
        height="240"
        style={{ width: '100%' }}
      />
    </Card>
  );
}
