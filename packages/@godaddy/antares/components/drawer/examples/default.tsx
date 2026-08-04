import { Button, Content, Drawer, DrawerTrigger, Text } from '@godaddy/antares';

/**
 * Use `<DrawerTrigger>` to wrap a trigger button and a `<Drawer>`. The drawer opens when the trigger is pressed.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Drawer">
        <Content>
          <Text>Drawer content goes here.</Text>
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}
