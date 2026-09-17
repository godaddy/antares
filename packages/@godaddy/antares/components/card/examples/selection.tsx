import { useState } from 'react';
import {
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  Content,
  CornerActions,
  Flex,
  RadioGroup,
  Text
} from '@godaddy/antares';

/**
 * Control a standalone checkbox, or let CheckboxGroup and RadioGroup own selection. Add href when
 * the body should navigate and only the corner indicator should select, naming the two controls
 * apart with selectionProps. Omit isSelected and onSelectionChange for uncontrolled standalone
 * selection, optionally setting defaultSelected.
 * @order 4
 */
export function SelectionExample() {
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
          <CardSelectionIndicator data-testid="card-selection-indicator" visibility="always" />
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
            <CardSelectionIndicator data-testid="combined-selection-indicator" visibility="always" />
          </CornerActions>
        </Card>
      </CheckboxGroup>

      <RadioGroup aria-label="Choose a plan" defaultValue="starter">
        {['starter', 'pro'].map(function plan(value) {
          return (
            <Card key={value} selection="radio" value={value} aria-label={`${value} plan`}>
              <Text>{value === 'starter' ? 'Starter plan' : 'Pro plan'}</Text>
              <CornerActions>
                <CardSelectionIndicator visibility="always" />
              </CornerActions>
            </Card>
          );
        })}
      </RadioGroup>
    </Flex>
  );
}
