import { Alert, Icon, Content, Heading, Text, type AlertProps } from '@godaddy/antares';

/**
 * Compose the title and body in Content, and choose the icon explicitly.
 * @order 1
 */
export function DefaultExample(props: Partial<AlertProps> = {}) {
  return (
    <Alert emphasis="info" {...props}>
      <Icon slot="indicator" icon="information" />
      <Content>
        <Heading slot="title">Your domain is ready</Heading>
        <Text>You can now start building your website.</Text>
      </Content>
    </Alert>
  );
}
