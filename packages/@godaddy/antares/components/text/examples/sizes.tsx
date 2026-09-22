import { Flex, Text } from '@godaddy/antares';

/**
 * Without `size`, text inherits the typography around it. `size` picks a step on the body ramp
 * and changes only the font size.
 * @order 6
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="sm">
      <Text>Inherited</Text>
      <Text size="xs">Extra small</Text>
      <Text size="sm">Small</Text>
      <Text size="md">Medium</Text>
      <Text size="lg">Large</Text>
      <Text size="xl">Extra large</Text>
      <Text size="2xl">2x large</Text>
    </Flex>
  );
}
