import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

export function BottomSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open bottom sheet
      </Button>
      <Drawer
        placement="bottom"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        showCloseButton
        aria-label="Bottom sheet"
      >
        <Box elevation="card" padding="md" style={{ background: '#fef3c7' }}>
          <Text as="p">Bottom sheet with close button.</Text>
          <Text as="p">This is the content</Text>
        </Box>
      </Drawer>
    </>
  );
}
