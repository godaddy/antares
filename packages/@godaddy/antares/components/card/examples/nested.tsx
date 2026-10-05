import { Card, CardGroup, CardSelectionIndicator, Text } from '@godaddy/antares';

/**
 * A Card nested in a CardGroup row renders as a static Card, not another row, and does not share
 * the row's selection.
 * @ignore
 */
export function NestedExample() {
  return (
    <CardGroup aria-label="Outer group" selectionMode="multiple" defaultSelectedKeys={['outer']}>
      <Card id="outer" textValue="Outer card">
        <Text>Outer copy</Text>
        <CardSelectionIndicator data-testid="outer-indicator" />
        <Card aria-label="Inner card">
          <Text>Inner copy</Text>
          <CardSelectionIndicator data-testid="inner-indicator" />
        </Card>
      </Card>
    </CardGroup>
  );
}
