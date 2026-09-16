import { useState } from 'react';
import { Flex, Link, Text } from '@godaddy/antares';

/**
 * Link keeps native keyboard activation while allowing an application to observe the press.
 * @order 2
 */
export function InteractionExample() {
  const [message, setMessage] = useState('Not activated');

  function handlePress() {
    setMessage('Activated');
  }

  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <Link href="#activated" onPress={handlePress}>
        Activate link
      </Link>
      <Text>{message}</Text>
    </Flex>
  );
}
