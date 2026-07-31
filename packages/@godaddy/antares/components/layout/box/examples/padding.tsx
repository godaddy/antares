import { Box, Flex, type BoxProps } from '@godaddy/antares';

/**
 * The padding props support t-shirt sizes and CSS logical properties for RTL support.
 * @order 1
 */
export function PaddingExample(attrs: BoxProps) {
  return (
    <Flex direction="column" gap="md">
      <Box padding="md" elevation="card" {...attrs}>
        Padding: md
      </Box>
      <Box blockPadding="lg" elevation="card">
        Block Padding: lg
      </Box>
      <Box inlinePadding="xl" elevation="card">
        Inline Padding: xl
      </Box>
      <Box blockPaddingStart="sm" blockPaddingEnd="lg" elevation="card">
        Block Padding Start: sm, End: lg
      </Box>
    </Flex>
  );
}
