import { Button, Detail, Flex, Heading, SizeProvider, Text } from '@godaddy/antares';

/**
 * The nearest scope wins. An inner scope replaces the outer size rather than scaling it, so an
 * `sm` section inside an `lg` page matches `sm` anywhere else.
 * @order 4
 */
export function NestedScopesExample() {
  return (
    <SizeProvider size="lg">
      <Flex direction="column" gap="md" alignItems="start">
        <Heading level={2}>Your plan</Heading>
        <Text>Premium hosting, renews on March 1.</Text>
        <Button variant="primary">Manage plan</Button>

        <SizeProvider size="sm">
          <Flex direction="column" gap="sm" alignItems="start">
            <Detail>Need less? You can switch to Basic at any time.</Detail>
            <Button variant="primary">Compare plans</Button>
          </Flex>
        </SizeProvider>
      </Flex>
    </SizeProvider>
  );
}
