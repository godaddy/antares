import { useState } from 'react';
import { Drawer, DrawerHandle, Button, Flex, Text, type DrawerSnapPoint } from '@godaddy/antares';

const SNAP_POINTS = [148, 355];

export function ControlledSnapExample() {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<DrawerSnapPoint>(355);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open controlled snap
      </Button>
      <Text>Active snap: {snap}px</Text>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        snapPoints={SNAP_POINTS}
        activeSnapPoint={snap}
        onSnapPointChange={setSnap}
        snapLabels={['Collapsed', 'Expanded']}
        title="Controlled Snap"
      >
        <DrawerHandle />
        <Flex gap="md">
          <Button variant="primary" onPress={() => setSnap(148)}>
            Collapse
          </Button>
          <Button variant="primary" onPress={() => setSnap(355)}>
            Expand
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}
