import { Flex, Link, Text } from '@godaddy/antares';

/**
 * Disabled links remain in the accessibility tree, while external links get safe defaults that
 * callers can override with native target, rel, and download props.
 * @order 3
 */
export function StatesExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <Text>
        <Link href="https://example.com" isExternal>
          External link
        </Link>
      </Text>
      <Text>
        <Link href="https://example.com/report" isExternal target="_self" rel="author" download="report.pdf">
          External link with overrides
        </Link>
      </Text>
      <Link href="/disabled" isDisabled>
        Disabled link
      </Link>
    </Flex>
  );
}
