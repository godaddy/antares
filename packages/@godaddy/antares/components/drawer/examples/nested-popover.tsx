import { useState } from 'react';
import { Drawer, Button, Text, Popover, PopoverTrigger } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable title="Drawer with Popover">
        <PopoverTrigger>
          <Button variant="primary">Open popover</Button>
          <Popover>
            <Text>Popover inside drawer</Text>
          </Popover>
        </PopoverTrigger>
      </Drawer>
    </>
  );
}
