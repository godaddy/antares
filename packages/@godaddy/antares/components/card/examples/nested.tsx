import { Card, CardGroup, Text } from '@godaddy/antares';

/**
 * A Card nested in a CardGroup row renders as a static Card, not another row.
 * @ignore
 */
export function NestedExample() {
  return (
    <CardGroup aria-label="Outer group" selectionMode="multiple">
      <Card id="outer" textValue="Outer card">
        <Text>Outer copy</Text>
        <Card aria-label="Inner card">
          <Text>Inner copy</Text>
        </Card>
      </Card>
    </CardGroup>
  );
}
