import { Box, Flex, Pressable, Text } from '@godaddy/antares';

/**
 * Add accessible press behavior to an existing visual component without adding a wrapper element.
 * The surface supports pointer, touch, and keyboard activation.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Pressable aria-label="View account summary">
      <Box role="button" padding="md" rounding="md" elevation="card">
        <Flex direction="column" gap="xs">
          <Text>Account summary</Text>
          <Text>View your account details</Text>
        </Flex>
      </Box>
    </Pressable>
  );
}
