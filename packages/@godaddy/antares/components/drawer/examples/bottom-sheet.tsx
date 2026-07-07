import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable showCloseButton>
        <Box elevation="card">
          <Text>Bottom sheet content with close button.</Text>
        </Box>
      </Drawer>
    </>
  );
}
