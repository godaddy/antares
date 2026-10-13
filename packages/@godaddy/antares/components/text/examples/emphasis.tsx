import { Flex, Text } from '@godaddy/antares';

/**
 * `emphasis` selects a feedback color and changes nothing else. Without it, text inherits the
 * surrounding color.
 * @order 7
 */
export function EmphasisExample() {
  return (
    <Flex direction="column" gap="sm">
      <Text emphasis="critical">Payment failed</Text>
      <Text emphasis="warning">Card expires soon</Text>
      <Text emphasis="success">Payment received</Text>
      <Text emphasis="info">Invoice sent</Text>
      <Text emphasis="passive">No recent activity</Text>
    </Flex>
  );
}
