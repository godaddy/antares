import { Flex, Text } from '@godaddy/antares';

/**
 * Without `size`, text takes the scope's body tier, or `md` outside any scope. `size` picks a step
 * on the body ramp and changes only the font size.
 * @order 6
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="sm">
      <Text>Default</Text>
      <Text size="xs">Extra small</Text>
      <Text size="sm">Small</Text>
      <Text size="md">Medium</Text>
      <Text size="lg">Large</Text>
      <Text size="xl">Extra large</Text>
      <Text size="2xl">2x large</Text>
    </Flex>
  );
}
