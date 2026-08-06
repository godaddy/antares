import { Button, CloseButton, Content, Drawer, DrawerTrigger, Heading, Text } from '@godaddy/antares';

/**
 * When the content is taller than the drawer, the `Content` region scrolls while the title row
 * stays pinned.
 * @title Scrollable content
 * @order 6
 */
export function ScrollableExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Terms">
        <Heading slot="title">Terms</Heading>
        <CloseButton />
        <Content>
          {Array.from({ length: 12 }, (_, i) => (
            <Text as="p" key={i}>
              She expressed her gratitude again, but as it was too painful a subject to each, to be dwelt on farther.
            </Text>
          ))}
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}
