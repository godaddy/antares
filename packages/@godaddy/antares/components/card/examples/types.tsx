import { Card, CardSelectionIndicator, RadioGroup } from '@godaddy/antares';

/**
 * Radio values are required; validation belongs to checkbox Cards or RadioGroup.
 * @ignore
 */
export function TypesExample({ missingRadioValue = false }: { missingRadioValue?: boolean }) {
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
    </>
  );
}
