import { Drawer, DrawerTrigger, Button, Flex, Text, type DrawerPlacement } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: DrawerPlacement;
  showCloseButton?: boolean;
  isDismissable?: boolean;
  maxSize?: number | string;
}

export function PlaygroundExample({
  placement = 'right',
  showCloseButton,
  isDismissable = true,
  maxSize
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <DrawerTrigger>
        <Button variant="primary">Open drawer</Button>
        <Drawer placement={placement} showCloseButton={showCloseButton} isDismissable={isDismissable} maxSize={maxSize}>
          <Text>Drawer content!</Text>
        </Drawer>
      </DrawerTrigger>
    </Flex>
  );
}
