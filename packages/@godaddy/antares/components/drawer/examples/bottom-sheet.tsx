import { useState } from 'react';
import { Button, CloseButton, Content, Drawer, Heading } from '@godaddy/antares';

/**
 * Use `placement="bottom"` with controlled state for a bottom sheet pattern. Compose a
 * `CloseButton` for the dismiss affordance.
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
      <Drawer placement="bottom" isOpen={open} onOpenChange={setOpen} isDismissable>
        <Heading slot="title">Bottom sheet</Heading>
        <CloseButton />
        <Content>Bottom sheet with a composed close button.</Content>
      </Drawer>
    </>
  );
}
