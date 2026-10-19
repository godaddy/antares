import { Flex, Skeleton } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

/**
 * Match `width` to `size` for avatar placeholders. Use `full` rounding for people and the default
 * rounding for businesses and accounts.
 * @order 5
 */
export function AvatarExample() {
  return (
    <Flex direction="column" gap="md">
      <Flex alignItems="center" gap="md">
        {sizes.map(function renderCircle(size) {
          return <Skeleton key={size} size={size} width={size} rounding="full" />;
        })}
      </Flex>
      <Flex alignItems="center" gap="md">
        {sizes.map(function renderSquare(size) {
          return <Skeleton key={size} size={size} width={size} />;
        })}
      </Flex>
    </Flex>
  );
}
