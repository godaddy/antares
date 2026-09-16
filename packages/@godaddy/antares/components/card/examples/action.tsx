import { useState } from 'react';
import { Button, Card, Text } from '@godaddy/antares';

/** A Card with a primary action and an independent child action. */
export function ActionExample() {
  const [count, setCount] = useState(0);
  return (
    <Card aria-label="Open details" onPress={() => setCount((value) => value + 1)}>
      <Text>Open details</Text>
      <Button onPress={() => setCount((value) => value + 10)}>Independent action ({count})</Button>
    </Card>
  );
}
