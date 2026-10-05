import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Heading,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * `selectionMode="single"` keeps one Card selected at a time. Arrow keys move between Cards, and
 * Space selects the focused one.
 * @title Single selection
 * @order 8
 */
export function SingleSelectionExample() {
  return (
    <CardGroup aria-label="Choose a plan" selectionMode="single" defaultSelectedKeys={['starter']}>
      <Card id="starter" textValue="Starter plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="success">
            Popular
          </Tag>
          <Heading slot="title" level={3}>
            Starter plan
          </Heading>
          <Text slot="body">For getting started with a single project.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="starter-indicator" />
        </CornerActions>
      </Card>
      <Card id="pro" textValue="Pro plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="premium">
            Upgrade
          </Tag>
          <Heading slot="title" level={3}>
            Pro plan
          </Heading>
          <Text slot="body">For teams that need more room to grow.</Text>
        </TextLockup>
        <CornerActions>
          <CardSelectionIndicator data-testid="pro-indicator" />
        </CornerActions>
      </Card>
    </CardGroup>
  );
}
