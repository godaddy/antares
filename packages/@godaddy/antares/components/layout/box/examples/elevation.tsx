import { Box, Flex } from '@godaddy/antares';

export function ElevationExample() {
  return (
    <Flex direction="column" gap="lg" padding="md">
      <Box padding="md" elevation="base">
        Elevation: base
      </Box>

      <Box padding="md" elevation="card">
        Elevation: card
      </Box>

      <Box padding="md" elevation="raised">
        Elevation: raised
      </Box>

      <Box padding="md" elevation="overlay">
        Elevation: overlay
      </Box>
    </Flex>
  );
}
