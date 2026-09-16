import { Button, Card, Flex, Heading, Text } from '@godaddy/antares';

/** A text-only card with a bottom action owned by the consumer. */
export function TextOnlyExample() {
  return (
    <Card>
      <Flex direction="column" gap="sm" flexGrow={1}>
        <Heading level={3}>A text-only card</Heading>
        <Text>Use ordinary children when a card needs no media.</Text>
      </Flex>
      <Flex gap="sm" justifyContent="end">
        <Button variant="secondary">Cancel</Button>
        <Button>Continue</Button>
      </Flex>
    </Card>
  );
}
