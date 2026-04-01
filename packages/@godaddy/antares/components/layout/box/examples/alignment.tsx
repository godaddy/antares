import { Box, Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex gap="md" style={{ height: '150px' }}>
      <Box padding="sm" alignSelf="start" elevation="card">
        align-self: start
      </Box>
      <Box padding="sm" alignSelf="center" elevation="card">
        align-self: center
      </Box>
      <Box padding="sm" alignSelf="end" elevation="card">
        align-self: end
      </Box>
      <Box padding="sm" alignSelf="stretch" elevation="card">
        align-self: stretch
      </Box>
    </Flex>
  );
}
