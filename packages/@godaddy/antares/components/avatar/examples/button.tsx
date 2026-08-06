import { Avatar, Box, Button, Flex, Text } from '@godaddy/antares';

/**
 * Turn an avatar into a clickable control by composing it with a `ghost` Button.
 * Match `rounding` to the avatar shape.
 * @title Avatar button
 * @order 7
 */
export function ButtonExample() {
  return (
    <Flex gap="sm">
      <Box as={Button} variant="ghost" aria-label="Account" rounding="full">
        <Avatar>
          <Text>UT</Text>
        </Avatar>
      </Box>
      <Box as={Button} variant="ghost" aria-label="Workspace" rounding="lg">
        <Avatar shape="square">
          <Text>UT</Text>
        </Avatar>
      </Box>
    </Flex>
  );
}
