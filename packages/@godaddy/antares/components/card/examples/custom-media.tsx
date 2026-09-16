import { Box, Card, Heading, Text } from '@godaddy/antares';

/** A custom media slot can be any consumer-owned Box or visual composition. */
export function CustomMediaExample() {
  return (
    <Card>
      <Box
        slot="media"
        style={{
          aspectRatio: '16 / 9',
          background: 'linear-gradient(135deg, #145fa9 0%, #4ecdc4 100%)',
          borderRadius: 6
        }}
      />
      <Heading level={3}>Custom media</Heading>
      <Text>A slotted Box is useful for gradients, illustrations, or other media containers.</Text>
    </Card>
  );
}
