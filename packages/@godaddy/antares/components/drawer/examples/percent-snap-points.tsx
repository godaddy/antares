import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Text } from '@godaddy/antares';

export function PercentSnapPointsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open percent snap
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={['30%', '60%']}
        defaultActiveSnapPoint="30%"
        snapLabels={['Collapsed', 'Expanded']}
        title="Percent Snap"
      >
        <DrawerHandle />
        <Text>Snap points use percentage of drawer size.</Text>
      </Drawer>
    </>
  );
}
