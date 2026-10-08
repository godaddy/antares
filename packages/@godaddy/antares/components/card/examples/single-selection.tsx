import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Header,
  Heading,
  Tag,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * `selectionMode="single"` allows one selected Card, and `disallowEmptySelection` keeps the plan
 * picker from becoming empty. Arrow keys move between Cards, and Space selects the focused one.
 * @title Single selection
 * @order 8
 */
export function SingleSelectionExample() {
  return (
    <CardGroup
      aria-label="Choose a plan"
      selectionMode="single"
      disallowEmptySelection
      defaultSelectedKeys={['starter']}
    >
      <Card id="starter" textValue="Starter plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="success">
            Popular
          </Tag>
          <Header>
            <CornerActions>
              <CardSelectionIndicator data-testid="starter-indicator" />
            </CornerActions>
            <Heading slot="title">Starter plan</Heading>
          </Header>
          <Text slot="body">For getting started with a single project.</Text>
        </TextLockup>
      </Card>
      <Card id="pro" textValue="Pro plan">
        <TextLockup>
          <Tag slot="eyebrow" emphasis="premium">
            Upgrade
          </Tag>
          <Header>
            <CornerActions>
              <CardSelectionIndicator data-testid="pro-indicator" />
            </CornerActions>
            <Heading slot="title">Pro plan</Heading>
          </Header>
          <Text slot="body">For teams that need more room to grow.</Text>
        </TextLockup>
      </Card>
    </CardGroup>
  );
}
