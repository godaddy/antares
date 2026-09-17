import { useState } from 'react';
import { Card, CardSelectionIndicator, CheckboxGroup, Content, CornerActions, Flex, Text } from '@godaddy/antares';

/**
 * Standalone checkbox Cards own their state. Grouped cards belong in CheckboxGroup. Pair href with
 * selectionProps when the body navigates and the indicator selects.
 * @title Checkbox
 * @order 4
 */
export function CheckboxExample() {
  const [selected, setSelected] = useState(false);
  const [changes, setChanges] = useState(0);

  function changeSelection(nextSelected: boolean) {
    setSelected(nextSelected);
    setChanges((count) => count + 1);
  }

  return (
    <Flex direction="column" gap="lg">
      <Card
        selection="checkbox"
        aria-label="Select this card"
        isSelected={selected}
        onSelectionChange={changeSelection}
      >
        <Text>Selectable card content</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="card-selection-indicator" />
        </CornerActions>
      </Card>
      <Text>Selection changes: {changes}</Text>

      <CheckboxGroup aria-label="Select pages">
        <Card selection="checkbox" value="overview" aria-label="Select overview">
          <Text>Overview</Text>
          <CornerActions>
            <CardSelectionIndicator />
          </CornerActions>
        </Card>
        <Card
          selection="checkbox"
          href="/details"
          value="details"
          aria-label="Open details"
          selectionProps={{ 'aria-label': 'Select details' }}
        >
          <Content>
            <Text slot="description">Open details</Text>
          </Content>
          <CornerActions>
            <CardSelectionIndicator data-testid="combined-selection-indicator" />
          </CornerActions>
        </Card>
      </CheckboxGroup>
    </Flex>
  );
}
