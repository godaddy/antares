import {
  Button,
  Card,
  Content,
  CornerActions,
  Footer,
  Grid,
  Header,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Let Content grow to align bottom actions across equal-height cards. A wrapping Header reserves
 * room for always-visible CornerActions, while TextLockup coordinates each card's text.
 * @title Collections
 * @order 6
 */
export function CollectionExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="stretch">
      {[
        'Short description',
        'A medium description gives this card more content.',
        'A longer description demonstrates that each card can grow while its action stays aligned.'
      ].map(function renderCard(description, index) {
        return (
          <Card key={description} gap="md" data-testid={`collection-card-${index}`}>
            <Header alignItems="start" wrap="wrap">
              <Heading level={3} style={{ minWidth: 0, flex: '1 1 10rem' }}>
                {index === 2 ? 'A longer title that wraps beside the corner action' : `Card ${index + 1}`}
              </Heading>
              <CornerActions>
                <Button variant="minimal" aria-label={`More options for card ${index + 1}`}>
                  ...
                </Button>
              </CornerActions>
            </Header>
            <Content flexGrow={1}>
              <TextLockup>
                <Text slot="eyebrow">Recommended</Text>
                <Text slot="body">{description}</Text>
              </TextLockup>
            </Content>
            <Footer justifyContent="end">
              <Button data-testid={`collection-action-${index}`}>View details</Button>
            </Footer>
          </Card>
        );
      })}
    </Grid>
  );
}
