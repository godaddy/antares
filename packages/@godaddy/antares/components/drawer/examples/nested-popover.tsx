import { useState } from 'react';
import { Button, Content, Drawer, Popover, PopoverTrigger, Text } from '@godaddy/antares';

/**
 * Popovers rendered inside a drawer stay open without dismissing the drawer.
 * @title Nested Popover
 * @order 4
 */
export function NestedPopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} isDismissable aria-label="Nested popover">
        <Content>
          <PopoverTrigger>
            <Button variant="primary">Open popover</Button>
            <Popover aria-label="Popover">
              <Text>Popover inside drawer</Text>
            </Popover>
          </PopoverTrigger>
        </Content>
      </Drawer>
    </>
  );
}
