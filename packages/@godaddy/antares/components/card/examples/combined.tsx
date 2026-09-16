import { Card, CardContent, CardSelectionIndicator, Checkbox, CornerActions, Text } from '@godaddy/antares';

/** A selectable Card whose linked content and selection remain separate controls. */
export function CombinedExample() {
  return (
    <Checkbox as={Card} href="/details" value="details" aria-label="Select details">
      <CardContent>
        <Text slot="description">Open details</Text>
      </CardContent>
      <CornerActions>
        <CardSelectionIndicator data-testid="combined-selection-indicator" visibility="always" />
      </CornerActions>
    </Checkbox>
  );
}
