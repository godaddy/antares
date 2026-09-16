import { Link, Text } from '@godaddy/antares';

/** A text Link used inline with surrounding Text. @order 1 */
export function DefaultExample() {
  return (
    <Text>
      Read more in our <Link href="/about">About page</Link>.
    </Text>
  );
}
