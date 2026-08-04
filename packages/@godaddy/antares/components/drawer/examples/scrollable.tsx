import { Button, CloseButton, Content, Drawer, DrawerTrigger, Header, Heading, Text } from '@godaddy/antares';

const PARAGRAPH =
  'She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.';

/**
 * When the content is taller than the drawer, the `Content` region scrolls while the `Header`
 * stays pinned.
 * @title Scrollable content
 * @order 6
 */
export function ScrollableExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Terms">
        <Header>
          <Heading slot="title">Terms</Heading>
          <CloseButton />
        </Header>
        <Content>
          {Array.from({ length: 12 }, (_, i) => (
            <Text as="p" key={i}>
              {PARAGRAPH}
            </Text>
          ))}
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}
