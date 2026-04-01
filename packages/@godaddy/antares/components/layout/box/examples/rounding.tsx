import { Box, Flex } from '@godaddy/antares';

export function RoundingExample() {
  return (
    <Flex wrap="wrap" direction="column" gap="md">
      <Box padding="md" rounding="xs" elevation="card">
        xs
      </Box>
      <Box padding="md" rounding="sm" elevation="card">
        sm
      </Box>
      <Box padding="md" rounding="md" elevation="card">
        md
      </Box>
      <Box padding="md" rounding="lg" elevation="card">
        lg
      </Box>
      <Box padding="md" rounding="xl" elevation="card">
        xl
      </Box>
      <Box padding="md" rounding="2xl" elevation="card">
        2xl
      </Box>
      <Box padding="md" rounding="full" elevation="card" style={{ width: '80px', height: '80px' }}>
        full
      </Box>
      <Box padding="md" rounding="full" elevation="card" style={{ width: '200px', height: '80px' }}>
        pill
      </Box>
    </Flex>
  );
}
