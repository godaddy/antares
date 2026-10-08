import { Button, ButtonGroup, Card, CornerActions, Header, Heading, Icon, Text, TextLockup } from '@godaddy/antares';

/**
 * A text card with corner actions.
 * @title Corner actions
 * @order 3
 */
export function CornerActionsExample({ dir }: { dir?: 'ltr' | 'rtl' } = {}) {
  return (
    <Card dir={dir} style={{ maxWidth: '24rem' }}>
      <TextLockup>
        <Header>
          <CornerActions>
            <Button aria-label="Favorite">
              <Icon icon="star" />
            </Button>
            <Button aria-label="More options">
              <Icon icon="ellipsis" />
            </Button>
          </CornerActions>
          <Heading slot="title">
            A longer card title that wraps around its corner actions and uses the full width below them
          </Heading>
        </Header>
        <Text slot="body">Cards provide a surface while consumers own the interior layout.</Text>
      </TextLockup>

      <ButtonGroup>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    </Card>
  );
}
