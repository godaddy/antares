import { Card, Heading, Text } from '@godaddy/antares';

/** A composed static Card surface with heading and description. @order 1 */
export function DefaultExample() {
  return (
    <Card>
      <Heading level={3}>A composed card</Heading>
      <Text>Cards provide a surface while consumers own the interior layout.</Text>
    </Card>
  );
}
