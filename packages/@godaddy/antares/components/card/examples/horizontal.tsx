import { Box, Card, Flex, Heading, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 360%22%3E%3Crect width=%22320%22 height=%22360%22 fill=%22%234ecdc4%22/%3E%3Cpath d=%22M0 360 120 160l70 70 55-55 75 185H0z%22 fill=%22%230b3d91%22/%3E%3C/svg%3E';

/** A horizontal card with a percentage media width chosen by the consumer. */
export function HorizontalExample() {
  return (
    <Card direction="row" alignItems="stretch">
      <Image
        slot="media"
        src={image}
        alt="Abstract teal landscape"
        width="160"
        height="180"
        style={{ width: '40%', objectFit: 'cover' }}
      />
      <Box flex="1 1 0" style={{ minWidth: 0 }}>
        <Flex direction="column" gap="sm">
          <Heading level={3}>Horizontal media</Heading>
          <Text>The consumer chooses the 40% media width and can change it for the surrounding layout.</Text>
        </Flex>
      </Box>
    </Card>
  );
}
