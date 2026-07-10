import { useState } from 'react';
import { Drawer, Button, Text, Popover, PopoverTrigger, Box } from '@godaddy/antares';

export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable aria-label="Nested popover">
        <Box padding="md">
          <PopoverTrigger>
            <Button variant="primary">Open popover</Button>
            <Popover>
              <Text>Popover inside drawer</Text>
            </Popover>
          </PopoverTrigger>
        </Box>
      </Drawer>
    </>
  );
}
