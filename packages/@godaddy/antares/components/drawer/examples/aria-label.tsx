import { useState } from 'react';
import { Drawer, Button, Text } from '@godaddy/antares';

export function AriaLabelExample() {
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
        aria-label="Custom drawer label"
        animate={false}
      >
        <Text>Content without title</Text>
      </Drawer>
    </>
  );
}
