import { memo, useState } from 'react';
import { Alert, Button, ButtonGroup, CloseButton, Content, Flex, Heading, Icon, Text } from '@godaddy/antares';

interface CustomRegionsExampleProps {
  /** Initially include the close control. */
  initiallyDismissible?: boolean;

  /** Include the emphasis icon. */
  showIcon?: boolean;

  /** Container content width for responsive comparisons. */
  width?: number;
}

const PaymentActions = memo(function PaymentActions() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Update payment
      </Button>
    </ButtonGroup>
  );
});

function PaymentDismiss({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return visible ? <CloseButton aria-label="Dismiss payment warning" onPress={onDismiss} /> : null;
}

function PaymentRegions({
  showIcon,
  dismissible,
  onDismiss
}: {
  showIcon: boolean;
  dismissible: boolean;
  onDismiss: () => void;
}) {
  return (
    <>
      {showIcon && <Icon slot="indicator" icon="alert" />}
      <Content>
        <Heading slot="title">Payment method expiring</Heading>
        <Text>Update your payment method to keep your domain and services running.</Text>
      </Content>
      <PaymentActions />
      <PaymentDismiss visible={dismissible} onDismiss={onDismiss} />
    </>
  );
}

/**
 * Extract regions into ordinary components, including fragments and conditional controls.
 * Toggle the close control to see the content column use the available space.
 * @order 7
 */
export function CustomRegionsExample({
  initiallyDismissible = true,
  showIcon = true,
  width
}: CustomRegionsExampleProps = {}) {
  const [visible, setVisible] = useState(true);
  const [dismissible, setDismissible] = useState(initiallyDismissible);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show warning</Button>;

  return (
    <Flex direction="column" gap="md">
      <Alert
        emphasis="warning"
        style={{ width, maxWidth: width === undefined ? undefined : 'none', boxSizing: 'content-box' }}
      >
        <PaymentRegions showIcon={showIcon} dismissible={dismissible} onDismiss={() => setVisible(false)} />
      </Alert>
      <Button style={{ alignSelf: 'start' }} onPress={() => setDismissible((value) => !value)}>
        Toggle close control
      </Button>
    </Flex>
  );
}
