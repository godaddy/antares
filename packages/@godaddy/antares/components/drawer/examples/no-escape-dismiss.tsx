import { useState } from 'react';
import { Drawer, Button, Text } from '@godaddy/antares';

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
        title="No escape"
      >
        <Text>Cannot escape</Text>
      </Drawer>
    </>
  );
}
