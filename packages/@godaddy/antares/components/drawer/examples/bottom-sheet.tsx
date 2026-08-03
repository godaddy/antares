import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

/**
 * Use `placement="bottom"` with controlled state for a bottom sheet pattern.
 * @title Bottom Sheet
 * @order 2
 */
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
        <Box elevation="card" padding="md">
          <Text as="p">Bottom sheet with close button.</Text>
          <Text as="p">This is the content</Text>
        </Box>
      </Drawer>
    </>
  );
}
