import { Box, Flex, Pressable, Text, type PressableProps } from '@godaddy/antares';

export interface CardExampleProps {
  onPress?: PressableProps['onPress'];
}

/**
 * Compose Pressable with a custom card surface while keeping the card's own layout and styling.
 * @title Card
 * @order 2
 */
export function CardExample({ onPress }: CardExampleProps) {
  return (
    <Pressable aria-label="View account summary" onPress={onPress}>
      <Box role="button" padding="md" rounding="md" elevation="card">
        <Flex direction="column" gap="xs">
          <Text>Account summary</Text>
          <Text>View your account details</Text>
        </Flex>
      </Box>
    </Pressable>
  );
}
