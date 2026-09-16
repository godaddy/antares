import { Card, CardSelectionIndicator, Checkbox, CornerActions } from '@godaddy/antares';

/** A Checkbox composed as a Card with an explicitly placed CardSelectionIndicator. */
export function SelectionExample() {
  return (
    <Checkbox as={Card} aria-label="Select this card">
      Selectable card content
      <CornerActions>
        <CardSelectionIndicator data-testid="card-selection-indicator" visibility="always" />
      </CornerActions>
    </Checkbox>
  );
}
