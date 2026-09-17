import { useState } from 'react';
import { Card, Text } from '@godaddy/antares';

/**
 * Nested Cards keep their own primary. A press on inner content must not activate the outer Card.
 * @ignore
 */
export function NestedExample() {
  const [outer, setOuter] = useState(0);
  const [inner, setInner] = useState(0);

  return (
    <>
      <Card aria-label="Outer card" onPress={() => setOuter((count) => count + 1)}>
        <Text>Outer copy</Text>
        <Card aria-label="Inner card" onPress={() => setInner((count) => count + 1)}>
          <Text>Inner copy</Text>
        </Card>
      </Card>
      <Text>Outer activations: {outer}</Text>
      <Text>Inner activations: {inner}</Text>
    </>
  );
}
