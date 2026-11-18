import { Button, CloseButton, Content, Drawer, DrawerTrigger, Heading, Text } from '@godaddy/antares';

/**
 * Put a `DrawerTrigger` inside a drawer to drill deeper into a flow. The new drawer stacks on top
 * and the one beneath recedes; closing or swiping away the top drawer returns to the one below.
 * @title Nested Drawers
 * @order 4
 */
export function NestedExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open settings</Button>
      <Drawer placement="bottom">
        <Heading slot="title">Settings</Heading>
        <CloseButton />
        <Content>
          <Text>Choose a section to edit.</Text>
          <DrawerTrigger>
            <Button variant="secondary">Account</Button>
            <Drawer placement="bottom">
              <Heading slot="title">Account</Heading>
              <CloseButton />
              <Content>
                <Text>Update your name, email, and password.</Text>
              </Content>
            </Drawer>
          </DrawerTrigger>
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}
