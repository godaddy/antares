import { Card, Content, CardSelectionIndicator, Checkbox, CornerActions, Text } from '@godaddy/antares';

/** A selectable Card whose primary navigation and selection remain separate controls. */
export function CombinedExample() {
  return (
    <Checkbox as={Card} href="/details" value="details" aria-label="Select details">
      <Content>
        <Text slot="description">Open details</Text>
      </Content>
      <CornerActions>
        <CardSelectionIndicator data-testid="combined-selection-indicator" visibility="always" />
      </CornerActions>
    </Checkbox>
  );
}
