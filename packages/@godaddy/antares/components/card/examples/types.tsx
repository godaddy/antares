import { Card, CardSelectionIndicator, RadioGroup } from '@godaddy/antares';

/**
 * Radio values are required; local selection state belongs to standalone checkbox Cards;
 * validation belongs to groups; selection Cards have no primary action.
 * @ignore
 */
export function TypesExample({ invalidProps = false }: { invalidProps?: boolean }) {
  return (
    <>
      <Card selection="checkbox" aria-label="Checkbox">
        <CardSelectionIndicator />
      </Card>
      <RadioGroup isInvalid aria-label="Radio choices">
        <Card selection="radio" value="one" aria-label="Radio">
          <CardSelectionIndicator />
        </Card>
      </RadioGroup>
      {invalidProps ? (
        <>
          {/* @ts-expect-error - radio cards require a value */}
          <Card selection="radio" aria-label="Missing value" />
          {/* @ts-expect-error - validation belongs on CheckboxGroup */}
          <Card selection="checkbox" isInvalid />
          {/* @ts-expect-error - required state belongs on CheckboxGroup */}
          <Card selection="checkbox" isRequired />
          {/* @ts-expect-error - Cards have no mixed state */}
          <Card selection="checkbox" isIndeterminate />
          {/* @ts-expect-error - radio validation belongs on RadioGroup */}
          <Card selection="radio" value="one" isInvalid />
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
          {/* @ts-expect-error - selection values require selection */}
          <Card value="one" />
          {/* @ts-expect-error - selection cards have no primary action */}
          <Card selection="checkbox" onPress={() => undefined} />
          {/* @ts-expect-error - selection cards have no primary link */}
          <Card selection="radio" value="one" href="/" />
          {/* @ts-expect-error - Card classes are strings; style selection with data attributes */}
          <Card className={() => 'selected'} />
        </>
      ) : null}
    </>
  );
}
