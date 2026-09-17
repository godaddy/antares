import {
  Box,
  Button,
  Card,
  CornerActions,
  Flex,
  Footer,
  Grid,
  Heading,
  Icon,
  Image,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 240%22%3E%3Crect width=%22320%22 height=%22240%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%22220%22 cy=%2270%22 r=%2250%22 fill=%22%234ecdc4%22/%3E%3C/svg%3E';

/**
 * Use Grid for responsiveness.
 * @title Layout
 * @order 9
 */
export function LayoutExample() {
  return (
    <Flex direction="column" gap="xl">
      <Box style={{ maxWidth: '48rem', width: '100%' }}>
        <Card>
          <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="center">
            <Image
              src={image}
              alt="Blue abstract landscape"
              data-testid="container-query-media"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <TextLockup data-testid="container-query-content">
              <Tag slot="eyebrow">Responsive</Tag>
              <Heading slot="title">Grid-owned responsiveness</Heading>
              <Text slot="body">Auto-fit columns decide when this composition stacks or becomes horizontal.</Text>
            </TextLockup>
          </Grid>
        </Card>
      </Box>

      <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="md" alignItems="start">
        {[
          ['Card 1', 'Short description'],
          ['Card 2', 'A medium description gives this card more content.'],
          [
            'A longer title that wraps across lines',
            'A longer description demonstrates that each card can grow while its action stays aligned.'
          ]
        ].map(function renderCard([title, body], index) {
          return (
            <Card key={title} gap="md" data-testid={`collection-card-${index}`}>
              <CornerActions>
                <Button aria-label="More options">
                  <Icon icon="ellipsis" />
                </Button>
              </CornerActions>

              <TextLockup>
                <Tag slot="eyebrow">Recommended</Tag>
                <Heading slot="title">{title}</Heading>
                <Text slot="body">{body}</Text>
              </TextLockup>

              <Footer justifyContent="end">
                <Button variant="primary">View details</Button>
              </Footer>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
}
