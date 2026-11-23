import { Alert, Icon, ButtonGroup, Content, Flex, Heading, LinkButton, Text } from '@godaddy/antares';

/**
 * Omit unused regions, use rich content, or choose a different glyph directly on Icon.
 * @order 5
 */
export function CompositionExample() {
  return (
    <Flex direction="column" gap="md">
      <Alert aria-label="Message only">
        <Content>
          <Text>Your preferences have been saved.</Text>
        </Content>
      </Alert>
      <Alert aria-label="Title only">
        <Icon slot="indicator" icon="information" />
        <Content>
          <Heading slot="title">Your domain is ready</Heading>
        </Content>
      </Alert>
      <Alert emphasis="warning" aria-label="Documentation notice">
        <Icon slot="indicator" icon="star" />
        <Content>
          <Text>Your payment method needs attention.</Text>
          <Text>
            Visit <strong>Billing</strong> to review your options.
          </Text>
        </Content>
        <ButtonGroup>
          <LinkButton href="#billing" variant="secondary" size="sm">
            Learn more
          </LinkButton>
        </ButtonGroup>
      </Alert>
    </Flex>
  );
}
