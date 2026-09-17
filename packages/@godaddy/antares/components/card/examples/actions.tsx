import { useState } from 'react';
import { Button, Card, CornerActions, Heading, Icon, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Use onPress for an action. Nested buttons keep their own hits; the rest of the surface activates
 * the Card.
 * @title Actions
 * @order 6
 */
export function ActionsExample() {
  const [count, setCount] = useState(0);

  return (
    <Card aria-label="Open details" onPress={() => setCount((value) => value + 1)}>
      <CornerActions>
        <Button aria-label="More options">
          <Icon icon="ellipsis" />
        </Button>
      </CornerActions>

      <TextLockup>
        <Tag slot="eyebrow">Action</Tag>
        <Heading slot="title">Open details with onPress</Heading>
        <Text slot="body">The rest of the surface activates the Card.</Text>
      </TextLockup>
      <Button onPress={() => setCount((value) => value + 10)}>Independent action ({count})</Button>
    </Card>
  );
}
