import { useState } from 'react';
import { Button, Card, Content, CornerActions, Flex, Text } from '@godaddy/antares';

/**
 * Use onPress for an action or href for navigation. Nested buttons keep their own hits; the rest of
 * the surface activates the Card.
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
        <CornerActions>
          <Button onPress={() => setCount((value) => value + 100)}>Corner action</Button>
        </CornerActions>
      </Card>
      <Card href="/about" aria-label="About this product">
        <Content>
          <Text>About this product</Text>
          <Button>Save</Button>
        </Content>
        <CornerActions>
          <Button>Share</Button>
        </CornerActions>
      </Card>
    </Flex>
  );
}
