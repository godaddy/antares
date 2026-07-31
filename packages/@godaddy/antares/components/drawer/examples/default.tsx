import { Drawer, DrawerTrigger, Button, Text, Box } from '@godaddy/antares';

/**
 * Use `<DrawerTrigger>` to wrap a trigger button and a `<Drawer>`. The drawer opens when the trigger is pressed.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Drawer">
        <Box padding="md">
          <Text>Drawer content goes here.</Text>
        </Box>
      </Drawer>
    </DrawerTrigger>
  );
}
