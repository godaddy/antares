import { useState } from 'react';
import { Drawer, Button, Text, Box } from '@godaddy/antares';

export function NoEscapeDismissExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable isKeyboardDismissDisabled>
        <Box padding="md">
          <Text>Cannot escape</Text>
        </Box>
      </Drawer>
    </>
  );
}
