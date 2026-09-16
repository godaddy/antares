import { Button, Card, Flex, Grid, Heading, Text } from '@godaddy/antares';

/** A consumer-owned equal-height collection aligns bottom actions across cards. */
export function CollectionExample() {
  return (
    <Grid columns="repeat(3, minmax(0, 1fr))" gap="md" alignItems="stretch">
      {[
        'Short description',
        'A medium description gives this card more content.',
        'A longer description demonstrates that each card can grow while its action stays aligned.'
      ].map(function renderCard(description, index) {
        return (
          <Card key={description} gap="md" data-testid={`collection-card-${index}`}>
            <Flex direction="column" gap="sm" flexGrow={1}>
              <Heading level={3}>Card {index + 1}</Heading>
              <Text>{description}</Text>
            </Flex>
            <Button data-testid={`collection-action-${index}`}>View details</Button>
          </Card>
        );
      })}
    </Grid>
  );
}
