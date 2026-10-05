import { Card, CardGroup, CardSelectionIndicator, Text } from '@godaddy/antares';

/**
 * Selection and actions belong to CardGroup, and Card classes are strings.
 * @ignore
 */
export function TypesExample({ invalidProps = false }: { invalidProps?: boolean }) {
  return (
    <>
      <CardGroup aria-label="Typed group" selectionMode="single">
        <Card id="one" textValue="One">
          <CardSelectionIndicator />
        </Card>
      </CardGroup>
      <Card href="#typed-link">
        <Text>A standalone link Card.</Text>
      </Card>
      {invalidProps ? (
        <>
          {/* @ts-expect-error - selection belongs on CardGroup */}
          <Card selection="checkbox" />
          {/* @ts-expect-error - actions run through onAction inside a CardGroup */}
          <Card onPress={() => undefined} />
          {/* @ts-expect-error - Card classes are strings; style selection with data attributes */}
          <Card className={() => 'selected'} />
        </>
      ) : null}
    </>
  );
}
