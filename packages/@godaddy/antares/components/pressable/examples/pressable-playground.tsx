import { Box, Flex, Pressable, Text, type PressableProps } from '@godaddy/antares';

export function PlaygroundExample(props: Pick<PressableProps, 'isDisabled'>) {
  return (
    <Pressable aria-label="Account" {...props}>
      <Box role="button" padding="md" rounding="md" elevation="card">
        <Flex direction="column" gap="xs">
          <Text>Account summary</Text>
          <Text>View your account details</Text>
        </Flex>
      </Box>
    </Pressable>
  );
}
