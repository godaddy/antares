import { Avatar, Flex, Text } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

/**
 * Use circular Avatars for people and square Avatars for organizations, workspaces, and accounts.
 * @title Shapes and sizes
 * @order 4
 */
export function ShapesExample() {
  return (
    <Flex direction="column" gap="md">
      <Flex direction="column" gap="sm">
        <Text>Circle</Text>
        <Flex alignItems="center" gap="md">
          {sizes.map(function renderCircle(size) {
            return (
              <Avatar key={size} shape="circle" size={size}>
                <Text>UT</Text>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
      <Flex direction="column" gap="sm">
        <Text>Square</Text>
        <Flex alignItems="center" gap="md">
          {sizes.map(function renderSquare(size) {
            return (
              <Avatar key={size} shape="square" size={size}>
                <Text>AC</Text>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
