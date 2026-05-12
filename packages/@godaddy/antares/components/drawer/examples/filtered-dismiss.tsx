import { useState } from 'react';
import { Drawer, Button, Text } from '@godaddy/antares';

export function FilteredDismissExample() {
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
        shouldCloseOnInteractOutside={function filter() {
          return false;
        }}
        title="Filtered"
      >
        <Text>Filtered dismiss</Text>
      </Drawer>
    </>
  );
}
