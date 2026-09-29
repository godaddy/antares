import { Card, CardSelectionIndicator, RadioGroup, Text } from '@godaddy/antares';

/**
 * Validation and mixed state belong to groups; Card classes are strings; selection wins over a
 * primary action.
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
      <Card selection="checkbox" href="#ignored" aria-label="Selection over link">
        <Text>Selection wins over a link.</Text>
      </Card>
      {invalidProps ? (
        <>
          {/* @ts-expect-error - validation belongs on CheckboxGroup */}
          <Card selection="checkbox" isInvalid />
          {/* @ts-expect-error - required state belongs on CheckboxGroup */}
          <Card selection="checkbox" isRequired />
          {/* @ts-expect-error - Cards have no mixed state */}
          <Card selection="checkbox" isIndeterminate />
          {/* @ts-expect-error - radio validation belongs on RadioGroup */}
          <Card selection="radio" value="one" isInvalid />
          {/* @ts-expect-error - Card classes are strings; style selection with data attributes */}
          <Card className={() => 'selected'} />
        </>
      ) : null}
    </>
  );
}
