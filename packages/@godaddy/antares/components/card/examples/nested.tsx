import { useState } from 'react';
import { Card, CardSelectionIndicator, Text } from '@godaddy/antares';

/**
 * Nested Cards keep their own primary. A press on inner content must not activate the outer Card.
 * @ignore
 */
export function NestedExample({
  selection,
  showOuterIndicator = true
}: {
  selection?: 'checkbox';
  showOuterIndicator?: boolean;
}) {
  const [outer, setOuter] = useState(0);
  const [inner, setInner] = useState(0);
  const outerProps = selection ? { selection } : { onPress: () => setOuter((count) => count + 1) };
  const innerProps = selection ? { selection } : { onPress: () => setInner((count) => count + 1) };

  return (
    <>
      <Card aria-label="Outer card" {...outerProps}>
        <Text>Outer copy</Text>
        <Card aria-label="Inner card" {...innerProps}>
          <Text>Inner copy</Text>
          {selection && <CardSelectionIndicator />}
        </Card>
        {selection && showOuterIndicator && <CardSelectionIndicator />}
      </Card>
      <Text>Outer activations: {outer}</Text>
      <Text>Inner activations: {inner}</Text>
    </>
  );
}
