import { Avatar, AvatarFallback, Flex, Text } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export function ShapesExample() {
  return (
    <Flex direction="column" gap="md">
      <Flex direction="column" gap="sm">
        <Text>Circle</Text>
        <Flex alignItems="center" gap="md">
          {sizes.map(function renderCircle(size) {
            return (
              <Avatar key={size} shape="circle" size={size}>
                <AvatarFallback>UT</AvatarFallback>
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
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
