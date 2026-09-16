import { useState } from 'react';
import { Button, Card, Content, Flex, Text } from '@godaddy/antares';

/**
 * Use onPress for an action or href for navigation. Body text stays copyable and inner buttons act independently.
 * @title Actions and navigation
 * @order 3
 */
export function ActionsExample() {
  const [count, setCount] = useState(0);

  return (
    <Flex direction="column" gap="lg">
      <Card aria-label="Open details" onPress={() => setCount((value) => value + 1)}>
        <Text>Open details</Text>
        <Button onPress={() => setCount((value) => value + 10)}>Independent action ({count})</Button>
      </Card>
      <Card href="/about" aria-label="About this product">
        <Content>
          <Text>About this product</Text>
          <Button>Save</Button>
        </Content>
      </Card>
    </Flex>
  );
}
