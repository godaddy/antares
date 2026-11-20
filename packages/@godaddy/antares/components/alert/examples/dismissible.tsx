import { useState } from 'react';
import { Alert, Icon, Button, CloseButton, Content, Heading, Text } from '@godaddy/antares';

/**
 * Compose CloseButton and control visibility in the parent. Set its accessible label directly.
 * @order 3
 */
export function DismissibleExample({ closeLabel = 'Close' }: { closeLabel?: string } = {}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success">
      <Icon slot="indicator" icon="checkmark" />
      <Content>
        <Heading slot="title">Your account's been verified</Heading>
        <Text>We've successfully verified your identity.</Text>
      </Content>
      <CloseButton aria-label={closeLabel} onPress={() => setVisible(false)} />
    </Alert>
  );
}
