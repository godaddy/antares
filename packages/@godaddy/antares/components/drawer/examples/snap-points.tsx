import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Text } from '@godaddy/antares';

export function SnapPointsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open snap sheet
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={[148, 355]}
        defaultActiveSnapPoint={148}
        snapLabels={['Collapsed', 'Expanded']}
        title="Snap Sheet"
      >
        <DrawerHandle />
        <Text>Drag the handle or use keyboard to resize.</Text>
      </Drawer>
    </>
  );
}
