import { Card, CardSelectionIndicator, RadioGroup } from '@godaddy/antares';

/**
 * Radio values are required; local selection state belongs to checkbox Cards.
 * @ignore
 */
export function TypesExample({
  missingRadioValue = false,
  invalidCheckboxProps = false
}: {
  missingRadioValue?: boolean;
  invalidCheckboxProps?: boolean;
}) {
  return (
    <>
      <Card selection="checkbox" isInvalid aria-label="Checkbox">
        <CardSelectionIndicator />
      </Card>
      <RadioGroup isInvalid aria-label="Radio choices">
        <Card selection="radio" value="one" aria-label="Radio">
          <CardSelectionIndicator />
        </Card>
        {/* @ts-expect-error - radio validation belongs on RadioGroup */}
        <Card selection="radio" value="two" isInvalid />
        {/* @ts-expect-error - radio cards require a value */}
        {missingRadioValue ? <Card selection="radio" aria-label="Missing value" /> : null}
      </RadioGroup>
      {/* @ts-expect-error - validation requires checkbox selection */}
      <Card isInvalid />
      {invalidCheckboxProps ? (
        <>
          {/* @ts-expect-error - radio field names belong on RadioGroup */}
          <Card selection="radio" value="one" name="choice" />
          {/* @ts-expect-error - radio selection belongs on RadioGroup */}
          <Card selection="radio" value="one" isSelected />
          {/* @ts-expect-error - radio defaults belong on RadioGroup */}
          <Card selection="radio" value="one" defaultSelected />
          {/* @ts-expect-error - radio change handlers belong on RadioGroup */}
          <Card selection="radio" value="one" onSelectionChange={() => undefined} />
          {/* @ts-expect-error - radio read-only state belongs on RadioGroup */}
          <Card selection="radio" value="one" isReadOnly />
          {/* @ts-expect-error - mixed state requires checkbox selection */}
          <Card selection="radio" value="one" isIndeterminate />
          {/* @ts-expect-error - radio required state belongs on RadioGroup */}
          <Card selection="radio" value="one" isRequired />
          {/* @ts-expect-error - field names require checkbox selection */}
          <Card name="choice" />
          {/* @ts-expect-error - controlled state requires checkbox selection */}
          <Card isSelected />
          {/* @ts-expect-error - initial state requires checkbox selection */}
          <Card defaultSelected />
          {/* @ts-expect-error - change handlers require checkbox selection */}
          <Card onSelectionChange={() => undefined} />
          {/* @ts-expect-error - read-only state requires checkbox selection */}
          <Card isReadOnly />
          {/* @ts-expect-error - mixed state requires checkbox selection */}
          <Card isIndeterminate />
          {/* @ts-expect-error - required state requires checkbox selection */}
          <Card isRequired />
          {/* @ts-expect-error - selection values require selection */}
          <Card value="one" />
          {/* @ts-expect-error - selection disabled state requires selection */}
          <Card isSelectionDisabled />
          {/* @ts-expect-error - selection labels require selection */}
          <Card selectionProps={{ 'aria-label': 'Select' }} />
        </>
      ) : null}
    </>
  );
}
