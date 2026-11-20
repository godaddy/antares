import { Alert, Icon, Button, ButtonGroup, Content, Heading, Text } from '@godaddy/antares';

/**
 * Compose ButtonGroup as the actions region. Button variants and sizes stay explicit and overridable.
 * @order 4
 */
export function WithActionExample({ onAction }: { onAction?: () => void } = {}) {
  return (
    <Alert emphasis="warning">
      <Icon slot="indicator" icon="alert" />
      <Content>
        <Heading slot="title">Your payment method is expiring</Heading>
        <Text>Please update your payment method before it expires.</Text>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" size="sm" onPress={onAction}>
          Update Payment Method
        </Button>
      </ButtonGroup>
    </Alert>
  );
}
