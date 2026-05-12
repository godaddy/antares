import { useState } from 'react';
import { Drawer, Button, Text } from '@godaddy/antares';

export function AriaLabelWithTitleExample() {
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
        title="Visible Title"
        aria-label="Aria Label"
        animate={false}
      >
        <Text>Both title and aria-label provided</Text>
      </Drawer>
    </>
  );
}
