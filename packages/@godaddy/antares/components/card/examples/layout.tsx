import {
  Box,
  Button,
  Card,
  Content,
  CornerActions,
  Flex,
  Footer,
  Grid,
  Header,
  Heading,
  Image,
  Text,
  TextLockup
} from '@godaddy/antares';
import styles from './layout.module.css';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

/**
 * Own responsiveness with a container query. In a collection, let Content grow so footer actions
 * align, and wrap long titles beside CornerActions.
 * @title Layout
 * @order 6
 */
export function LayoutExample() {
  return (
    <Flex direction="column" gap="xl">
      <Box className={styles.container} data-testid="container-query-container">
        <Card direction="column" gap="lg" className={styles.card} data-testid="container-query-card">
          <Image
            slot="media"
            src={image}
            alt="Blue abstract landscape"
            width="320"
            height="240"
            data-testid="container-query-media"
          />
          <Flex direction="column" gap="sm" flexGrow={1} data-testid="container-query-content">
            <Heading level={3}>Container-owned responsiveness</Heading>
            <Text>The surrounding container decides when this composition stacks or becomes horizontal.</Text>
          </Flex>
        </Card>
      </Box>

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
    </Flex>
  );
}
