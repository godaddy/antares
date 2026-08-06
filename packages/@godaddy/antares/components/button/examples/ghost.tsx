import { Avatar, Box, Button, Text } from '@godaddy/antares';

/**
 * The ghost variant is an unstyled, interactive wrapper. It provides focus, hover,
 * and pressed states but no padding, margin, or sizing, so you control the shape.
 * Compose with Box to add rounding and padding.
 */
export function GhostExample() {
  return (
    <Box as={Button} aria-label="Account menu" variant="ghost" rounding="full">
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </Box>
  );
}
