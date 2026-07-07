import { Drawer, DrawerTrigger, Button, Text, Box } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" isDismissable aria-label="Drawer">
        <Box padding="md" style={{ background: '#eef2ff', minBlockSize: '100%' }}>
          <Text>Drawer content goes here.</Text>
        </Box>
      </Drawer>
    </DrawerTrigger>
  );
}
