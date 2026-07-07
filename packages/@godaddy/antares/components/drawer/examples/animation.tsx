import { Drawer, DrawerTrigger, Button, Flex, Text, Box } from '@godaddy/antares';

export function AnimationExample() {
  return (
    <Flex gap="md" wrap="wrap">
      <DrawerTrigger>
        <Button variant="primary">Animated (default)</Button>
        <Drawer placement="right" isDismissable aria-label="Animated drawer">
          <Box padding="md" style={{ background: '#eef2ff', minBlockSize: '100%' }}>
            <Text>Slides in and out.</Text>
          </Box>
        </Drawer>
      </DrawerTrigger>

      <DrawerTrigger>
        <Button variant="secondary">No animation</Button>
        <Drawer placement="right" isDismissable animate={false} aria-label="Instant drawer">
          <Box padding="md" style={{ background: '#ecfdf5', minBlockSize: '100%' }}>
            <Text>Appears instantly (animate=false).</Text>
          </Box>
        </Drawer>
      </DrawerTrigger>
    </Flex>
  );
}
