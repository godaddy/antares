import { Button, Card, CornerActions, Flex, Heading, Text } from '@godaddy/antares';

/** Reserve explicit room for always-visible CornerActions beside long card text. */
export function LongTextExample() {
  return (
    <Card>
      <Flex direction="column" gap="md" style={{ minWidth: 0 }}>
        <Flex direction="row" gap="md" alignItems="start" justifyContent="space-between" wrap="wrap">
          <Heading level={3} style={{ minWidth: 0, flex: '1 1 12rem' }}>
            A long title wraps without colliding with the corner actions
          </Heading>
          <CornerActions>
            <Button variant="minimal" aria-label="More options">
              ...
            </Button>
          </CornerActions>
        </Flex>
        <Text>
          Keep corner controls in an explicit layout region so text remains readable at narrow widths. The Card does not
          measure or reorder arbitrary children for you.
        </Text>
      </Flex>
    </Card>
  );
}
