import { Flex, Skeleton } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

/**
 * Match `width` to `size` to make a square, and add `full` rounding to make a circle.
 * @title Circles and squares
 * @order 6
 */
export function ShapesExample() {
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
