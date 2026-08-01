import { Flex, Header, Content, Footer, ButtonGroup, Text, Button } from '@godaddy/antares';

/**
 * The shared structural containers composed together into a card-like layout. Each is a
 * plain semantic region here; inside a parent that provides their contexts (e.g. `Modal`)
 * they adopt that parent's spacing automatically.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Flex
      direction="column"
      gap="md"
      padding="md"
      style={{ border: '1px solid var(--ux-gray-300, #ccc)', borderRadius: 8 }}
    >
      <Header>
        <Text>Delete file?</Text>
        <Button variant="secondary">Close</Button>
      </Header>
      <Content>
        <Text>This action cannot be undone.</Text>
      </Content>
      <Footer>
        <ButtonGroup flexGrow={1}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="critical">Delete</Button>
        </ButtonGroup>
      </Footer>
    </Flex>
  );
}
