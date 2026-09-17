import { Card, CardSelectionIndicator, CornerActions, RadioGroup, Text } from '@godaddy/antares';

/**
 * Radio Cards require a value and live in RadioGroup, which owns selection and arrow-key movement.
 * @title Radio
 * @order 5
 */
export function RadioExample() {
  return (
    <RadioGroup aria-label="Choose a plan" defaultValue="starter">
      <Card selection="radio" value="starter" aria-label="Starter plan">
        <Text>Starter plan</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-starter-indicator" />
        </CornerActions>
      </Card>
      <Card selection="radio" value="pro" aria-label="Pro plan">
        <Text>Pro plan</Text>
        <CornerActions>
          <CardSelectionIndicator data-testid="radio-pro-indicator" />
        </CornerActions>
      </Card>
    </RadioGroup>
  );
}
