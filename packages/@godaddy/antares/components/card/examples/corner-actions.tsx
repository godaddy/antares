import { Button, ButtonGroup, Card, CornerActions, Heading, Icon, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Direct CornerActions sit at the top-end of the Card.
 * @title Corner actions
 * @order 3
 */
export function CornerActionsExample() {
  return (
    <Card>
      <CornerActions>
        <Button aria-label="Favorite">
          <Icon icon="star" />
        </Button>
        <Button aria-label="More options">
          <Icon icon="ellipsis" />
        </Button>
      </CornerActions>

      <TextLockup>
        <Tag slot="eyebrow" emphasis="info">
          New
        </Tag>
        <Heading slot="title">A composed card</Heading>
        <Text slot="body">Cards provide a surface while consumers own the interior layout.</Text>
      </TextLockup>

      <ButtonGroup>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    </Card>
  );
}
