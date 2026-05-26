import { Drawer, DrawerTrigger, Button, Flex, Text, type DrawerPlacement } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: DrawerPlacement;
  showCloseButton?: boolean;
  isDismissable?: boolean;
  animate?: boolean;
}

export function PlaygroundExample({
  placement = 'right',
  showCloseButton,
  isDismissable = true,
  animate
}: PlaygroundExampleProps) {
  return (
    <Flex padding="2xl" justifyContent="center">
      <DrawerTrigger>
        <Button variant="primary">Open drawer</Button>
        <Drawer
          placement={placement}
          showCloseButton={showCloseButton}
          isDismissable={isDismissable}
          animate={animate}
          title="Playground"
        >
          <Text>Drawer content!</Text>
        </Drawer>
      </DrawerTrigger>
    </Flex>
  );
}
