import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

/**
 * Use `isKeyboardDismissDisabled` to prevent the drawer from being dismissed by the escape key.
 * @title No Escape Dismiss
 * @order 5
 */
export function NoEscapeDismissExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        isKeyboardDismissDisabled
        aria-label="Drawer"
      >
        <Box padding="md">
          <Text>Cannot escape</Text>
        </Box>
      </Drawer>
    </>
  );
}
