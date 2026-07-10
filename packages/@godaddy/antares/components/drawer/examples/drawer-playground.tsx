import { Drawer, DrawerTrigger, Button, Flex, Text, Box, type DrawerPlacement } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  placement?: DrawerPlacement;
  showCloseButton?: boolean;
  isDismissable?: boolean;
  animate?: boolean;
  maxSize?: number | string;
  minSize?: number | string;
}

export function PlaygroundExample({
  placement = 'right',
  showCloseButton,
  isDismissable = true,
  animate,
  maxSize,
  minSize
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
          maxSize={maxSize}
          minSize={minSize}
          aria-label="Drawer"
        >
          <Box padding="md">
            <Text>Drawer content!</Text>
          </Box>
        </Drawer>
      </DrawerTrigger>
    </Flex>
  );
}
