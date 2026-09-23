import { Button, Detail, Flex, Heading, SizeScope, Text } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

/**
 * The same section at each size. Without a scope, components use `md`.
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="lg">
      {SIZES.map(function section(size) {
        return (
          <SizeScope key={size} size={size}>
            <Flex direction="column" gap="sm" alignItems="start">
              <Heading>Size {size}</Heading>
              <Text>Body copy follows the scope.</Text>
              <Detail>Supporting copy too.</Detail>
              <Button variant="primary">Save</Button>
            </Flex>
          </SizeScope>
        );
      })}
    </Flex>
  );
}
